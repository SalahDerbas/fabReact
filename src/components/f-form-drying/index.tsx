import { FC, ReactNode, useEffect, useState } from "react"
import { FInput, FGrid, FCol, FButton, FInputProps, ColProps } from "src/components"
import RequestStatus from "src/constants/enums/request-status"
import { classNames } from "primereact/utils"
import { useFormData } from "src/utils"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { InputNumber } from "primereact/inputnumber"
import { Dropdown } from "primereact/dropdown"
import { InsertDryingCyclesAsync, ShowProductionTargetAsync } from "src/core/redux"
import "bootstrap-icons/font/bootstrap-icons.css"
import { Tooltip } from "primereact/tooltip"
import { RootState } from "src/core/redux/store"

interface InputValidation {
  required: boolean
  rule?: RegExp
}
//Addtional props to f-input component
type FInputFormProps = FInputProps & { colProps?: ColProps; validate?: InputValidation; component?: ReactNode }

interface props {
  onSubmit: (data: any) => void
  status?: RequestStatus
  initialInputValues?: any
  onBack?: () => void
}

export const FFormDrying: FC<props> = ({
  onSubmit,
  status,
  initialInputValues,
  onBack = () => {},

  ...restProps
}) => {
  const [conditionValue, setConditionValue] = useState<any>(0)
  const [finalWeightValue, setFinalWeightValue] = useState<any>(0)

  const [dryingTime, setDryingTime] = useState<any>(0)
  const [heaterTime, setHeaterTime] = useState<any>(0)
  const [heaterTemp, setHeaterTemp] = useState<any>(0)
  const [airSpeedValue, setAirSpeedValue] = useState<any>(0)

  const [selectStatusDoor, setSelectStatusDoor] = useState<any>(null)
  const [selectLeakingCond, setSelectLeakingCond] = useState<any>(null)
  const { productionTarget } = useSelector((state: RootState) => state.ProductionTargets)

  const { production_target_id }: any = useParams()

  const dispatch = useDispatch()

  const onSubmitForm = () => {
    let data = {
      startWeight: conditionValue,
      finalWeight: finalWeightValue,
      totalFanTime: dryingTime,
      totalHeaterTime: heaterTime,
      heaterTemp: heaterTemp,
      airSpeedinChamberPercentage: airSpeedValue,
      statusOfDoorDuringDrying: selectStatusDoor,
      leaking: selectLeakingCond,
    }

    dispatch(InsertDryingCyclesAsync(data, production_target_id ?? ""))
  }

  useEffect(() => {
    if (production_target_id) {
      setConditionValue(productionTarget?.drying?.startWeight ?? 0)
      setFinalWeightValue(productionTarget?.drying?.finalWeight ?? 0)
      setDryingTime(productionTarget?.drying?.totalFanTime ?? 0)
      setHeaterTime(productionTarget?.drying?.totalHeaterTime ?? 0)
      setHeaterTemp(productionTarget?.drying?.heaterTemp ?? 0)
      setAirSpeedValue(productionTarget?.drying?.airSpeedinChamberPercentage ?? 0)
      setSelectStatusDoor(productionTarget?.drying?.statusOfDoorDuringDrying ?? null)
      setSelectLeakingCond(productionTarget?.drying?.leaking ?? null)
    } else {
      setConditionValue(0)
      setFinalWeightValue(0)
      setDryingTime(0)
      setHeaterTime(0)
      setHeaterTemp(0)
      setAirSpeedValue(0)
      setSelectStatusDoor(null)
      setSelectLeakingCond(null)
    }
  }, [production_target_id, productionTarget])

  const conditions = (
    <InputNumber
      inputId="stacked"
      value={conditionValue}
      onValueChange={(e: any) => setConditionValue(e.target.value)}
      onChange={(e: any) => setConditionValue(e.value)}
      showButtons
      placeholder="Initial Weight"
      min={0}
      // max={100}
      style={{ height: "36px" }}
      minFractionDigits={2}
    />
  )

  const finalWeight = (
    <InputNumber
      inputId="stacked"
      value={finalWeightValue}
      onValueChange={(e: any) => setFinalWeightValue(e.target.value)}
      onChange={(e: any) => setFinalWeightValue(e.value)}
      showButtons
      placeholder="Final Weight"
      min={0}
      // max={100}
      style={{ height: "36px" }}
      minFractionDigits={2}
    />
  )
  const dryingTotalTime = (
    <InputNumber
      inputId="stacked"
      value={dryingTime}
      onValueChange={(e: any) => setDryingTime(e.target.value)}
      onChange={(e: any) => setDryingTime(e.value)}
      showButtons
      placeholder="Total Fan Drying Time"
      min={0}
      style={{ height: "36px" }}
      minFractionDigits={2}
    />
  )

  const heaterT = (
    <InputNumber
      inputId="stacked"
      value={heaterTime}
      onValueChange={(e: any) => setHeaterTime(e.target.value)}
      onChange={(e: any) => setHeaterTime(e.value)}
      showButtons
      placeholder="Total Heater Time"
      min={0}
      style={{ height: "36px" }}
      minFractionDigits={2}
    />
  )

  const heaterTempurture = (
    <InputNumber
      inputId="stacked"
      value={heaterTemp}
      onValueChange={(e: any) => setHeaterTemp(e.target.value)}
      onChange={(e: any) => setHeaterTemp(e.value)}
      showButtons
      placeholder="Heater Temp"
      min={0}
      // max={1000}
      style={{ height: "36px" }}
      minFractionDigits={2}
    />
  )

  const airSpeed = (
    <InputNumber
      inputId="stacked"
      value={airSpeedValue}
      onValueChange={(e: any) => setAirSpeedValue(e.target.value)}
      onChange={(e: any) => setAirSpeedValue(e.value)}
      showButtons
      placeholder="Air speed in Chamber"
      min={0}
      max={100}
      style={{ height: "36px" }}
      minFractionDigits={2}
    />
  )

  function onStatusDoorChange(e: { value: any }) {
    setSelectStatusDoor(e.value)
  }

  const statusOfDoorDuringDrying = [
    { label: "Open", value: "Open" },
    { label: "Closed", value: "Closed" },
    { label: "Sealed", value: "Sealed" },
  ]

  const statusOfDoor = (
    <Dropdown
      value={selectStatusDoor}
      options={statusOfDoorDuringDrying}
      onChange={onStatusDoorChange}
      style={{ width: "100%" }}
      optionLabel="label"
      placeholder="Status of Door During Drying "
    />
  )

  function onLeakingCondChange(e: { value: any }) {
    setSelectLeakingCond(e.value)
  }
  const leakingCondOption = [
    { label: "Sealed", value: "Sealed" },
    { label: "Not Sealed", value: "Not Sealed" },
  ]

  const leakingCond = (
    <Dropdown
      value={selectLeakingCond}
      options={leakingCondOption}
      onChange={onLeakingCondChange}
      style={{ width: "100%" }}
      optionLabel="label"
      placeholder="Leaking Conditions "
    />
  )

  const inputs: FInputFormProps[] = [
    {
      type: "text",
      name: "statusOfDoorDuringDrying",
      label: "Door Status",
      component: statusOfDoor,
      placeholder: "Status of door during drying",
      validate: { required: true },
      colProps: { span: 12, md: 6 },
    },
    {
      type: "text",
      name: "leaking",
      label: "Leaking Status",
      component: leakingCond,
      placeholder: "Leaking Status",
      validate: { required: true },
      colProps: { span: 12, md: 6 },
    },
    {
      type: "number",
      name: "startWeight",
      component: conditions,
      label: "Starting Board Weight (Kg)",
      placeholder: "Conditions",
      validate: { required: true },
      colProps: { span: 12, md: 6 },
    },
    {
      type: "number",
      name: "finalWeight",
      component: finalWeight,
      label: "Final Board Weight (Kg)",
      placeholder: "Conditions",
      validate: { required: true },
      colProps: { span: 12, md: 6 },
    },
    {
      type: "number",
      name: "totalFanTime",
      label: "Drying Time (hour)",
      component: dryingTotalTime,
      placeholder: "Total Fan Drying Time",
      validate: { required: true },
      colProps: { span: 12, md: 6 },
    },
    {
      type: "number",
      name: "airSpeedinChamberPercentage",
      label: "Air Speed (%)",
      component: airSpeed,
      placeholder: "Air speed in Chamber",
      validate: { required: true },
      colProps: { span: 12, md: 6 },
    },
    {
      type: "number",
      name: "totalHeaterTime",
      label: "Heater Time (hour)",
      component: heaterT,
      placeholder: "Total Heater Time",
      validate: { required: true },
      colProps: { span: 12, md: 6 },
    },
    {
      type: "number",
      name: "heaterTemp",
      label: "Heater Temperature (°C)",
      component: heaterTempurture,
      placeholder: "Heater Temp",
      validate: { required: true },
      colProps: { span: 12, md: 6 },
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
          <FCol xl={6} lg={12} span={12} style={{ height: "666px" }}>
            <FGrid>
              {inputs.map(({ name, colProps, component, label, tooltip, ...restInputProps }, index) => (
                <FCol span={12} key={name} {...colProps}>
                  {/* Label Shared between field and component */}
                  <FGrid>
                    <FCol className="p-0" span={12} lg={3} style={{ width: "100%" }}>
                      <label htmlFor="username1" className="f-input-label" style={{ marginRight: "3px" }}>
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
                          </i>{" "}
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
          <FCol xl={6}></FCol>

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
