import { FC, ReactNode, useEffect, useState } from "react"
import { FInput, FGrid, FCol, FButton, FInputProps, ColProps } from "src/components"
import RequestStatus from "src/constants/enums/request-status"
import { classNames } from "primereact/utils"
import { useFormData } from "src/utils"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { InputNumber } from "primereact/inputnumber"
import { InsertCuringCyclesAsync } from "src/core/redux"
import { Tooltip } from "primereact/tooltip"

import "bootstrap-icons/font/bootstrap-icons.css"
import { RootState } from "src/core/redux/store"

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

export const FFormCuring: FC<props> = ({ onSubmit, status, initialInputValues, onBack = () => {}, ...restProps }) => {
  const { production_target_id }: any = useParams()
  const { productionTarget } = useSelector((state: RootState) => state.ProductionTargets)

  const dispatch = useDispatch()
  const onSubmitForm = () => {
    let data = {
      curingPressurePSI: curringPressure,
      co2ConcentrationPercentage: concentraction,
      curingTimeHours: curringTime,
      purgingPercentage: concentractionBeforP,
      co2ConcentAfterPurgingPercentage: concentractionAfterP,
      co2Introd1Kg: introdToAttain,
      co2Introd2Kg: introdToDurring,
      co2InjectedTotal: introducedInjected,
      co2AbsorbedTotal: absorbed,
      co2ReleasedTotal: released,
      waterCollectedLitre: waterCollected,
    }

    dispatch(InsertCuringCyclesAsync(data, production_target_id ?? ""))
  }
  useEffect(() => {
    if (production_target_id) {
      setCurringPressure(productionTarget?.curing?.result?.curingPressurePSI ?? 0)
      setConcentraction(productionTarget?.curing?.result?.co2ConcentrationPercentage ?? 0)
      setcurringTime(productionTarget?.curing?.result?.curingTimeHours ?? 0)
      setWaterCollected(productionTarget?.curing?.result?.waterCollectedLitre ?? 0)
      setAbsorbed(productionTarget?.curing?.result?.co2AbsorbedTotal ?? 0)
      setReleased(productionTarget?.curing?.result?.co2ReleasedTotal ?? 0)
      setConcentractionBeforP(productionTarget?.curing?.result?.purgingPercentage ?? 0)
      setConcentractionAfterP(productionTarget?.curing?.result?.co2ConcentAfterPurgingPercentage ?? 0)
      setIntrodToAttain(productionTarget?.curing?.result?.co2Introd1Kg ?? 0)
      setIntrodToDurring(productionTarget?.curing?.result?.co2Introd2Kg ?? 0)
      setIntroducedInjected(productionTarget?.curing?.result?.co2InjectedTotal ?? 0)
    } else {
      setCurringPressure(0)
      setConcentraction(0)
      setcurringTime(0)
      setWaterCollected(0)
      setAbsorbed(0)
      setReleased(0)
      setConcentractionBeforP(0)
      setConcentractionAfterP(0)
      setIntrodToAttain(0)
      setIntrodToDurring(0)
      setIntroducedInjected(0)
    }
  }, [production_target_id, productionTarget])

  const [curringPressure, setCurringPressure] = useState<any>(0)
  const [concentraction, setConcentraction] = useState<any>(0)
  const [curringTime, setcurringTime] = useState<any>(0)
  const [waterCollected, setWaterCollected] = useState<any>(0)
  const [absorbed, setAbsorbed] = useState<any>(0)
  const [released, setReleased] = useState<any>(0)
  const [concentractionBeforP, setConcentractionBeforP] = useState<any>(0)
  const [concentractionAfterP, setConcentractionAfterP] = useState<any>(0)
  const [introdToAttain, setIntrodToAttain] = useState<any>(0)
  const [introdToDurring, setIntrodToDurring] = useState<any>(0)
  const [introducedInjected, setIntroducedInjected] = useState<any>(0)
  const [curingCycleTemp, setCuringCycleTemp] = useState<any>(0)

  const curringPressureInput = (
    <>
      <InputNumber
        inputId="stacked"
        value={curringPressure}
        onValueChange={(e: any) => setCurringPressure(e.target.value)}
        onChange={(e: any) => setCurringPressure(e.value)}
        showButtons
        placeholder="Curring Pressure"
        min={0}
        style={{ height: "36px" }}
        minFractionDigits={2}
      />
    </>
  )
  const concentractionInput = (
    <InputNumber
      inputId="stacked"
      value={concentraction}
      onValueChange={(e: any) => setConcentraction(e.target.value)}
      onChange={(e: any) => setConcentraction(e.value)}
      showButtons
      placeholder="Concentration"
      min={0}
      max={100}
      style={{ height: "36px" }}
      minFractionDigits={2}
    />
  )

  const curringTimeInput = (
    <InputNumber
      inputId="stacked"
      value={curringTime}
      onValueChange={(e: any) => setcurringTime(e.target.value)}
      onChange={(e: any) => setcurringTime(e.value)}
      showButtons
      placeholder="Curring Time"
      min={0}
      style={{ height: "36px" }}
      minFractionDigits={2}
    />
  )

  const waterCollectedInput = (
    <InputNumber
      inputId="stacked"
      value={waterCollected}
      onValueChange={(e: any) => setWaterCollected(e.target.value)}
      onChange={(e: any) => setWaterCollected(e.value)}
      showButtons
      placeholder="Water Collected "
      min={0}
      style={{ height: "36px" }}
      minFractionDigits={2}
    />
  )

  const absorbedInput = (
    <InputNumber
      inputId="stacked"
      value={absorbed}
      onValueChange={(e: any) => setAbsorbed(e.target.value)}
      onChange={(e: any) => setAbsorbed(e.value)}
      showButtons
      placeholder="Absorbed "
      min={0}
      style={{ height: "36px" }}
      minFractionDigits={2}
    />
  )

  const releasedInput = (
    <InputNumber
      inputId="stacked"
      value={released}
      onValueChange={(e: any) => setReleased(e.target.value)}
      onChange={(e: any) => setReleased(e.value)}
      showButtons
      placeholder="Released "
      min={0}
      style={{ height: "36px" }}
      minFractionDigits={2}
    />
  )

  const concentractionBeforPInput = (
    <InputNumber
      inputId="stacked"
      value={concentractionBeforP}
      onValueChange={(e: any) => setConcentractionBeforP(e.target.value)}
      onChange={(e: any) => setConcentractionBeforP(e.value)}
      showButtons
      placeholder="Concentraction Befor Purging "
      min={0}
      max={100}
      style={{ height: "36px" }}
      minFractionDigits={2}
    />
  )

  const concentractionAfterPInput = (
    <InputNumber
      inputId="stacked"
      value={concentractionAfterP}
      onValueChange={(e: any) => setConcentractionAfterP(e.target.value)}
      onChange={(e: any) => setConcentractionAfterP(e.value)}
      showButtons
      placeholder="Concentraction After Purging"
      min={0}
      max={100}
      style={{ height: "36px" }}
      minFractionDigits={2}
    />
  )

  const introdToAttainInput = (
    <InputNumber
      inputId="stacked"
      value={introdToAttain}
      onValueChange={(e: any) => setIntrodToAttain(e.target.value)}
      onChange={(e: any) => setIntrodToAttain(e.value)}
      showButtons
      placeholder="Introd To Attain"
      min={0}
      max={100}
      style={{ height: "36px" }}
      minFractionDigits={2}
    />
  )

  const introdToDurringInput = (
    <InputNumber
      inputId="stacked"
      value={introdToDurring}
      onValueChange={(e: any) => setIntrodToDurring(e.target.value)}
      onChange={(e: any) => setIntrodToDurring(e.value)}
      showButtons
      placeholder="Introd To Durring"
      min={0}
      style={{ height: "36px" }}
      minFractionDigits={2}
    />
  )

  const introducedInjectedInput = (
    <InputNumber
      inputId="stacked"
      value={introducedInjected}
      onValueChange={(e: any) => setIntroducedInjected(e.target.value)}
      onChange={(e: any) => setIntroducedInjected(e.value)}
      showButtons
      placeholder="Introduced / Injected"
      min={0}
      style={{ height: "36px" }}
      minFractionDigits={2}
    />
  )

  const curingCycleTemprature = (
    <InputNumber
      inputId="stacked"
      value={curingCycleTemp}
      onValueChange={(e: any) => setCuringCycleTemp(e.target.value)}
      onChange={(e: any) => setCuringCycleTemp(e.value)}
      showButtons
      placeholder="Curing Cycle Temprature"
      min={0}
      style={{ height: "36px" }}
      minFractionDigits={2}
    />
  )

  const inputs: FInputFormProps[] = [
    {
      type: "number",
      name: "curingPressurePSI",
      component: curringPressureInput,
      label: "Curing Pressure (psi)",
      validate: { required: true },
      colProps: { span: 12, md: 6 },
      // tooltip: "Curing Pressure",
    },
    {
      type: "number",
      name: "co2ConcentrationPercentage",
      label: "CO2 %",
      component: concentractionInput,
      validate: { required: true },
      colProps: { span: 12, md: 6 },
      // tooltip: "CO2 Concentration Percentage",
    },
    {
      type: "number",
      name: "curingTimeHours",
      label: "Curing Time (hours)",
      component: curringTimeInput,
      validate: { required: true },
      colProps: { span: 12, md: 6 },
      // tooltip: "Curing Time Hours",
    },
    {
      type: "number",
      name: "waterCollectedLitre",
      label: "Collected Water (Liter)",
      component: waterCollectedInput,
      validate: { required: true },
      colProps: { span: 12, md: 6 },
      // tooltip: "Water Collected Litre",
    },
    {
      type: "number",
      name: "co2AbsorbedTotal",
      label: " Absorbed CO2",
      component: absorbedInput,
      validate: { required: true },
      colProps: { span: 12, md: 6 },
      // tooltip: "Co2 total Absorbed",
    },
    {
      type: "number",
      name: "co2ReleasedTotal",
      label: "Released CO2",
      component: releasedInput,
      validate: { required: true },
      colProps: { span: 12, md: 6 },
      // tooltip: "Co2 total released",
    },
    {
      type: "number",
      name: "curingCycleTemprature",
      label: "Curing Cycle Temprature (°C)",
      component: curingCycleTemprature,
      validate: { required: true },
      colProps: { span: 12, md: 6 },
      // tooltip: "Curing Cycle Temprature",
    },
    {
      type: "number",
      name: "co2InjectedTotal",
      label: "Injected CO2 (Kg)",
      component: introducedInjectedInput,
      validate: { required: true },
      colProps: { span: 12, md: 6 },
      // tooltip: "CO2 introduced / injected TOTAL ",
    },

    {
      type: "number",
      name: "purgingPercentage",
      label: "CO2 % Before Purging",
      component: concentractionBeforPInput,
      validate: { required: true },
      colProps: { span: 12, md: 6 },
      // tooltip: "CO2 Concentration befor purging",
    },
    {
      type: "text",
      name: "co2ConcentAfterPurgingPercentage",
      label: "CO2 % After Purging",
      component: concentractionAfterPInput,
      validate: { required: true },
      colProps: { span: 12, md: 6 },
      // tooltip: "CO2 Concentration after purging",
    },
    {
      type: "number",
      name: "co2Introd1Kg",
      label: "CO2 injected to keep Target% (Kg)",
      component: introdToAttainInput,
      validate: { required: true },
      colProps: { span: 12, md: 6 },
      tooltip: "CO2 introd to attain PSI and Concentration target",
    },
    {
      type: "number",
      name: "co2Introd2Kg",
      label: "CO2 During Absorption (Kg)",
      component: introdToDurringInput,
      validate: { required: true },
      colProps: { span: 12, md: 6 },
      tooltip: "CO2 introd during absorption after target attained",
    },
  ]

  /*------------------------------|| HOOKS ||------------------------------------------------*/
  let { formik, isFormFieldValid }: any = useFormData(initialInputValues, inputs, onSubmit)

  const getFormErrorMessage = (name: string) => {
    return <small className="p-error"> {isFormFieldValid(name) && formik.errors[name]}</small>
  }
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="p-fluid">
        <FGrid>
          {/*Inputs*/}
          <FCol xl={6} lg={8} span={12} style={{ height: "666px", padding: "0px" }}>
            <FGrid>
              {inputs.map(({ name, colProps, component, label, tooltip, ...restInputProps }, index) => (
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
          <FCol xl={6} lg={4} span={12}></FCol>

          {/*Buttons*/}
          <FCol>
            <FGrid gap={1} justify="end">
              <FCol fixed>
                <FButton
                  bg="primary"
                  // type="submit"
                  loading={status === "loading"}
                  onClick={onSubmitForm}
                  {...restProps}
                >
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
