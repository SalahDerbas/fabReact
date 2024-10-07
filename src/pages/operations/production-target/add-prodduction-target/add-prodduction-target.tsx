import React, { useEffect, useState } from "react"
import { RootState } from "src/core/redux/store"
import { Toolbar } from "primereact/toolbar"
import {
  InsertProductionTargetAsync,
  UpdateProductionTargetAsync,
  ShowProductionTargetAsync,
  FetchBlockTypesAsync,
  PublishProductionTargetAsync,
  AddNoteProductionTargetAsync,
  FetchProductionTargetsAsync,
  RejectProductionTargetAsync,
  AcceptProductionTargetAsync,
} from "src/core/redux"
import { useDispatch, useSelector } from "react-redux"
import { FCol, FFormTarget, FGrid, FInputFormProps, FInsertList, FPaper, FSpace, FText } from "src/components"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { Dropdown } from "primereact/dropdown"
import moment from "moment"
import { ColumnType } from "src/components/f-table/types"
import { Fieldset } from "primereact/fieldset"
import { FLoadingData } from "src/components/f-loading-data"
import { InputNumber } from "primereact/inputnumber"
import { FPanelTime } from "src/components/f-panel/f-panel-time"
import { OperationsItemsNotShowed } from "src/constants/validators"
import { mixRecipe } from "src/core/interface"
import { InputText } from "primereact/inputtext"
import { TabPanel, TabView } from "primereact/tabview"
import { AddBatchParameters } from "../../batch-parameter/add-batch-parameter/add-batch-parameter-redesign"
import { AddDryingCycle } from "../../drying-cycle/add-drying-cycle/add-drying-cycle"
import { AddCuringCycle } from "../../curing-cycle/add-curing-cycle/add-curing-cycle"
import { AddSummary } from "../../summary/add-summary/add-summary"
import { Calendar } from "primereact/calendar"
import { AddPurgingCycle } from "src/pages/operations/purging-cycle/add-purging-cycle/add-purging-cycle"

interface props {
  action?: Function
  keepOpen?: boolean
  resetFrom?: boolean
}

export const AddProdductionTarget: React.FC<props> = () => {
  const dispatch = useDispatch()
  const { blockTypes } = useSelector((state: RootState) => state.BlocksType)

  const { productionTarget, status } = useSelector((state: RootState) => state.ProductionTargets)
  const { user } = useSelector((state: RootState) => state.Authentication)

  const { production_target_id }: any = useParams()
  const [blocksData, setBlocksData] = useState<any[]>(
    production_target_id && (productionTarget as any)?.items ? (productionTarget as any)?.items : []
  )

  const [notesData, setNotesData] = useState<any[]>(
    production_target_id && productionTarget?.pdNotes ? productionTarget?.pdNotes : []
  )
  let history = useHistory()

  useEffect(() => {
    dispatch(FetchBlockTypesAsync())
    if (production_target_id) {
      history.push("/operations/production-targets/" + production_target_id)
      dispatch(ShowProductionTargetAsync(production_target_id))
    }
  }, [])

  const { mixDesigns } = useSelector((state: RootState) => state.MixDesigns)
  const [selectedMix, setSelectedMix] = useState<number>(0)
  const [co2Value, setco2Value] = useState<any>(0)
  const [dryingValue, setdryingValue] = useState<any>(0)
  // time state 11
  const [dryingTime, setdryingTime] = useState<any>(0)
  const [dayValue, setDayValue] = useState<any>(new Date())

  const getTheDate = () => {
    var d = new Date()
    var quotient = Math.floor(dryingTime / 60)
    var remainder = dryingTime % 60
    d.setHours(quotient, remainder, 0)
    return d
  }
  const convertToMinutes = (d: Date) => {
    return d.getMinutes() + d.getHours() * 60
  }

  const onSubmitBlockForm = () => {}

  const onSubmitForm = (formProductionTarget: any) => {
    let mix_design: any = mixDesigns[selectedMix]

    // function time_convert(num: any) {
    //   var h = ""
    //   var m = ""
    //   var hours = Math.floor(num / 60)
    //   var minutes = num % 60
    //   // validation hours and convert to string
    //   if (hours < 10) {
    //     h = "0" + hours.toString()
    //   } else {
    //     h = hours.toString()
    //   }
    //   // validation minutes and convert to string
    //   if (minutes < 10) {
    //     m = "0" + minutes.toString()
    //   } else {
    //     m = minutes.toString()
    //   }
    //   //Mon May 16 2022 180005:45:00 GMT+0300 (Eastern European Summer Time)
    //   return "Mon May 16 2022 " + h + ":" + m + ":00 GMT+0300 (Eastern European Summer Time)"
    // }

    // console.log("formProductionTarget.dryingCyclePeriod", formProductionTarget.dryingCyclePeriod)

    let data = {
      date: moment(dayValue).format("YYYY-MM-DD"),
      // moment(formProductionTarget.date).format("YYYY-MM-DD"),
      version: 1,
      mix: {
        name: mix_design.name,
        desc: mix_design.desc,
        percentage: mix_design.percentage,
        recipe: mix_design.recipe.map((recipe: any) => ({
          supplier: {
            id: recipe.supplier.id,
            name: recipe.supplier.name,
            phone: recipe.supplier.phone,
            email: recipe.supplier.email,
            address: recipe.supplier.address,
          },
          material: {
            id: recipe.material.id,
            name: recipe.material.name,
            desc: recipe.material.desc,
          },
          value: recipe.value,
          note: recipe.note,
        })),
      },
      co2Amount: co2Value,
      dryingTargetPercent: dryingValue,
      dryingCyclePeriod: dryingTime,

      // dryingCyclePeriod: moment(dryingTime).minutes() + moment(dryingTime).hours() * 60 ?? dryingTime,
      //  new Date(time_convert(formProductionTarget?.dryingCyclePeriod)) ?? time.minutes() + time.hours() * 60,
      // moment(time_convert(formProductionTarget.dryingCyclePeriod)).format("HH:mm"),
      // moment(time_convert(formProductionTarget.dryingCyclePeriod)).format("HH:mm"),
      //  moment(time_convert(formProductionTarget.dryingCyclePeriod)).format("HH:mm"),
      //moment(time_convert(formProductionTarget.dryingCyclePeriod)).format("LT"),
      //time.minutes() + time.hours() * 60,
      items: blocksData.map((block: any) => ({
        blockType: {
          type: block.blockType.type,
          specs: block.blockType.specs,
          note: block.blockType.note,
        },
        count: block.count,
        note: block.note,
      })),
      // blocksCount: 92.625032,
    }

    // var x = formProductionTarget.dryingCyclePeriod
    // var d = moment.duration(x, "milliseconds")
    // var hours = Math.floor(d.asHours())
    // var mins = Math.floor(d.asMinutes()) - hours * 60

    // console.log("min", mins)

    if (production_target_id) dispatch(UpdateProductionTargetAsync(data, production_target_id ?? ""))
    else {
      dispatch(InsertProductionTargetAsync({ ...data, notes: notesData }))
    }
    history.push("/operations/production-targets")
  }

  const groupedItemTemplate = (option: any) => {
    return (
      <div className="flex align-items-center country-item">
        <div>{option}</div>
      </div>
    )
  }

  useEffect(() => {
    if (production_target_id) {
      setco2Value(productionTarget?.co2Amount ?? 0)
      setdryingValue(productionTarget?.dryingTargetPercent ?? 0)
      setdryingTime(productionTarget?.dryingCyclePeriod ?? 0)
      setDayValue(productionTarget?.date ?? "")
    } else {
      setco2Value(0)
      setdryingValue(0)
      setdryingTime(480)
      setDayValue(new Date())
    }
  }, [production_target_id, productionTarget])

  useEffect(() => {
    if (mixDesigns && production_target_id) {
      setSelectedMix(mixDesigns?.findIndex((mix) => mix.name === (productionTarget as any)?.mix?.name) ?? 0)
    }
  }, [mixDesigns, production_target_id])

  const co2Amount = (
    <InputNumber
      inputId="stacked"
      value={co2Value}
      onValueChange={(e: any) => setco2Value(e.target.value)}
      onChange={(e: any) => setco2Value(e.value)}
      showButtons
      placeholder="KG"
      min={0}
      style={{ height: "36px" }}
    />
  )

  const dryingTargetPercent = (
    <InputNumber
      value={dryingValue}
      onValueChange={(e: any) => setdryingValue(e.target.value)}
      onChange={(e: any) => setdryingValue(e.value)}
      showButtons
      placeholder="Drying%"
      min={0}
      max={100}
      style={{ height: "36px" }}
    />
  )

  const dryingCycleTime = (
    <Calendar
      inputId="stacked15"
      style={{ height: "24px" }}
      onChange={(e: any) => setdryingTime(convertToMinutes(e.target.value))}
      value={getTheDate()}
      timeOnly
      placeholder="HH - MI"
    />
  )

  const dayValueComp = (
    <Calendar
      style={{ height: "24px" }}
      value={new Date(dayValue)}
      onChange={(e: any) => setDayValue(e.target.value)}
      minDate={new Date()}
      // timeOnly
      placeholder="HH - MI"
    />
  )

  // const versions = <p style={{ marginTop: "5px" }}> v 1 </p>
  // const disabledInput = <InputText style={inputDisabledStyle} disabled />

  const inputs: FInputFormProps[] = [
    {
      type: "time",
      name: "date",
      component: dayValueComp,
      label: "Day",
      placeholder: "Day",
      validate: { required: false },
      // colProps: { span: 12, md: 3 },
    },
    {
      //type: "time",
      component: dryingCycleTime,
      name: "dryingCyclePeriod",
      label: "Drying Time",
      placeholder: "HH - MI",
      showTime: true,
      // showSeconds: true,
      timeOnly: true,
      // colProps: { span: 12, md: 3 },
      validate: { required: false },
    },

    {
      // type: "number",
      name: "co2Amount",
      component: co2Amount,
      label: "CO2 Amount",
      // colProps: { span: 12, md: 3 },
      // placeholder: "KG",
      // validate: { required: true },
    },
    {
      // type: "number",
      name: "dryingTargetPercent",
      component: dryingTargetPercent,
      label: "Drying Target",
      // colProps: { span: 12, md: 3 },
      // placeholder: "Drying %",
      // validate: { required: true },
    },

    {
      label: "Mix Design",
      name: "mix",
      // style: { marginTop: "-22px" },
      // colProps: { span: 12, md: 3 },
      component: (
        <Dropdown
          options={mixDesigns}
          optionLabel="name"
          placeholder="Mix Design"
          value={mixDesigns[selectedMix] ?? null}
          optionGroupTemplate={groupedItemTemplate}
          editable
          // style={{ marginTop: "54px" }}
          onChange={(e) => {
            setSelectedMix(mixDesigns.findIndex((mix) => mix.id === e.value.id))
          }}
        />
      ),
    },
  ]
  const disabledInput = <InputText className="p-input-table" disabled />

  const cols: ColumnType[] = [
    {
      field: "blockType",
      header: "Block Type",
      type: "select",
      style: { flex: 0.25 },
      optionName: "type",
      options: blockTypes,
      body: (rec: any) => {
        return rec?.blockType?.type === "" ? <Dropdown className="p-input-table" disabled /> : rec?.blockType?.type
      },
    },
    {
      field: "count",
      header: "Count",
      type: "number",
      style: { flex: 0.25 },
      body: (rec: any) => (rec.count !== 0 ? rec.count : disabledInput),
    },
    {
      field: "note",
      header: "Note",
      type: "text",
      style: { flex: 0.5 },
      body: (rec: any) => (rec.note !== "" ? rec.note : disabledInput),
    },
  ]

  /*********************  Action  ********************/
  const onBack = () => {
    dispatch(FetchProductionTargetsAsync())
    history.push("/operations/production-targets")
  }
  const onReject =
    productionTarget?.status === "PUBLISHED"
      ? () => {
          dispatch(RejectProductionTargetAsync(production_target_id))
        }
      : null
  const onPublish =
    productionTarget?.status !== "PUBLISHED" && production_target_id
      ? () => {
          dispatch(PublishProductionTargetAsync(production_target_id))
        }
      : null
  const onAccept =
    productionTarget?.status === "PUBLISHED" && user?.roles[1] === "ROLE_OPERATOR"
      ? () => {
          dispatch(AcceptProductionTargetAsync(production_target_id))
        }
      : null

  const onSaveNote = (note: any) => {
    if (production_target_id) {
      dispatch(AddNoteProductionTargetAsync(production_target_id, note))
    } else {
      notesData.push({ note })
      setNotesData(notesData)
    }
  }
  /**********************************************************************************/
  /*********************  State  ********************/

  const items = production_target_id && (productionTarget as any)?.pdNotes ? (productionTarget as any)?.pdNotes : notesData
  // const fieldsetInformation = production_target_id
  //   ? {
  //       createdDate: productionTarget?.createdDate,
  //       lastModifiedDate: productionTarget?.lastModifiedDate,
  //       createdByUser: productionTarget?.createdByUser,
  //       modifiedByUser: productionTarget?.modifiedByUser,
  //     }
  //   : null
  const disabled = productionTarget?.status === "PUBLISHED_REJECTED" || productionTarget?.status === "PUBLISHED"

  /**********************************************************************************/
  /*********************  table  ********************/

  const table = {
    dataKey: "id",
    editMode: "row",
    columns: cols,
    value: production_target_id && (productionTarget as any)?.items ? (productionTarget as any)?.items : [],
    // loading: status === "loading",
    onUpdateData: (data: any) => {
      setBlocksData(data)
    },
    rows: 3,
    initialRow: {
      blockType: { type: "" },
      count: 0,
      note: "",
    } as any,
    // resizableColumns: true,
    columnResizeMode: "fit",
  }

  /**********************************************************************************/
  /*********************  mixTable  ********************/

  const mixTable = {
    dataKey: "id",
    editMode: "row",
    columns: [
      {
        field: "material",
        header: "Material",
        type: "select",
        style: { flex: 0.3 },
        body: (rec: mixRecipe) => rec?.material?.name,
      },

      {
        field: "value",
        header: "Amount",
        type: "number",
        style: { flex: 0.1 },

        body: (rec: mixRecipe) => rec?.value,
      },
      {
        field: "supplier",
        header: "Supplier",
        type: "select",
        style: { flex: 0.2 },
        body: (rec: mixRecipe) => rec?.supplier?.name,
      },
      {
        field: "note",
        header: "Note",
        type: "text",
        style: { flex: 0.4 },
        body: (rec: mixRecipe) => rec?.note,
      },
    ],
    value: [],
    rows: 3,
    columnResizeMode: "fit",
  }

  const titleTabView = (
    <FText fs={3} fw="bold" style={{ justifyContent: "flex-start" }}>
      {`PT [ ${moment(productionTarget?.date || new Date().toString()).format("LL")} ] `}
    </FText>
  )

  /**********************************************************************************/
  /*********************  Rendering  ********************/
  return (
    <>
      <FSpace>
        <FGrid>
          {/* <Toolbar left={titleTabView} /> */}
          <FCol span={12} xl={10} lg={9}>
            <FPaper>
              <TabView>
                <TabPanel header="Specifications">
                  <FLoadingData status={status}>
                    <FGrid style={{ height: "744px" }}>
                      <FCol span={12} xl={12} lg={12}>
                        {/* <Fieldset legend="Details"> */}
                        <FFormTarget
                          inputs={inputs}
                          selectedMix={selectedMix}
                          onSubmit={onSubmitForm}
                          initialInputValues={production_target_id ? productionTarget : null}
                          onBack={onBack}
                          onPublish={onPublish}
                          onReject={onReject}
                          onAccept={onAccept}
                          status={status}
                          disabled={disabled}
                          table={table as any}
                          mixTable={mixTable as any}
                        />
                        {/* </Fieldset> */}
                      </FCol>
                      {/* <FCol span={12} xl={3} lg={12}>
                  <Fieldset legend="Notes" style={{ padding: "0px" }}>
                    <FInsertList onSaveNote={onSaveNote} items={items} />
                  </Fieldset>
                </FCol> */}
                    </FGrid>
                  </FLoadingData>
                </TabPanel>
                <TabPanel header="Batching" disabled={!disabled}>
                  <AddBatchParameters />
                </TabPanel>
                <TabPanel header="Drying" disabled={!disabled}>
                  <AddDryingCycle />
                </TabPanel>
                <TabPanel header="Purging /Blow Down" disabled={!disabled}>
                  <AddPurgingCycle />
                </TabPanel>
                <TabPanel header="Curing" disabled={!disabled}>
                  <AddCuringCycle />
                </TabPanel>

                <TabPanel header="Summary" disabled={!disabled}>
                  <AddSummary />
                </TabPanel>

                <TabPanel header={titleTabView} style={{ marginLeft: "350px" }} disabled></TabPanel>
              </TabView>
            </FPaper>
          </FCol>
          <FCol span={12} xl={2} lg={3}>
            <FPaper>
              {/* <Fieldset legend="Notes" style={{ padding: "0px" }}> */}
              <FInsertList onSaveNote={onSaveNote} items={items} />
              {/* </Fieldset> */}
            </FPaper>
          </FCol>
        </FGrid>
      </FSpace>
    </>
  )
}
