import React, { useRef, useState } from "react"
import { FButton, FCol, FGrid, FSpace, FTable, FText } from ".."
import { Fieldset } from "primereact/fieldset"
import { ProgressBar } from "primereact/progressbar"
import RequestStatus from "src/constants/enums/request-status"

interface fileUploadDialogProps {
  unSendedRecords?: any[] //Number of records didn't upload.
  countProceessed: string //Number of records proccessed.
  showFailureRecords: boolean //To Show Failure Records.
  resultTableCols?: { field: string; header: string }[] //Result table columns.
  uploadePercentage: number //Percentage of records uploaded.
  uploadStatus: RequestStatus //Upload status
  importedCount: number //Number of records imported
  onSelect: (e: any) => void //On select file
  onUpload: () => void //On start upload file
  onCancel: () => void //On cancel upload file
  onOpenInsertRecord: () => void //On open insert one record
}

export const FileUploader: React.FC<fileUploadDialogProps> = ({
  countProceessed,
  resultTableCols,
  unSendedRecords,
  showFailureRecords,
  uploadePercentage,
  importedCount,
  uploadStatus,
  onSelect,
  onUpload,
  onCancel,
  onOpenInsertRecord: onOpenAdd,
}) => {
  /*------------------------------|| HOOKS ||------------------------------------------------*/
  //Reference to add file.
  const inputFileRef = useRef<any>(null)

  const [fileName, setFileName] = useState("")

  /*------------------------------|| ACTIONS ||------------------------------------------------*/
  const onSelectFile = (e: any) => {
    setFileName(e.target.files[0].name)
    onSelect(e)
    e.target.value = null
  }

  /*------------------------------|| RENDER ||------------------------------------------------*/
  return (
    <>
      {/*Show Summary when finish or cancel*/}
      {showFailureRecords ? (
        <FileUploaderSummary
          importedData={unSendedRecords}
          resultTableCols={resultTableCols}
          importedCount={importedCount}
          failuerCount={unSendedRecords?.length}
        />
      ) : (
        <Fieldset legend="Source" className="p-0 w-full mb-2">
          <FGrid justify="start" align="center">
            {/*Choose file or replace it*/}
            <FCol fixed>
              <FButton
                bg="primary"
                label={fileName ? "Replace" : "Choose"}
                icon={fileName ? "pi pi-replay" : "pi pi-plus"}
                onClick={() => {
                  inputFileRef.current.click()
                }}
              />
            </FCol>
            {/*Import file after choosing it*/}
            <FCol fixed>
              <FButton
                bg="primary"
                label={"Import"}
                icon={"pi pi-upload"}
                onClick={onUpload}
                disabled={!fileName || importedCount < 0}
              />
            </FCol>
            {/*This feature disabled now */}
            <FCol fixed>
              <FButton bg="primary" disabled label="Add" icon="pi pi-plus" onClick={onOpenAdd} />
            </FCol>
            <FCol>
              <FText fs={3}>{importedCount >= 0 && fileName}</FText>
            </FCol>
          </FGrid>

          <input
            type="file"
            id="file"
            ref={inputFileRef}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv"
            className="hidden"
            onChange={onSelectFile}
          />
        </Fieldset>
      )}
      {/*When uploade loading show progress bar  */}
      {uploadStatus === "loading" && (
        <FGrid align="center" justify="end" className="w-full">
          <FCol span={12} className="py-2 px-0">
            <ProgressBar value={uploadePercentage} />
          </FCol>
          <FCol span={10} className="flex justify-content-center">
            <FText fs={2}> {countProceessed}</FText>
          </FCol>
          <FButton
            bg="secondary"
            label="Stop"
            icon="pi pi-times"
            onClick={onCancel}
            // disabled={!disabled && !readyToUpload}
          />
        </FGrid>
      )}
    </>
  )
}

//...
interface FileUploaderSummaryProps {
  importedCount: number
  failuerCount: number | undefined
  importedData?: any[]
  resultTableCols?: { field: string; header: string }[]
}

const FileUploaderSummary: React.FC<FileUploaderSummaryProps> = ({
  resultTableCols,
  importedData,
  importedCount,
  failuerCount,
}) => {
  /*------------------------------|| RENDER ||------------------------------------------------*/
  return (
    <>
      <Fieldset legend="Summary" className="p-0 w-full mb-2">
        <FSpace direction="vertical" gap={15}>
          <FText fs={3} color="lightGray">
            <span className="font-bold">{importedCount}</span> - Imported row
          </FText>
          <FText fs={3} color="lightGray">
            <span className="font-bold">{failuerCount}</span> - Not imported row
          </FText>
        </FSpace>
      </Fieldset>
      {/*Table for did'nt import data */}
      <FTable
        value={importedData}
        dataKey="id"
        rows={13}
        columns={resultTableCols}
        scrollHeight="600px"
        exportFilename={"not-imported-data "}
        exportType="CSV"
        paginator
        className="f-editable-table h-full border-none"
      />
    </>
  )
}
