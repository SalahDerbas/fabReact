import { FC, ReactNode, useEffect, useState } from "react"
import { FInput, FGrid, FCol, FButton, FInputProps, ColProps } from "src/components"
import RequestStatus from "src/constants/enums/request-status"
import { classNames } from "primereact/utils"
import { useFormData } from "src/utils"
import { InputNumber } from "primereact/inputnumber"
import { InputTextarea } from "primereact/inputtextarea"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { InsertSummaryAsync, ShowProductionTargetAsync } from "src/core/redux"
import { Dropdown } from "primereact/dropdown"
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

export const FFormSummary: FC<props> = ({
  onSubmit,
  status,
  initialInputValues,
  onBack = () => {},

  ...restProps
}) => {
  const { production_target_id }: any = useParams()
  const [quantityDamaged, setQuantityDamaged] = useState<any>(0)
  const [notevalue, setNoteValue] = useState("")
  const [selectSensors, setSelectSensors] = useState<any>(null)
  const { productionTarget } = useSelector((state: RootState) => state.ProductionTargets)

  function onSensorsChange(e: { value: any }) {
    setSelectSensors(e.value)
  }
  const sensorsOption = [
    { label: "Normal", value: "Normal" },
    { label: "Not Functional", value: "Not Functional" },
  ]

  const sensorsInput = (
    <Dropdown
      value={selectSensors}
      options={sensorsOption}
      onChange={onSensorsChange}
      style={{ width: "100%" }}
      optionLabel="label"
      placeholder="Sensors"
    />
  )

  const quantityDamagedInput = (
    <InputNumber
      inputId="stacked"
      value={quantityDamaged}
      onValueChange={(e: any) => setQuantityDamaged(e.target.value)}
      onChange={(e: any) => setQuantityDamaged(e.value)}
      showButtons
      placeholder="Quantity of Damaged"
      min={0}
      style={{ height: "36px" }}
    />
  )

  const noteInput = <InputTextarea value={notevalue} onChange={(e: any) => setNoteValue(e.target.value)} rows={6} cols={30} />

  const inputs: FInputFormProps[] = [
    {
      type: "number",
      name: "quantityOfDamagedBlocks",
      component: quantityDamagedInput,
      label: "Damaged Blocks (CMUs)",
      validate: { required: true },
      colProps: { span: 12, md: 6 },
    },

    {
      type: "number",
      name: "sensorsCondtion",
      label: "Sensors",
      component: sensorsInput,
      validate: { required: true },
      colProps: { span: 12, md: 6 },
    },
    {
      type: "text",
      name: "note",
      component: noteInput,
      label: "Note",
      validate: { required: true },
      colProps: { span: 12, md: 12 },
    },
  ]

  const dispatch = useDispatch()

  const onSubmitForm = () => {
    let data = {
      quantityOfDamagedBlocks: quantityDamaged,
      sensorsCondtion: selectSensors,
      note: notevalue,
    }

    dispatch(InsertSummaryAsync(data, production_target_id ?? ""))
  }

  useEffect(() => {
    if (production_target_id) {
      setQuantityDamaged(productionTarget?.summary?.quantityOfDamagedBlocks ?? 0)
      setSelectSensors(productionTarget?.summary?.sensorsCondtion ?? null)
      setNoteValue(productionTarget?.summary?.note ?? "")
    } else {
      setQuantityDamaged(0)
      setSelectSensors(null)
      setNoteValue("")
    }
  }, [production_target_id, productionTarget])

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
          <FCol xl={6} lg={6} span={12} style={{ height: "666px" }}>
            <FGrid>
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
            </FGrid>
          </FCol>
          <FCol xl={6} lg={6}></FCol>

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
