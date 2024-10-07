import { FC, useState } from "react"
import { FGrid, FCol, FButton } from "src/components"
import { FEditableTable, FEditableTableProps } from "../f-editable-table"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "src/core/redux/store"
import { InsertBatchParameterAsync, UpdateBatchParameterAsync } from "src/core/redux"
import { Fieldset } from "primereact/fieldset"
import { Dropdown } from "primereact/dropdown"
import { useHistory, useParams } from "react-router-dom"
import { FLoadingData } from "../f-loading-data"
import { FInput } from "../f-input"
import { Batch } from "src/core/interface/batch"
import { MixItem, productionTarget, productionTargetsState } from "src/core/interface"
import { MixRun } from "src/core/interface/mixRun"
import { Calendar } from "primereact/calendar"
import { Notification } from "src/utils/ui/toast-message"
import moment from "moment"

// interface InputValidation {
//   required: boolean
//   rule?: RegExp
// }
//Addtional props to f-input component
// type FInputFormProps = FInputProps & { colProps?: ColProps; validate?: InputValidation; component?: ReactNode }

interface props {
  onSubmit: (data: any) => void
  initialInputValues?: any
  mixTable?: FEditableTableProps
}

export const FFormBatchPara: FC<props> = ({ onSubmit, initialInputValues, mixTable, ...restProps }) => {
  /*------------------------------|| HOOKS ||------------------------------------------------*/

  const dispatch = useDispatch()
  const { productionTarget } = useSelector((state: RootState) => state.ProductionTargets)
  const { users, currentState } = useSelector((state: RootState) => state.BatchParameters)
  const { materials } = useSelector((state: RootState) => state.Materials)
  const { suppliers } = useSelector((state: RootState) => state.Suppliers)
  const [selectUser, setSelectUser] = useState<any>(null)
  const { production_target_id }: any = useParams()

  // console.log("production_target_id", production_target_id)
  // const disabledInput = <InputText style={{ height: "30px", width: "100%" }} disabled placeholder="Enter Amount" />
  const [originalProductionTarget, setOriginalProductionTarget] = useState<productionTarget>()
  const [startMix, setStartMix] = useState<string | any>("")
  const [stopMix, setStopMix] = useState<string | any>("")
  const [humedity, setHumedity] = useState(null)
  const [selectAppearance, setSelectAppearance] = useState<any>(null)
  const [comment, setComment] = useState("")
  const [checked, setChecked] = useState(false)
  const [batches, setBatches] = useState<string[]>([`Batch-1`])
  const [batchName, setBatchName] = useState<string>("Batch-1")
  const [batchIndex, setBatchIndex] = useState<number>(1)
  const [lastBatchIndex, setLastBatchIndex] = useState<number>(1)
  const [mixItems, setMixItems] = useState<MixItem[]>([])
  const [mixRuns, setMixRuns ] = useState<MixRun[]>([])
  const [newMixRuns, setNewMixRuns ] = useState<MixRun[]>([])
  const [isInitialize, setIsInitialize] = useState<boolean>(false)
  const [batchesData, setBatchesData] = useState<Batch[]>([])
  const [, updateState] = useState(null)

  if(!originalProductionTarget) {

    setOriginalProductionTarget(productionTarget)
  }
  let newMixItems: MixItem[] = []
  let mixRunsValue: MixRun[] = []
  const batchAppearances = [
    { id: "1", type: "dry" },
    { id: "2", type: "wet" },
    { id: "3", type: "runny" },
    { id: "4", type: "sticky" },
  ]

  let newBatches: string[] = []
  if(originalProductionTarget?.batches && originalProductionTarget.batches.length > 0 && batches.length < originalProductionTarget.batches.length) {
    originalProductionTarget.batches.forEach((value, index) => {
      newBatches.push(`Batch-${index + 1}`)
    })
    setBatches(newBatches)
  }
  const setNewMaterialsAndMixes = () => {
    newMixItems = []
    if(originalProductionTarget?.batches && originalProductionTarget.batches[originalProductionTarget.batches.length - 1]?.mixItems && originalProductionTarget.batches[originalProductionTarget.batches.length - 1].mixItems.length > 0) {
      newMixItems = originalProductionTarget.batches[originalProductionTarget.batches.length - 1].mixItems
    }
    else {
      if(originalProductionTarget?.mix && originalProductionTarget.mix?.recipe && originalProductionTarget.mix.recipe.length > 0) {
        originalProductionTarget.mix.recipe.forEach((value, index) => {
          newMixItems.push({ id:"", mixItem: { note: "", material: value.material, value: value.value  }, batchAmount: 0 })
        })
      }
      
    }
    setMixItems(newMixItems)
    setMixRuns([])
    setNewMixRuns([])
  }
  const getMixItems = () => {

    if(batchesData.length > 0) {
      newMixItems = batchesData[batchIndex - 1].mixItems
    }
    setMixItems(newMixItems)
  }
  const getMixRuns = () => {

    let newData: MixRun[] = []
    if(users.length > 0 && batchAppearances.length > 0) {

      batchesData[batchIndex - 1].mixes.forEach((value, index) => {
        if(value["inspector"] != null && value["appearence"] != null) {
          let inspector: any = value["inspector"]
          let appearence: any = value["appearence"]
          if(inspector !== null) {}
          let selectedInspector = users.filter((user, index) => user.username === inspector)[0]
          let selectedAppearence = batchAppearances.filter((app, index) => app.id === appearence.toString())[0]
          newData.push({ startTime: value.startTime, endTime: value.endTime, humedity: value.humedity, appearence: selectedAppearence, comment: value.comment, inspector: selectedInspector })
        }
      })
    }
    mixRunsValue = newData
    setMixRuns(mixRunsValue)
    //if(newMixRuns.length === 0 || (productionTarget?.batches && productionTarget.batches.length > 0 && batches.length > productionTarget.batches.length)) {
    setNewMixRuns(mixRunsValue)
  }
  if(originalProductionTarget && originalProductionTarget?.batches && originalProductionTarget.batches.length > 0 && isInitialize === false) {
    originalProductionTarget.batches.forEach((value, index) => {
      batchesData.push(value)
    })
    getMixItems()
    setIsInitialize(true)
  }
  if(lastBatchIndex !== batchIndex && batchesData.length >= batchIndex) {
    getMixItems()
    getMixRuns()
    setLastBatchIndex(batchIndex)
    setIsInitialize(true)
  }
  if( originalProductionTarget && !(originalProductionTarget?.batches) && isInitialize === false) {
    setNewMaterialsAndMixes()
    setIsInitialize(true)
  }
  if(originalProductionTarget?.batches && originalProductionTarget.batches[batchIndex - 1]?.mixes?.length > 0 && isInitialize === false) {
    getMixRuns()
    setIsInitialize(true)
  }
  const appearances = [
    { label: "dry", value: 1 },
    { label: "wet", value: 2 },
    { label: "runny", value: 3 },
    { label: "sticky", value: 4 },
  ]
  const screenWidth = window.screen.width;
  const { status: mixStatus } = useSelector((state: RootState) => state.MixDesigns)
  const groupedItemTemplate = (option: any) => {
    return (
      <div className="flex align-items-center country-item">
        <div>{option.name}</div>
      </div>
    )
  }

  let history = useHistory()
  // onSubmittt function insert first batch
  const onSubmittt = () => {
    let data = {
      startTime: startMix,
      endTime: stopMix,
      humedity: humedity,
      appearence: selectAppearance,
      comment: comment,
      approved: checked,
      inspector: selectUser,
    }
    
    }
  function checkValidation(): boolean {
    let isValid: Boolean = true
    mixItems.forEach((value, index) => {
      if(value && value.mixItem && value.mixItem.value) {
        if(value.batchAmount > value.mixItem.value) {
          Notification({ summary: "error insert Batch Parameter", err: { error: "Batch amount should be less than Amount" }})
          return false
        } 
      }
    })
    if(newMixRuns.length === 0 && isValid === true) {
      Notification({ summary: "error insert Batch Parameter", err: { error: "Batch should have at least one mix" }})
      return false
      
    }
    if(newMixRuns.length > 0 && isValid === true) {
      newMixRuns.forEach((value, index) => {
        if(value === null || value === undefined) {
          Notification({ summary: "error insert Batch Parameter", err: { error: "All the values in mixRun should be set" }})
          return false
        } 
      })
    }
    return true
  }
  const onSubmitForm = () => {

    let isValid: Boolean = true
    if(!(originalProductionTarget?.batches) || (batches.length > batchesData.length)) {
      if(checkValidation() === true) {

        let batch: Batch = { note: "", mixes: newMixRuns, mixItems: mixItems }
        dispatch(InsertBatchParameterAsync(batch, production_target_id))
        batchesData.push(batch)
        setBatchesData(batchesData)
      }
    } 
    else if(originalProductionTarget?.batches && originalProductionTarget.batches.length > 0) {
      if(checkValidation() === true) {
          let newdata = JSON.parse(JSON.stringify(newMixRuns))
                      newdata.forEach((value: any, index: number) => {
                        let inspector = value["inspector"]
                        let appearence = value["appearence"]
                        if(typeof(inspector) !== "string") {
                          let newInspector = inspector["username"]
                          value["inspector"] = newInspector
                        }
                        if(typeof(appearence) !== "string") {
                          let newAppearence = appearence["id"]
                          value["appearence"] = newAppearence
                        }
                      })

          let batch: Batch = { note: "", mixes: newdata, mixItems: mixItems }
          dispatch(UpdateBatchParameterAsync(batch, production_target_id, (batchIndex - 1).toString()))
          batchesData[batchIndex - 1] = batch
          setBatchesData(batchesData)
      }
    }
  }
  const addNewBatch = () => {
    newBatches = JSON.parse(JSON.stringify(batches))
    if(newBatches.length > 0) {
      newBatches.push(`Batch-${newBatches.length + 1}`)
    }
    setBatches(newBatches)
    setBatchName(`Batch-${newBatches.length}`)
    setBatchIndex(newBatches.length)
    setNewMaterialsAndMixes()
  }
  const selectBatch = (e: any) => {
    let id: number = parseInt(e.currentTarget.id) 
    if(originalProductionTarget?.batches && batches.length > batchesData.length) {
      batches.pop()
      addNewBatch()
      setBatchName(`Batch-${id + 1}`)
      setLastBatchIndex(batchIndex)
      setBatchIndex(id + 1)
    }
    else {
      setBatchName(`Batch-${id + 1}`)
      setLastBatchIndex(batchIndex)
      setBatchIndex(id + 1)
    }
  } 
  const getTheDate = (date: number) => {

    var d = new Date()
    var quotient = Math.floor(date / 60)
    var remainder = date % 60
    d.setHours(quotient, remainder, 0)
    return d
  }
  return (
    <>
      <form>
        <FCol lg={1} md={1} sm={1} style={{ display: "inline-block", float:"left" }}>

                    <Fieldset legend={"Batches"}>
                        <FGrid style={{ height: "2.3rem", overflowY: "visible" }}>
                          { batches.map((value, index) => 
                            <FButton aditionalClass="batchingButton" bg="secondary" key={index.toString()} id={index.toString()} onClick={selectBatch} style={{padding: "8px 0px", marginBottom: "5px"}}>{value}</FButton>
                          )}
                        </FGrid>
                      <FButton style={ screenWidth == 1920 ? { marginTop: "36.9rem", padding: "8px 0px" } : screenWidth == 1360 ? { marginTop: "408px", padding: "8px" } : { marginTop: "258px", padding: "8px" }} onClick={addNewBatch}>New</FButton>    
                    </Fieldset>

        </FCol>
        <FCol lg={11} md={11} sm={11} style={{ display: "inline-block", float: "right" }}>
        <Fieldset legend={`${batchName} Details`} style={{ marginLeft: "34px" }}>
          <Fieldset legend="Materials">
            {mixTable && (
              <>
                <FLoadingData status={"data"}>
                  <FEditableTable
                    className="f-editable-table1"
                    scrollable
                    scrollHeight="1000px"
                    height="245px"
                    value={mixItems ? mixItems : []}
                    size="small"
                    loading={mixStatus === "loading"}
                    responsiveLayout="scroll"
                    initialRow={null}
                    dataKey= "id"
                    editMode= "row"
                    columns={mixTable.columns}
                    fixedRows= {true}
                    rerenderTheEdditableTableWhenGetNewData= {true}
                    onUpdateData= {(data) =>{ 
                      setMixItems(data)
                    }}
                  >
                  </FEditableTable>
                </FLoadingData>
              </>
            )}
          </Fieldset>
          <Fieldset legend="Mix-Run">
            {mixTable && (
              <>
                <FLoadingData status={"data"}>
                  <FEditableTable
                    className="f-editable-table-Mix-Run"
                    height={"400px"}
                    scrollHeight="400px"
                    value={mixRuns ? mixRuns : []}
                    size="small"
                    loading={mixStatus === "loading"}
                    responsiveLayout="scroll"
                    rerenderTheEdditableTableWhenGetNewData= {true}
                    initialRow= {{
                      inspector: {
                        username: ""
                      },
                      humedity: 0,
                      appearence: {
                        type:""
                      },
                      startTime: null,
                      endTime: null,
                      comment: "",
                    }}
                    columnResizeMode= "fit"
                    fixedRows={false}
                    dataKey= "id"
                    editMode= "row"
                    columns={[
                      { 
                        field: "inspector",  
                        header: "Inspector", 
                        type: "select", 
                        optionName: "username",
                        options: users,
                        body: (mixRun: MixRun) => 
                        mixRun?.inspector?.username === "" ? <Dropdown className="p-input-table" disabled /> : mixRun?.inspector?.username,
                      },
                      { 
                        field: "humedity", 
                        header: "Humedity", 
                        type: "number", 
                        body: (mixRun: MixRun) => mixRun?.humedity,
                      },
                      { 
                        field: "appearence", 
                        header: "Mix Appearance", 
                        type: "select", 
                        optionName: "type",
                        options: batchAppearances,
                        body: (mixRun: MixRun) => 
                        mixRun?.appearence?.type === "" ? <Dropdown className="p-input-table" disabled /> : mixRun?.appearence?.type,
                      },
                      { 
                        field: "startTime", 
                        header: "Start Time", 
                        type: "time",
                        body: (mixRun: MixRun) => 
                        <Calendar 
                          timeOnly
                          showTime 
                          hourFormat="24" 
                          style={{ height: "34px" }}
                          value={mixRun.startTime ? getTheDate(mixRun.startTime): undefined} 
                        />
                      },
                      { 
                        field: "endTime", 
                        header: "End Time", 
                        type: "time",
                        body: (mixRun: MixRun) => 
                        <Calendar 
                          timeOnly
                          showTime 
                          hourFormat="24" 
                          style={{ height: "34px" }}
                          value={mixRun.endTime ? getTheDate(mixRun.endTime) : undefined} 
                        />
                      },
                      { 
                        field: "comment", 
                        header: "Comment", 
                        type: "text", 
                        body: (mixRun: MixRun) => 
                        mixRun?.comment === "" ? <FInput name="comment" type="text" className="p-inputtext p-component p-disabled p-input-table"></FInput> : mixRun?.comment
                      },
                    ]}
                    onUpdateData={(data) => {
                      setMixRuns(data)
                      let newdata = JSON.parse(JSON.stringify(data))
                      newdata.forEach((value: any, index: number) => {
                        let inspector = value["inspector"]
                        let appearence = value["appearence"]
                        let newInspector = inspector["username"]
                        let newAppearence = appearence["id"]
                        value["inspector"] = newInspector
                        value["appearence"] = newAppearence
                      })
                      setNewMixRuns(newdata)
                    }}
                  >
                  </FEditableTable>
                </FLoadingData>
              </>
            )}
            
          </Fieldset>
            <FButton
              bg="primary"
              onClick={onSubmitForm}
              type="button"
              style={{ margin: "12px 2px 0px 12px", float: "right", display:"inline-block" }}
            >
              Save
            </FButton>

            <FButton
              bg="info"
              onClick={() => history.push("/operations/production-targets")}
              type="button"
              style={{ margin: "12px 0px 0px 12px", float: "right", display:"inline-block" }}
            >
              Cancel
            </FButton>
        </Fieldset>
        </FCol>
      </form>
    </>
  )
}
