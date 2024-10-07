import { FC, ReactNode, useEffect, useState } from "react"
import { FInput, FGrid, FCol, FButton, FInputProps, ColProps } from "src/components"
import RequestStatus from "src/constants/enums/request-status"
import { classNames } from "primereact/utils"
import { useFormData } from "src/utils"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { InputNumber } from "primereact/inputnumber"
import { InsertCuringCyclesAsync, InsertPurgingCycleAsync, ShowProductionTargetAsync } from "src/core/redux"
import { FEditableTable, FEditableTableProps } from "../f-editable-table"
import { Fieldset } from "primereact/fieldset"
import { Tooltip } from "primereact/tooltip"
import { Notification } from "src/utils/ui/toast-message"

import "bootstrap-icons/font/bootstrap-icons.css"
import { RootState } from "src/core/redux/store"
import { InputText } from "primereact/inputtext"
import { ColumnType } from "../f-table/types"
import { purges } from "src/core/interface/purgingCycle"
import { ProdductionTarget } from "src/pages/operations/production-target"

interface InputValidation {
  required: boolean
  rule?: RegExp
}
//Addtional props to f-input component
type FInputFormProps = FInputProps & { colProps?: ColProps; validate?: InputValidation; component?: ReactNode }

interface props {
  // inputs: FInputFormProps[]
  onSubmit: (data: any) => void
  status?: RequestStatus
  initialInputValues?: any
  onBack?: () => void
  // table?: FEditableTableProps
}

export const FFormPurging: FC<props> = ({ onSubmit, status, initialInputValues, onBack = () => {}, ...restProps }) => {
  const { production_target_id }: any = useParams()
  const { productionTarget } = useSelector((state: RootState) => state.ProductionTargets)

  const dispatch = useDispatch()

  const { PurgingCycle } = useSelector((state: RootState) => state.PurgingCycle)
  const { PurgingCycle_id }: any = useParams()
  const disabledInput = <InputText className="p-input-table" disabled />
  const [purgesData, setPurgesData] = useState<any[]>(
    production_target_id && (productionTarget as any)?.curing.purges ? (productionTarget as any)?.curing.purges : []
  )
  useEffect(() => {
    // if(PurgingCycle_id) dispatch(Fet)
  })

  const onSubmitForm = (formPurgingCycle: any) => {
    let data = {
      id: null,
      note: null,
      createdDate: null,
      createdByUser: null,
      curingPressurePSI: null,
      co2ConcentrationPercentage: null,
      curingTimeHours: null,
      purgingPercentage: null,
      co2ConcentAfterPurgingPercentag: null,
      co2Introd1Kg: null,
      co2Introd2Kg: null,
      co2InjectedTotal: null,
      co2AbsorbedTotal: null,
      co2ReleasedTotal: null,
      waterCollectedLitre: null,
      blowDown: {
        id: null,
        co2ConcentrationPercentage: co2ConcentrationPercentageValue,
        temperature: temperatureValue,
        pressureLowPSI: pressureLowPSIValue,
        pressureHighPSI: pressureHighPSIValue,
      },
      purges: purgesData.map((purge: any) => ({
        id: null,
        co2ConcentrationPercentage: purge.co2ConcentrationPercentage,
        temperature: purge.temperature,
        pressureLowPSI: purge.pressureLowPSI,
        pressureHighPSI: purge.pressureHighPSI,
      })),
    }

    dispatch(InsertPurgingCycleAsync(data, production_target_id ?? ""))
  }

  // const onSubmitForm = () => {
  //   if (recipe.length === 0) {
  //     Notification({ severity: "warn", summary: "Please Add Purgings", detail: "" })
  //     return
  //   }
  //   if (PurgingCycle_id) {
  //     // dispatch( UpdateMixDesignAsync({recipe: recipe, }, PurgingCycle_id))
  //   } else {
  //     // dispatch( InsertMixDesignAsync({recipe: recipe,}))
  //   }
  //   let data = {
  //     //   curingPressurePSI: curringPressure,
  //   }

  //   dispatch(InsertCuringCyclesAsync(data, production_target_id ?? ""))
  // }
  useEffect(() => {
    if (production_target_id) {
      setCo2ConcentrationPercentageValue(productionTarget?.curing?.blowDown?.co2ConcentrationPercentage ?? 0)
      setTemperatureValue(productionTarget?.curing?.blowDown?.temperature ?? 0)
      setPressureHighPSIValue(productionTarget?.curing?.blowDown?.pressureHighPSI ?? 0)
      setPressureLowPSIValue(productionTarget?.curing?.blowDown?.pressureLowPSI ?? 0)
    } else {
      setCo2ConcentrationPercentageValue(0)
      setTemperatureValue(0)
      setPressureHighPSIValue(0)
      setPressureLowPSIValue(0)
    }
  }, [production_target_id, productionTarget])

  const [co2ConcentrationPercentageValue, setCo2ConcentrationPercentageValue] = useState<any>(0)
  const [temperatureValue, setTemperatureValue] = useState<any>(0)
  const [pressureLowPSIValue, setPressureLowPSIValue] = useState<any>(0)
  const [pressureHighPSIValue, setPressureHighPSIValue] = useState<any>(0)

  const temperature = (
    <>
      <InputNumber
        inputId="stacked"
        value={temperatureValue}
        onValueChange={(e: any) => setTemperatureValue(e.target.value)}
        onChange={(e: any) => setTemperatureValue(e.value)}
        showButtons
        placeholder="Temperature"
        style={{ height: "36px" }}
        minFractionDigits={2}
      />
    </>
  )
  const pressureHighPSI = (
    <>
      <InputNumber
        inputId="stacked"
        value={pressureHighPSIValue}
        onValueChange={(e: any) => setPressureHighPSIValue(e.target.value)}
        onChange={(e: any) => setPressureHighPSIValue(e.value)}
        showButtons
        placeholder="Pressure High"
        style={{ height: "36px" }}
        minFractionDigits={2}
      />
    </>
  )

  const pressureLowPSI = (
    <>
      <InputNumber
        inputId="stacked"
        value={pressureLowPSIValue}
        onValueChange={(e: any) => setPressureLowPSIValue(e.target.value)}
        onChange={(e: any) => setPressureLowPSIValue(e.value)}
        showButtons
        placeholder="Pressure Low"
        style={{ height: "36px" }}
        minFractionDigits={2}
      />
    </>
  )
  const co2ConcentrationPercentage = (
    <>
      <InputNumber
        inputId="stacked"
        value={co2ConcentrationPercentageValue}
        onValueChange={(e: any) => setCo2ConcentrationPercentageValue(e.target.value)}
        onChange={(e: any) => setCo2ConcentrationPercentageValue(e.value)}
        showButtons
        placeholder="CO2 Concentration"
        min={0}
        max={100}
        style={{ height: "36px" }}
        minFractionDigits={2}
      />
    </>
  )

  const inputs1: FInputFormProps[] = [
    {
      type: "number",
      name: "co2ConcentrationPercentage",
      component: co2ConcentrationPercentage,
      label: "CO2 Concentration %",
      validate: { required: true },
      //   colProps: { span: 12, md: 6 },
      // tooltip: "Curing Pressure",
    },
    {
      type: "number",
      name: "pressureLowPSI",
      component: pressureLowPSI,
      label: "Pressure Low (PSIG) ",
      validate: { required: true },
      //   colProps: { span: 12, md: 6 },
      // tooltip: "Curing Pressure",
    },
    {
      type: "number",
      name: "pressureHighPSI",
      component: pressureHighPSI,
      label: "Pressure High (PSIG) ",
      validate: { required: true },
      //   colProps: { span: 12, md: 6 },
      // tooltip: "Curing Pressure",
    },
    {
      type: "number",
      name: "temperature",
      component: temperature,
      label: "Temperature (°C)",
      validate: { required: true },
      //   colProps: { span: 12, md: 6 },
      // tooltip: "Curing Pressure",
    },
  ]

  const cols: ColumnType[] = [
    {
      field: "pressureLowPSI",
      header: "Pressure Low (PSIG)",
      type: "number",
      style: { flex: 0.25 },
      body: (rec: any) => (rec?.pressureLowPSI === 0 ? disabledInput : rec?.pressureLowPSI ?? ""),
    },
    {
      field: "pressureHighPSI",
      header: "Pressure High (PSIG)",
      type: "number",
      style: { flex: 0.25 },
      body: (rec: any) => (rec?.pressureHighPSI === 0 ? disabledInput : rec?.pressureHighPSI ?? ""),
    },
    {
      field: "co2ConcentrationPercentage",
      header: "CO2 Concentration (%)",
      type: "number",
      style: { flex: 0.25 },
      body: (rec: any) => (rec?.co2ConcentrationPercentage === 0 ? disabledInput : rec?.co2ConcentrationPercentage ?? ""),
    },
    {
      field: "temperature",
      header: "Temperature (°C)",
      type: "number",
      style: { flex: 0.25 },
      body: (rec: any) => (rec?.temperature === 0 ? disabledInput : rec?.temperature ?? ""),
    },
  ]

  /*------------------------------|| HOOKS ||------------------------------------------------*/
  let { formik, isFormFieldValid }: any = useFormData(initialInputValues, inputs1, onSubmit)

  const getFormErrorMessage = (name: string) => {
    return <small className="p-error"> {isFormFieldValid(name) && formik.errors[name]}</small>
  }
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="p-fluid">
        <FGrid>
          {/*Inputs*/}
          <FCol xl={9} lg={4} span={12} style={{ height: "666px", padding: "0px" }}>
            <FCol>
              <Fieldset legend="Purging Cycles" style={{ padding: "0px" }}>
                {/*table*/}

                <FCol xl={12} lg={12} span={12}>
                  <FEditableTable
                    className="f-editable-table2"
                    dataKey="id"
                    editMode="row"
                    columns={cols}
                    value={production_target_id && productionTarget?.curing?.purges ? productionTarget?.curing?.purges : []}
                    // loading: status === "loading",
                    onUpdateData={(data: any) => {
                      setPurgesData(data)
                    }}
                    fixedRows={false}
                    rows={3}
                    initialRow={{
                      pressureLowPSI: 0,
                      pressureHighPSI: 0,
                      co2ConcentrationPercentage: 0,
                      temperature: 0,
                    }}
                    // resizableColumns: true,
                    columnResizeMode="fit"
                  />
                </FCol>
              </Fieldset>
            </FCol>
          </FCol>
          <FCol xl={3} lg={8} span={12}>
            <Fieldset legend="Blow Down" style={{ padding: "0px" }}>
              {/*table*/}

              <FCol xl={12} lg={12} span={12}>
                <FGrid>
                  {inputs1.map(({ name, colProps, component, label, tooltip, ...restInputProps }, index) => (
                    <FCol span={12} key={name} {...colProps}>
                      {/* Label Shared between field and component */}
                      <FGrid>
                        <FCol className="p-0" span={12} lg={3} style={{ width: "100%" }}>
                          <label className="f-input-label" style={{ marginRight: "3px" }}>
                            {/* {capitalize(label)} */}
                            {label}
                          </label>
                          {tooltip && (
                            <>
                              <Tooltip target=".custom-target-icon" />
                              <i
                                className="custom-target-icon p-text-secondary"
                                data-pr-tooltip={tooltip}
                                data-pr-position="right"
                                data-pr-at="right+5 top"
                                data-pr-my="left center-2"
                              >
                                <span className="bi bi-question-circle-fill" style={{ color: "rgba(64,127,165,0.6)" }}></span>
                              </i>
                              {/* <i
                            className="custom-target-icon p-text-secondary pi pi-info-circle"
                            style={{ color: "blue" }}
                            data-pr-tooltip={tooltip}
                            data-pr-position="right"
                            data-pr-at="right+5 top"
                            data-pr-my="left center-2"
                          ></i> */}
                            </>
                          )}
                        </FCol>
                        <hr></hr>
                        <FCol className="p-0" span={12} lg={9} style={{ width: "100%" }}>
                          <span className="w-full">
                            {component ?? (
                              <>
                                <FInput
                                  name={name}
                                  {...restInputProps}
                                  label={label}
                                  autoFocus={index === 0}
                                  value={formik.values[name]}
                                  tooltip={tooltip}
                                  tooltipOptions={{ position: "top" }}
                                  onChange={formik.handleChange}
                                  errorMessage={getFormErrorMessage(name)}
                                  className={classNames(
                                    {
                                      "p-invalid": isFormFieldValid(name),
                                    },
                                    "p-mr-1"
                                  )}
                                />
                              </>
                            )}
                          </span>
                        </FCol>
                      </FGrid>
                    </FCol>
                  ))}
                </FGrid>
              </FCol>
            </Fieldset>
          </FCol>

          {/*Buttons*/}
          <FCol>
            <FGrid gap={1} justify="end">
              <FCol fixed>
                <FButton bg="primary" type="submit" loading={status === "loading"} onClick={onSubmitForm} {...restProps}>
                  Save
                </FButton>
              </FCol>
              <FCol fixed>
                <FButton
                  onClick={() => {
                    onBack()
                    formik.resetForm()
                  }}
                  bg="secondary"
                >
                  Back
                </FButton>
              </FCol>
            </FGrid>
          </FCol>
        </FGrid>
      </form>
    </>
  )
}
