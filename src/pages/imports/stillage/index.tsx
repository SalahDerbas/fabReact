import React, { useEffect, useState } from "react"
import { AddStillage } from "src/pages/imports/stillage/add-stillage/add-stillage"
import { FDialog, FGrid, FText } from "src/components"
import { Notification } from "src/utils/ui/toast-message"
import {
  FileStillageFileAsync,
  FileToWattingList,
  FileToErrorList,
  CreateStillageAsync,
  CancelUploadProcesseStillage,
  CleanUploadData,
} from "src/core/redux/import/stillage"
import { useSelector, useDispatch } from "react-redux"
import { FileUploader } from "src/components/f-file-uploader"
import { useBoolean } from "src/utils/hooks"
import { importValidate } from "src/constants/validators"
import moment from "moment"
import { RootState } from "src/core/redux/store"

interface props {}

const standardFileColumns = [
  "No.",
  "Date",
  "Time",
  "Millitm",
  "{[CDS]Stillage_1_Weight}",
  "{[CDS]Stillage_2_Weight}",
  "{[CDS]Stillage_3_Weight}",
  "{[CDS]Stillage_4_Weight}",
  "{[CDS]Stillage_5_Weight}",
  "{[CDS]Stillage_6_Weight}",
  "{[CDS]Stillage_7_Weight}",
]
const standardApiColumns = [
  "number",
  "date",
  "time",
  "millitm",
  "stillage_1_Weight",
  "stillage_2_Weight",
  "stillage_3_Weight",
  "stillage_4_Weight",
  "stillage_5_Weight",
  "stillage_6_Weight",
  "stillage_7_Weight",
]

export const StillagetrendTable: React.FC<props> = () => {
  const { value, toggle } = useBoolean()
  const [fileRecordsCount, setfileRecordsCount] = useState(0)
  const {
    fileUploadState: { wattingStillages, uploadStatus, countProceessed, unSendedRecords, uploadePercentage },
  } = useSelector((state: RootState) => state.Stillage)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(CleanUploadData())
  }, [])

  const errorsBodyTemplate = (data: any) => {
    return <FText className={data.error !== "Skiped" ? "badgeError" : "badgeInfo"}>{data.error}</FText>
  }

  const unSendRecordsTableColumns = [
    { field: "number", header: "Stillage #", filter: false },
    { field: "date", header: "Date", body: (data: any) => moment(data.date).format("yyyy-MM-DD HH:mm:ss.SSS"), filter: false },
    { field: "stillageId", header: "Stillage Id", filter: false },
    { field: "weight", header: "Weight", filter: false },
    { field: "errors", header: "Errors", exportable: false, body: errorsBodyTemplate, filter: false },
  ]
  const upload = () => {
    dispatch(FileStillageFileAsync())
  }

  const importCSV = (e: any) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const csv: any = e?.target?.result
        const data = csv ? csv.split("\n") : null
        // Prepare DataTable
        const cols = data[0].replace(/['"]+/g, "").split(",")
        //check file structure
        cols.forEach((col: any, index: number) => {
          if (col.replace(/\s/g, "") !== standardFileColumns[index]) {
            throw new Error("Invalid file")
          }
        })
        let importedData = data.map((d: any) => {
          d = d.split(",")
          return standardApiColumns.reduce((obj: any, c: any, i: any) => {
            obj[c] = d[i]?.replace(/['"]+/g, "")
            return obj
          }, {})
        })
        //prepar final data
        let finalData: any = [],
          errorData: any = []

        for (let index = 2; index < importedData.length; index++) {
          const element = importedData[index]
          if (element.number)
            for (let j = 1; j <= 7; j++) {
              const stillageData = {
                number: element.number,
                date: element.date.concat("T", element.time, ".000"), //2019-02-03 10:08:02.123
                stillageId: j,
                weight: element[`stillage_${j}_Weight`].replace(/['"]+/g, ""),
              }

              if (stillageData.weight.replace(/\s/g, "") !== "") {
                let errors = importValidate(stillageData)
                const stillageDataFormat = {
                  number: +element.number,
                  date: element.date.concat("T", element.time, ".000"), //2019-02-03 10:08:02.123
                  stillageId: j,
                  weight: +element[`stillage_${j}_Weight`].replace(/['"]+/g, ""),
                }

                if (Object.keys(errors).length === 0) {
                  finalData.push(stillageDataFormat)
                } else {
                  const errorsMessage: JSX.Element[] = Object.entries(errors).map(([k, v]) => <p>{v}</p>)

                  errorData.push({ ...stillageData, error: errorsMessage })
                }
              }
            }
        }
        setfileRecordsCount(finalData.length + errorData.length)
        dispatch(FileToWattingList(finalData))
        dispatch(FileToErrorList(errorData))
      } catch (err: any) {
        setfileRecordsCount(-1)
        Notification({ summary: err?.message })
      }
    }

    reader.readAsText(file, "UTF-8")
  }

  const leftToolbarTemplate = (
    <React.Fragment>
      <FGrid style={{ height: "300px" }}>
        <FileUploader
          showFailureRecords={uploadStatus === "data" || (unSendedRecords.length > 0 && wattingStillages.length === 0)}
          countProceessed={`${countProceessed}/${wattingStillages.length}`}
          importedCount={fileRecordsCount - unSendedRecords.length}
          unSendedRecords={unSendedRecords}
          resultTableCols={unSendRecordsTableColumns}
          uploadePercentage={uploadePercentage}
          uploadStatus={uploadStatus}
          onUpload={upload}
          onSelect={importCSV}
          onCancel={() => {
            dispatch(CancelUploadProcesseStillage())
          }}
          onOpenInsertRecord={toggle}
        />
      </FGrid>
    </React.Fragment>
  )

  return (
    <>
      {leftToolbarTemplate}
      <FDialog modal position="top" visible={value} onHide={toggle} header="Add Stillage Weight">
        <AddStillage hideDialog={toggle} action={CreateStillageAsync} keepOpen resetFrom />
      </FDialog>
    </>
  )
}
