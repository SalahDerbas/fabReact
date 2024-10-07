import React, { useEffect, useState } from "react"
import { AddAhu } from "src/pages/imports/ahu/add-ahu/add-ahu"
import { FDialog, FGrid, FText } from "src/components"
import { Notification } from "src/utils/ui/toast-message"
import { useDispatch, useSelector } from "react-redux"
import { FileUploader } from "src/components/f-file-uploader"
import {
  CleanUploadDataAhu,
  CancelUploadProcesseAhu,
  AhuFileAsync,
  FileToErrorListAhu,
  FileToWattingListAhu,
} from "src/core/redux/import/ahu"
import { useBoolean } from "src/utils"
import { RootState } from "src/core/redux/store"
import moment from "moment"
import { importValidate } from "src/constants/validators"
// import { FileAHUFileAsync } from "src/core/redux"

interface props {}
const standardFileColumns: any = [
  "No.",
  "Date",
  "Time",
  "Millitm",
  "{[CDS]Actual_Humidity}",
  "{[CDS]Actual_Burner}",
  "{[CDS]Actual_Recirc_Temp}",
  "{::[CDS]Program:MainProgram.Burner_Temp_Setpoint}",
  "{::[CDS]Program:MainProgram.Humidity_HMI}",
  "{::[CDS]Program:MainProgram.Recirc_Temperature_SetpointA}",
  "{[CDS]O2_Level}",
  "{[CDS]Calc_Co2}",
  "{[CDS]Chamber_PressurePSIG}",
]

const standardApiColumns: any = [
  "number",
  "date",
  "time",
  "millitm",
  "humidity",
  "inletTemperature",
  "controlTemperature",
  "heaterTemperatureSetpoint",
  "humiditySetpoint",
  "controlTemperatureSetpoint",
  "o2level",
  "co2Level",
  "pressure",
]

export const AhutrendTable: React.FC<props> = () => {
  const dispatch = useDispatch()
  const { value, toggle } = useBoolean()
  // const { toggle: toggleuploadDialog } = useBoolean()
  const [fileRecordsCount, setfileRecordsCount] = useState(0)
  const {
    fileUploadState: { wattingAhus, uploadStatus, countProceessed, unSendedRecords, uploadePercentage },
  } = useSelector((state: RootState) => state.Ahu)
  useEffect(() => {
    dispatch(CleanUploadDataAhu())
  }, [])

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
          if (col.replace(/\s/g, "") !== standardFileColumns[index] && col.replace(/\s/g, "") !== "") {
            throw new Error("Invalid file")
          }
        })
        //convert file column name to array of objects content api columns names.
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
          //check if row doesn't empty.
          if (element.number) {
            //convert data and time to one string
            let date = element.date.concat(" ", element.time)
            const auhData = {
              number: +element.number, // + for convert string to number
              date: moment(date).format("YYYY-MM-DDTHH:mm:ss.SSS").concat("Z"),
              humidity: +element.humidity,
              inletTemperature: +element.inletTemperature,
              controlTemperature: +element.controlTemperature,
              heaterTemperatureSetpoint: +element.heaterTemperatureSetpoint,
              humiditySetpoint: +element.humiditySetpoint,
              controlTemperatureSetpoint: +element.controlTemperatureSetpoint,
              o2level: +element.o2level,
              co2Level: +element.co2Level,
              pressure: +element.pressure,
            }
            let errors = importValidate(auhData)
            //for check empty errors
            if (Object.keys(errors).length === 0) {
              finalData.push(auhData)
            } else {
              //prepare error message
              const errorsMessage: JSX.Element[] = Object.entries(errors).map(([k, v]) => <p>{v}</p>)
              errorData.push({ ...auhData, error: errorsMessage })
            }
          }
        }
        setfileRecordsCount(finalData.length + errorData.length)
        dispatch(FileToWattingListAhu(finalData))
        dispatch(FileToErrorListAhu(errorData))
      } catch (err: any) {
        setfileRecordsCount(-1)
        Notification({ summary: err?.message })
      }
    }

    reader.readAsText(file, "UTF-8")
  }

  const errorsBodyTemplate = (data: any) => {
    return <FText className={data.error !== "Skiped" ? "badgeError" : "badgeInfo"}>{data.error}</FText>
  }

  const unSendRecordsTableColumns = [
    { field: "number", header: "Stillage #", filter: false },
    { field: "date", header: "Date", body: (data: any) => moment(data.date).format("yyyy-MM-DD HH:mm:ss.SSS"), filter: false },
    { field: "humidity", header: "Humidity", filter: false },
    { field: "inletTemperature", header: "InletTemperature", filter: false },
    { field: "controlTemperature", header: "ControlTemperature", filter: false },
    { field: "heaterTemperatureSetpoint", header: "HeaterTemperatureSetpoint", filter: false },
    { field: "humiditySetpoint", header: "HumiditySetpoint", filter: false },
    { field: "controlTemperatureSetpoint", header: "ControlTemperatureSetpoint", filter: false },
    { field: "o2level", header: "O2level", filter: false },
    { field: "co2Level", header: "CO2Level", filter: false },
    { field: "pressure", header: "Pressure", filter: false },
    { field: "errors", header: "Errors", exportable: false, body: errorsBodyTemplate, filter: false },
  ]

  const upload = () => {
    dispatch(AhuFileAsync())
  }

  const leftToolbarTemplate = (
    <React.Fragment>
      <FGrid style={{ height: "300px" }}>
        {/* <FButton bg="primary" disabled label="Add" icon="pi pi-plus" onClick={toggle} /> */}
        {/* <FButton bg="primary" label="Import" icon="pi pi-file" onClick={toggleuploadDialog} /> */}

        <FileUploader
          showFailureRecords={uploadStatus === "data" || (unSendedRecords.length > 0 && wattingAhus.length === 0)}
          countProceessed={`${countProceessed}/${wattingAhus.length}`}
          importedCount={fileRecordsCount - unSendedRecords.length}
          unSendedRecords={unSendedRecords}
          resultTableCols={unSendRecordsTableColumns}
          uploadePercentage={uploadePercentage}
          uploadStatus={uploadStatus}
          onUpload={upload}
          onSelect={importCSV}
          onCancel={() => {
            dispatch(CancelUploadProcesseAhu())
          }}
          onOpenInsertRecord={toggle}
        />
      </FGrid>
    </React.Fragment>
  )

  return (
    <>
      {leftToolbarTemplate}

      <FDialog modal position="top" visible={value} onHide={toggle} header="Add AHU Trend">
        <AddAhu hideDialog={toggle} />
      </FDialog>
    </>
  )
}
