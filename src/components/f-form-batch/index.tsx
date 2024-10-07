import { CSSProperties, FC, useState } from "react"
import { FGrid, FCol, FButton, FDialog, FSpace } from "src/components"
import { FText } from "../f-text"
import { Notification } from "src/utils/ui/toast-message"
import { InputNumber } from "primereact/inputnumber"
import { Fieldset } from "primereact/fieldset"
import { FEditableTable } from "../f-editable-table"
import { ColumnType } from "../f-table/types"
import { Dropdown } from "primereact/dropdown"
import { useHistory } from "react-router-dom"
import { RadioButton } from "primereact/radiobutton"
import { InputText } from "primereact/inputtext"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "src/core/redux/store"
import { Checkbox } from "primereact/checkbox"
import { inputDisabledStyle } from "./style"
import { InputTextarea } from "primereact/inputtextarea"
import moment from "moment"
import { InsertBatchParameterAsync } from "src/core/redux/operations/batchParameter"

interface props {
  onSubmit: (data: any) => void
  // batch: batchParameter
}
const inputTextAreaStyle: CSSProperties = { width: "100%", resize: "none", marginBottom: "10px" }

export const FFormBatch: FC<props> = ({ onSubmit, ...restProps }) => {
  const [currentBatch, setCurrentBatch] = useState(0)
  // const { batchParameters, currentState } = useSelector((state: RootState) => state.BatchParameters)
  // const { batchNumber, productionTarget } = batchParameters[currentBatch]
  const [openAddAmount, setOpenAddAmount] = useState<boolean>(false)
  const [openStopDialog, setOpenStopDialog] = useState<boolean>(false)
  const [openBatchComplete, setOpenBatchComplete] = useState<boolean>(false)
  const [valueBlocks, setValueBlocks] = useState(null)
  const [valueHumedity, setValueHumedity] = useState(null)
  const [valueMaterials, setValueMaterials] = useState(null)
  const [valueComment, setValueComment] = useState("")
  const [startMix, setStartMix] = useState<string | any>("")
  const [stopMix, setStopMix] = useState<string | any>("")

  const onClickBatchComplete = () => {
    setOpenBatchComplete(true)
  }

  const onClickAddAmount = () => {
    setOpenAddAmount(true)
  }

  const onBatchComplete = () => {
    if (stopMix === "") {
      Notification({ summary: "Please Add a Number of Blocks", severity: "warn" })
    }
    // else if (valueBlocks === 120) {
    //   Notification({ summary: "Please Number of Blocks is More for All Blocks from Production Barameters", severity: "warn" })
    // }
    else {
      setShowLogs4(true)
      setOpenBatchComplete(false)
      // history.push("/operations/batch-parameters")
    }
  }
  const [showLogs1, setShowLogs1] = useState(false)
  const [showLogs2, setShowLogs2] = useState(false)
  const [showLogs3, setShowLogs3] = useState(false)
  const [showLogs4, setShowLogs4] = useState(false)
  const [showLogs5, setShowLogs5] = useState(false)

  const [selectBlockTypes, setSelectBlockTypes] = useState<any>(null)
  const [selectAppearance, setSelectAppearance] = useState<any>(null)

  const [selectMaterial, setSelectMaterial] = useState<any>(null)

  const materials = [
    {
      items: [
        { label: "Water", value: "Water" },
        { label: "Material 1", value: "Material 1" },
        { label: "Material 2", value: "Material 2" },
        { label: "Material 3", value: "Material 3" },
        { label: "Material 4", value: "Material 4" },
        { label: "Material 5", value: "Material 5" },
      ],
    },
  ]
  function onMaterials(e: { value: any }) {
    setSelectMaterial(e.value)
  }

  const onMaterialsComplete = () => {
    if (valueMaterials === "") {
      Notification({ summary: "Please Add a Number of Materials", severity: "warn" })
      setOpenAddAmount(false)
    } else {
      setShowLogs1(true)
      setOpenAddAmount(false)
    }
  }

  const blockTypes = [
    {
      items: [
        { label: "block 8", value: "12" },
        { label: "block 10", value: "10" },
        { label: "block 12", value: "12" },
        { label: "block 15", value: "15" },
      ],
    },
  ]

  const inceptor = [
    // {
    // items: [
    { label: "inceptor 1", value: "1" },
    { label: "inceptor 2", value: "2" },
    { label: "inceptor 3", value: "3" },
    { label: "inceptor 4", value: "4" },
    // ],
    // },
  ]

  const appearances = [
    // {
    // items: [
    { label: "dry", value: "1" },
    { label: "wet", value: "2" },
    { label: "runny", value: "3" },
    { label: "sticky", value: "4" },
    // ],
    // },
  ]
  function onBlockTypes(e: { value: any }) {
    setSelectBlockTypes(e.value)
  }
  function onAppearanceChange(e: { value: any }) {
    setSelectAppearance(e.value)
  }

  const groupedItemTemplate = (option: any) => {
    return (
      <div className="flex align-items-center country-item">
        <div>{option.name}</div>
      </div>
    )
  }
  const disabledInput = <InputText style={inputDisabledStyle} disabled placeholder="Enter Amount" />
  const disabledInput2 = <InputText style={inputDisabledStyle} disabled placeholder="Enter Number Block" />

  const [showButton2, setShowButton2] = useState(false)
  const [showButton3, setShowButton3] = useState(false)
  const [showButton4, setShowButton4] = useState(false)
  const [showButton5, setShowButton5] = useState(false)
  const [showButton6, setShowButton6] = useState(false)
  const [value, setValue] = useState(false)

  let history = useHistory()
  const [isPercentage, setisPercentage] = useState<boolean>(true)

  const cols: ColumnType[] = [
    {
      field: "material",
      header: "Material",
      type: "not-editable",
      body: (rec: any) => rec?.material?.name,
      style: { fontSize: "17px" },
    },
    {
      field: "value",
      header: isPercentage ? "Percentage" : "Amount",
      type: "not-editable",
      body: (rec: any) => (rec?.value === 0 ? disabledInput : isPercentage ? `${rec?.value} %` : `${rec?.value} L`),
      // rec?.value,
    },
    {
      field: "amountBatch",
      header: "Batch Amount",
      type: "not-editable",
      body: (rec: any) =>
        rec.amountBatch === 0 ? disabledInput : isPercentage ? `${rec?.amountBatch} L` : `${rec?.amountBatch} L`,
    },
  ]

  const columnsBlock: ColumnType[] = [
    {
      field: "blocks",
      header: "Block",
      type: "not-editable",
      optionName: "type",
      body: (rec: any) => rec?.blocks?.name,
      style: { fontSize: "17px" },
    },
    {
      field: "numberBlock",
      header: "Number Block",
      type: "number",
      body: (rec: any) => (!rec.numberBlock ? disabledInput2 : isPercentage ? `${rec?.numberBlock}` : `${rec?.numberBlock}`),
    },
  ]

  const columns: ColumnType[] = [
    {
      field: "material",
      header: "Material",
      type: "not-editable",
      body: (rec: any) => rec?.material?.name,
      style: { fontSize: "17px" },
    },
    {
      field: "value",
      header: isPercentage ? "Percentage" : "Amount",
      type: "not-editable",
      body: (rec: any) => (rec?.value === 0 ? disabledInput : isPercentage ? `${rec?.value} %` : `${rec?.value} L`),
      // rec?.value,
    },
    {
      field: "batchAmount",
      header: "Batch Amount",
      type: "text",
      body: (rec: any) => (!rec.batchAmount ? disabledInput : isPercentage ? `${rec?.batchAmount} L` : `${rec?.batchAmount} L`),
    },
  ]

  const Start = () => {
    let date = new Date().toISOString()
    moment(date).format()
    setStartMix(date)
  }
  const End = () => {
    let date = new Date().toISOString()
    moment(date).format()
    setStopMix(date)
  }

  const dispatch = useDispatch()
  // on
  const onSubmittt = () => {
    let data = {
      startTime: startMix,
      endTime: stopMix,
      humedity: valueHumedity,
      appearence: 2,
      co2Amount: 92.625033,
      comment: valueComment,
      approved: 1,
    }
    // dispatch(InsertBatchParameterAsync({ ...data }))
  }

  // if (currentState === "Completed")
  //   return (
  //     <>
  //       <FCol className="p-fluid">
  //         <FGrid style={{ height: "" }} justify="between">
  //           <FCol className="p-fluid">
  //             <FGrid align="center">
  //               <FButton icon="pi pi-arrow-left" disabled={!showLogs4} className="p-button-rounded p-button-text" />
  //               <FText fs={3} fw="bold">
  //                 {`Production Target [${productionTarget.date}] [Batch ${batchNumber}]`}
  //               </FText>
  //             </FGrid>
  //           </FCol>

  //           <FCol className="p-fluid">
  //             <FButton icon="pi pi-arrow-right" onClick={() => setShowLogs4(true)} className="p-button-rounded p-button-text" />
  //           </FCol>
  //         </FGrid>
  //       </FCol>
  //       <FCol>
  //         <FGrid>
  //           <FSpace style={{ alignItems: "center" }}>
  //             <RadioButton value={isPercentage} name="Percentage" onChange={() => setisPercentage(true)} checked={isPercentage} />
  //             <FText fs={4} fw="bold">
  //               Percentage
  //             </FText>
  //             <RadioButton value={isPercentage} name="Amount" onChange={() => setisPercentage(false)} checked={!isPercentage} />
  //             <FText fs={4} fw="bold">
  //               Amount
  //             </FText>
  //           </FSpace>

  //           <Fieldset legend="Mix" style={{ padding: 0, width: "100%", marginBottom: "8px" }}>
  //             <FEditableTable
  //               onUpdateData={(data) => {
  //                 const sh = data.filter((element) => !element.batchAmount)
  //                 if (sh.length === 0) {
  //                   setShowButton5(true)
  //                   setShowLogs5(true)
  //                 }
  //               }}
  //               columns={cols}
  //               value={productionTarget.mix.recipe}
  //               initialRow={null}
  //             />
  //           </Fieldset>
  //         </FGrid>
  //       </FCol>

  //       <FCol>
  //         <FGrid style={{ height: "24vh", backgroundColor: "" }}>
  //           <FCol lg={12} sm={12} md={12}>
  //             <Fieldset legend="Past Actions" style={{ height: "24vh", padding: 0, width: "100%", marginBottom: "8px" }}>
  //               <FCol style={{ height: "19vh", backgroundColor: "black" }}>
  //                 <br></br>
  //                 <FText style={{ color: "white", fontSize: "14px" }}>
  //                   {`Added All Materials in  [${productionTarget.date}]`}
  //                 </FText>
  //                 <br></br>
  //                 <FText style={{ color: "white", fontSize: "14px" }}>{`Start Mix in [${productionTarget.date}]`}</FText>
  //                 <br></br>
  //                 <FText style={{ color: "white", fontSize: "14px" }}> {`Stop Mix in [${productionTarget.date}]`}</FText>
  //                 <br></br>
  //                 <FText
  //                   style={{ color: "white", fontSize: "14px" }}
  //                 >{`Add ${valueMaterials} Liter to Mix of ${selectMaterial} and ${value} of Humedity in [${productionTarget.date}]`}</FText>
  //                 <br></br>
  //                 <FText style={{ color: "white", fontSize: "14px" }}>
  //                   {" "}
  //                   {`Batch Complete [${productionTarget.date}] and added [${productionTarget.mix.recipe}]`}
  //                 </FText>
  //               </FCol>
  //             </Fieldset>
  //           </FCol>
  //         </FGrid>
  //       </FCol>
  //       <FCol>
  //         <FGrid style={{ height: "7vh" }}>
  //           <FCol lg={12} md={12} sm={12} style={{ display: "flex", justifyContent: "flex-end" }}>
  //             <FButton
  //               bg="info"
  //               onClick={() => {
  //                 history.push("/operations/batch-parameters")
  //               }}
  //               type="button"
  //               style={{ margin: "12px" }}
  //             >
  //               {" "}
  //               Back
  //             </FButton>
  //           </FCol>
  //         </FGrid>
  //       </FCol>
  //     </>
  //   )
  return (
    <>
      <FDialog
        position="top"
        modal
        visible={openStopDialog}
        onHide={() => {
          setOpenStopDialog(false)
        }}
        style={{ width: "600px" }}
        header="Questions"
      >
        <FGrid justify="center" align="center" direction="column">
          <FCol span={12}>
            <FText fs={3} style={{ marginLeft: "150px" }}>
              Total time of mixing : 15min
            </FText>
          </FCol>

          <FCol span={12}>
            <FSpace style={{ alignItems: "center" }}>
              <FText fs={3}>Incpector&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </FText>
              <Dropdown
                value={selectBlockTypes}
                options={inceptor}
                onChange={onBlockTypes}
                style={{ width: "100%" }}
                optionLabel="label"
                // optionGroupLabel="label"
                // optionGroupChildren="items"
                // optionGroupTemplate={groupedItemTemplate}
              />
            </FSpace>
          </FCol>
          <FCol span={12}>
            <FSpace style={{ alignItems: "center" }}>
              <FText fs={3}>Humedity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </FText>
              <InputNumber
                style={{ width: "100%", resize: "none", height: "38px" }}
                value={valueHumedity}
                inputId="stacked"
                showButtons
                min={0}
                onValueChange={(e: any) => setValueHumedity(e.target.value)}
                placeholder="Humedity"
              />
            </FSpace>
          </FCol>
          <FCol span={12}>
            <FSpace style={{ alignItems: "center" }}>
              <FText fs={3}>Mix Appearance&nbsp;&nbsp;&nbsp;</FText>
              <Dropdown
                value={selectAppearance}
                options={appearances}
                onChange={onAppearanceChange}
                style={{ width: "100%" }}
                optionLabel="label"
                // optionGroupLabel="label"
                // optionGroupChildren="items"
                // optionGroupTemplate={groupedItemTemplate}
              />
            </FSpace>
          </FCol>
          <FCol span={12}>
            <FSpace style={{ alignItems: "center" }}>
              <FText fs={3}>Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </FText>
              <InputTextarea
                placeholder="Write a comment"
                style={inputTextAreaStyle}
                rows={5}
                cols={30}
                value={valueComment}
                onChange={(e) => setValueComment(e.target.value)}
              />
            </FSpace>
          </FCol>
          <FCol></FCol>
          <FCol span={12}>
            <FSpace>
              <FText fs={3}>Approved &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</FText>
              <Checkbox checked={value} onChange={(e: any) => setValue(!value)} />
            </FSpace>
          </FCol>
          <FCol span={12}>
            <FButton
              style={{ width: "100%" }}
              onClick={() => {
                onSubmittt()
                setOpenStopDialog(false)
                setShowLogs1(true)
              }}
              bg="primary"
              label="Continue the Current Batch"
              disabled={value}
            />
          </FCol>

          <FCol span={12}>
            <FButton
              onClick={() => {
                setShowLogs4(true)
                setOpenStopDialog(false)
                // if (currentBatch + 1 !== batchParameters.length) setCurrentBatch(currentBatch + 1)
              }}
              style={{ width: "100%" }}
              bg="primary"
              label="Move to the Next Batch"
              disabled={!value}
            />
          </FCol>
          <FCol span={12}>
            <FButton
              onClick={() => {
                setShowButton5(false)
                setShowButton6(true)
                setOpenStopDialog(false)
              }}
              style={{ width: "100%" }}
              bg="primary"
              label="Complete Production Target"
              disabled={!value}
            />
          </FCol>
        </FGrid>
      </FDialog>
      <FDialog
        modal
        position="top"
        visible={openAddAmount}
        onHide={() => setOpenAddAmount(false)}
        style={{ width: "450px" }}
        header="Add Amount of Material"
      >
        <FCol>
          <span className="p-float-label">
            <Dropdown
              value={selectMaterial}
              options={materials}
              onChange={onMaterials}
              // placeholder="Select Block Type"
              style={{ width: "100%", marginBottom: "20px", marginTop: "20px" }}
              optionLabel="label"
              optionGroupLabel="label"
              optionGroupChildren="items"
              optionGroupTemplate={groupedItemTemplate}
            />
            <label>Select Material</label>
          </span>
          <span className="p-float-label">
            <InputNumber
              style={{ width: "100%", resize: "none", marginBottom: "20px", marginTop: "20px", height: "38px" }}
              value={valueMaterials}
              inputId="stacked"
              showButtons
              min={0}
              onValueChange={(e: any) => setValueMaterials(e.target.value)}
            />
            <label>Add Amount</label>
          </span>
        </FCol>
        <FGrid justify="center">
          <FButton style={{ width: "390px" }} bg="primary" onClick={onMaterialsComplete} label="Add" />
        </FGrid>
      </FDialog>

      <FDialog
        modal
        position="top"
        visible={openBatchComplete}
        onHide={() => setOpenBatchComplete(false)}
        style={{ width: "700px" }}
        header="Add Number of Blocks"
      >
        <FCol>
          <FEditableTable
            onUpdateData={() => {}}
            columns={columnsBlock}
            // value={productionTarget.mix.recipe}
            initialRow={null}
            fixedRows={false}
          />
          <FCol></FCol>

          {/* <span className="p-float-label">
            <Dropdown
              value={selectBlockTypes}
              options={blockTypes}
              onChange={onBlockTypes}
              style={{ width: "100%", marginBottom: "20px", marginTop: "20px" }}
              optionLabel="label"
              optionGroupLabel="label"
              optionGroupChildren="items"
              optionGroupTemplate={groupedItemTemplate}
            />
            <label>Select Block Type</label>
          </span>
          <span className="p-float-label">
            <InputNumber
              style={{ width: "100%", resize: "none", marginBottom: "20px", marginTop: "20px", height: "38px" }}
              value={valueBlocks}
              inputId="stacked"
              showButtons
              min={0}
              onValueChange={(e: any) => setValueBlocks(e.target.value)}
            />
            <label>Add Number Blocks</label>
          </span> */}
        </FCol>
        <FGrid justify="center">
          <FButton style={{ width: "390px" }} bg="primary" onClick={onBatchComplete} label="Add Blocks" />
        </FGrid>
        <FCol></FCol>
      </FDialog>
      <FCol className="p-fluid">
        <FGrid style={{ height: "" }} justify="between">
          <FCol className="p-fluid">
            <FGrid align="center">
              <FButton icon="pi pi-arrow-left" disabled={!showLogs4} className="p-button-rounded p-button-text" />
              <FText fs={3} fw="bold">
                {/* {`Production Target [${productionTarget.date}] [Batch ${batchNumber}]`} */}
              </FText>
            </FGrid>
          </FCol>

          <FCol className="p-fluid">
            <FButton
              icon="pi pi-arrow-right"
              disabled={!showLogs4}
              onClick={() => setShowLogs4(true)}
              className="p-button-rounded p-button-text"
            />
          </FCol>
        </FGrid>
      </FCol>
      <FCol>
        <FGrid>
          <FSpace style={{ alignItems: "center" }}>
            <RadioButton value={isPercentage} name="Percentage" onChange={() => setisPercentage(true)} checked={isPercentage} />
            <FText fs={4} fw="bold">
              Percentage
            </FText>
            <RadioButton value={isPercentage} name="Amount" onChange={() => setisPercentage(false)} checked={!isPercentage} />
            <FText fs={4} fw="bold">
              Amount
            </FText>
          </FSpace>

          <Fieldset legend="Mix" style={{ padding: 0, width: "100%", marginBottom: "8px" }}>
            <FEditableTable
              onUpdateData={(data) => {
                const sh = data.filter((element) => !element.batchAmount)
                if (sh.length === 0) {
                  setShowButton5(true)
                  setShowLogs5(true)
                }
              }}
              columns={columns}
              // value={productionTarget.mix.recipe}
              initialRow={null}
              fixedRows={false}
            />
          </Fieldset>
        </FGrid>
      </FCol>

      <FCol>
        <FGrid style={{ height: "24vh", backgroundColor: "" }}>
          <FCol lg={12} sm={12} md={12}>
            <Fieldset legend="Past Actions" style={{ height: "24vh", padding: 0, width: "100%", marginBottom: "8px" }}>
              <FCol style={{ height: "19vh", backgroundColor: "black" }}>
                <br></br>
                {showLogs5 && <FText style={{ color: "white", fontSize: "14px" }}> {`Added All Materials in  []`}</FText>}{" "}
                <br></br>
                {showLogs3 && <FText style={{ color: "white", fontSize: "14px" }}>{`Start Mix in []`}</FText>}
                <br></br>
                {showLogs2 && <FText style={{ color: "white", fontSize: "14px" }}> {`Stop Mix in []`}</FText>}
                <br></br>
                {showLogs1 && (
                  <FText
                    style={{ color: "white", fontSize: "14px" }}
                  >{`Add ${valueMaterials} Liter to Mix of ${selectMaterial} and Amount of Humedity in []`}</FText>
                )}
                <br></br>
                {showLogs4 && <FText style={{ color: "white", fontSize: "14px" }}> {`Batch Complete []`}</FText>}
              </FCol>
            </Fieldset>
          </FCol>
        </FGrid>
      </FCol>
      <FCol>
        <FGrid style={{ height: "7vh" }}>
          <FCol lg={12} md={12} sm={12} style={{ display: "flex", justifyContent: "flex-end" }}>
            {!showButton2 && (
              <FButton
                bg="primary"
                disabled={!showButton5 || showButton6}
                onClick={() => {
                  setShowLogs3(true)
                  setShowButton2(true)
                  setShowButton5(false)
                  Start()
                }}
                type="button"
                style={{ margin: "12px" }}
              >
                {" "}
                Start Mixing
              </FButton>
            )}

            {showButton2 && (
              <FButton
                bg="danger"
                onClick={() => {
                  setShowLogs2(true)
                  setShowButton2(false)
                  setShowButton3(true)
                  setShowButton4(true)
                  setOpenStopDialog(true)
                  setShowButton5(true)
                  End()
                }}
                type="button"
                style={{ margin: "12px" }}
                // disabled
              >
                {" "}
                Stop Mixing
              </FButton>
            )}
            <FButton
              bg="primary"
              disabled={!showButton5}
              onClick={() => onClickAddAmount()}
              type="button"
              style={{ margin: "12px" }}
            >
              {" "}
              Add Amount
            </FButton>

            {showButton3 && !showButton5 && !showButton2 && (
              <FButton
                disabled={!showButton4}
                bg="primary"
                onClick={() => onClickBatchComplete()}
                type="button"
                style={{ margin: "12px" }}
              >
                {" "}
                Batch Completed
              </FButton>
            )}

            <FButton
              bg="info"
              onClick={() => {
                history.push("/operations/batch-parameters")
              }}
              type="button"
              style={{ margin: "12px" }}
            >
              {" "}
              Back
            </FButton>
          </FCol>
        </FGrid>
      </FCol>
    </>
  )
}
