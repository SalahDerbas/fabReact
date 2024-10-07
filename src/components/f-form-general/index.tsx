import { FC, ReactNode, useEffect, useState } from "react"
import { FInput, FGrid, FCol, FButton, FInputProps, ColProps } from "src/components"
import RequestStatus from "src/constants/enums/request-status"
import { classNames } from "primereact/utils"
import { useFormData } from "src/utils"
import { InputNumber } from "primereact/inputnumber"
import "bootstrap-icons/font/bootstrap-icons.css"
import { Tooltip } from "primereact/tooltip"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { RootState } from "src/core/redux/store"
import { FetchGeneralSettingsAsync, UpdateGeneralSettingsAsync } from "src/core/redux"

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
}

export const FFormGeneral: FC<props> = ({
  onSubmit,
  status,
  initialInputValues,

  ...restProps
}) => {
  const dispatch = useDispatch()
  const { generalSetting_id, chamberVolumeValue } = useSelector((state: RootState) => state.GeneralSetting)
  const [chamberVolume, setChamberVolume] = useState<any>()

  const chamberVolumeInput = (
    <InputNumber
      inputId="stacked"
      value={chamberVolume}
      onValueChange={(e: any) => setChamberVolume(e.target.value)}
      onChange={(e: any) => setChamberVolume(e.value)}
      showButtons
      placeholder="Chamber Volume"
      min={0}
      style={{ height: "36px", width: "252px" }}
    />
  )
  const inputs: FInputFormProps[] = [
    {
      type: "number",
      name: "chamberVolume",
      component: chamberVolumeInput,
      label: "Chamber Volume (Liter)",
      placeholder: "Conditions",
      validate: { required: true },
      colProps: { span: 12, md: 6 },
    },
  ]
  useEffect(() => {
    dispatch(FetchGeneralSettingsAsync())
    setChamberVolume(chamberVolumeValue)
  }, [])

  const onSubmitForm = () => {
    let data = {
      chamberVolume: chamberVolume,
    }

    dispatch(FetchGeneralSettingsAsync())
    dispatch(UpdateGeneralSettingsAsync(data, generalSetting_id))
    // dispatch(UpdateGeneralSettingsAsync(data, generalSetting_id ?? ""))
  }
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
          <FCol xl={6} lg={12} span={12} style={{ height: "570px" }}>
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
            </FGrid>
          </FCol>
        </FGrid>
      </form>
    </>
  )
}
