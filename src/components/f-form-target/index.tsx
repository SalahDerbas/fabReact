import { FC, ReactNode, useEffect } from "react"
import { FInput, FGrid, FCol, FButton, FInputProps, ColProps } from "src/components"
import RequestStatus from "src/constants/enums/request-status"
import { classNames } from "primereact/utils"
import { FEditableTable, FEditableTableProps } from "../f-editable-table"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "src/core/redux/store"
import { FetchMixDesignsAsync } from "src/core/redux"
import { FTableProps } from "../f-table"
import { FLabeled } from "../f-labeled"
import { useFormData } from "src/utils"
import { FPanelTime } from "../f-panel/f-panel-time"
import { OperationsItemsNotShowed } from "src/constants/validators"
import { useParams } from "react-router-dom"
import { Tooltip } from "primereact/tooltip"

interface InputValidation {
  required: boolean
  rule?: RegExp
}
//Addtional props to f-input component
type FInputFormProps = FInputProps & { colProps?: ColProps; validate?: InputValidation; component?: ReactNode }

interface props {
  inputs: FInputFormProps[]
  onSubmit: (data: any) => void
  status?: RequestStatus
  initialInputValues?: any
  onBack?: () => void
  table?: FEditableTableProps
  mixTable?: FTableProps
  onPublish?: (() => void) | null
  onReject?: (() => void) | null
  onAccept?: (() => void) | null
  selectedMix?: number | null
  disabled?: boolean
}

export const FFormTarget: FC<props> = ({
  inputs = [],
  onSubmit,
  status,
  initialInputValues,
  onBack = () => {},
  table,
  onPublish,
  mixTable,
  selectedMix,
  onReject,
  disabled,
  onAccept,
  ...restProps
}) => {
  /*------------------------------|| HOOKS ||------------------------------------------------*/
  let { formik, isFormFieldValid }: any = useFormData(initialInputValues, inputs, onSubmit)

  const getFormErrorMessage = (name: string) => {
    return <small className="p-error"> {isFormFieldValid(name) && formik.errors[name]}</small>
  }
  const { production_target_id }: any = useParams()
  const { productionTarget } = useSelector((state: RootState) => state.ProductionTargets)

  const { mixDesigns, status: mixStatus } = useSelector((state: RootState) => state.MixDesigns)

  const fieldsetInformation = production_target_id
    ? {
        createdDate: productionTarget?.createdDate,
        lastModifiedDate: productionTarget?.lastModifiedDate,
        createdByUser: productionTarget?.createdByUser,
        modifiedByUser: productionTarget?.modifiedByUser,
      }
    : null

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(FetchMixDesignsAsync())
  }, [])

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="p-fluid">
        <FGrid>
          {/*Inputs*/}
          <FCol xl={3} lg={3} span={12} style={{ height: "380px", marginTop: "-5px" }}>
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
                    {/* <hr></hr> */}
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

                  {/* Label Shared between field and component */}
                  {/* <FLabeled label={label ?? name}>
                    {component ?? (
                      <FInput
                        name={name}
                        {...restInputProps}
                        label={label}
                        autoFocus={index === 0}
                        value={formik.values[name]}
                        onChange={formik.handleChange}
                        errorMessage={getFormErrorMessage(name)}
                        className={classNames(
                          {
                            "p-invalid": isFormFieldValid(name),
                          },
                          "p-mr-1"
                        )}
                      />
                    )}
                  </FLabeled> */}
                </FCol>
              ))}
            </FGrid>
          </FCol>
          <FCol xl={9} lg={9} span={12}>
            {table && (
              <FCol span={12}>
                <FEditableTable fixedRows={false} {...table} />
              </FCol>
            )}
            <FCol span={12} style={{ marginTop: "22px" }}>
              {mixTable && (
                <DataTable
                  className="f-custom-table"
                  scrollable
                  scrollHeight="100%"
                  value={!selectedMix ? mixDesigns[0]?.recipe ?? [] : mixDesigns[selectedMix]?.recipe}
                  size="small"
                  // style={{ marginBottom: "52x" }}
                  loading={mixStatus === "loading"}
                  responsiveLayout="scroll"
                >
                  {mixTable.columns?.map((mixDesignColumn, index) => (
                    <Column key={index} {...mixDesignColumn}></Column>
                  ))}
                </DataTable>
              )}
            </FCol>
            {/* <FPanelTime fieldsetInformation={fieldsetInformation} notShowedItems={OperationsItemsNotShowed} /> */}
          </FCol>
          <FCol span={12} style={{ height: "131px" }}>
            {/* {mixTable && (
              <DataTable
                className="f-custom-table"
                scrollable
                scrollHeight="100%"
                value={!selectedMix ? mixDesigns[0]?.recipe ?? [] : mixDesigns[selectedMix]?.recipe}
                size="small"
                // style={{ marginBottom: "52x" }}
                loading={mixStatus === "loading"}
                responsiveLayout="scroll"
              >
                {mixTable.columns?.map((mixDesignColumn, index) => (
                  <Column key={index} {...mixDesignColumn}></Column>
                ))}
              </DataTable>
            )} */}
          </FCol>

          {/*Buttons*/}
          <FCol>
            <FGrid gap={1} justify="end">
              {onPublish && (
                <FCol fixed>
                  <FButton
                    bg="primary"
                    // loading={status === "loading"}
                    onClick={onPublish}
                    disabled={disabled}
                    type="button"
                    {...restProps}
                  >
                    Publish
                  </FButton>
                </FCol>
              )}
              {onAccept && (
                <FCol fixed>
                  <FButton
                    // style={{ width: "100px" }}
                    bg="primary"
                    // loading={status === "loading"}
                    onClick={onAccept}
                    type="button"
                    {...restProps}
                  >
                    Accept
                  </FButton>
                </FCol>
              )}
              {onReject && (
                <FCol fixed>
                  <FButton
                    bg="primary"
                    loading={status === "loading"}
                    // onClick={onBack}
                    type="button"
                    {...restProps}
                    onClick={onReject}
                  >
                    Reject
                  </FButton>
                </FCol>
              )}
              <FCol fixed>
                <FButton
                  bg="primary"
                  type="submit"
                  loading={status === "loading"}
                  disabled={disabled}
                  // onClick={onBack}
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
