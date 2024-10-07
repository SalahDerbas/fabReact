import { FC, ReactNode, useState } from "react"
import { FInput, FGrid, FCol, FButton, FInputProps, ColProps } from "src/components"
import RequestStatus from "src/constants/enums/request-status"
import { classNames } from "primereact/utils"
import { useFormData } from "src/utils"
import { FEditableTable, FEditableTableProps } from "../f-editable-table"
import { ConfirmDialog } from "primereact/confirmdialog"
import { OperationsItemsNotShowed } from "src/constants/validators"
import { FPanelTime } from "../f-panel/f-panel-time"
import { FLabeled } from "../f-labeled"
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
  resetFrom?: boolean
  onDelete?: () => void
  onBack?: () => void
  deleteButton?: boolean
  fieldsetInformation?: any
  table?: FEditableTableProps
}

export const FFormDefinition: FC<props> = ({
  inputs = [],
  onSubmit,
  status,
  initialInputValues,
  resetFrom,
  onDelete,
  onBack = () => {},
  deleteButton,
  fieldsetInformation,
  table,

  ...restProps
}) => {
  // =================================
  //Hooks
  let { formik, isFormFieldValid }: any = useFormData(initialInputValues, inputs, onSubmit)

  const getFormErrorMessage = (name: string) => {
    return <small className="p-error"> {isFormFieldValid(name) && formik.errors[name]}</small>
  }

  // =================================
  // Define Function For redirect to Home
  const back = () => {
    onBack()
    formik.resetForm()
  }

  const [visible, setVisible] = useState<boolean>(false)

  const accept = () => {
    if (onDelete) onDelete()
  }

  const reject = () => {}

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="p-fluid">
        <FGrid justify="between">
          {/*Inputs*/}
          <FCol lg={5} md={12} span={12}>
            <FGrid>
              {inputs.map(({ name, colProps, component, label, ...restInputProps }, index) => (
                <FCol span={12} key={name} {...colProps}>
                  {/* Label Shared between field and component */}
                  <FLabeled label={label ?? name}>
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
                  </FLabeled>
                </FCol>
              ))}
            </FGrid>
          </FCol>

          {/*Attributes*/}
          <FCol md={12} lg={3} span={12}>
            <FPanelTime fieldsetInformation={fieldsetInformation} notShowedItems={OperationsItemsNotShowed} />
          </FCol>

          {/*table*/}
          {table && (
            <FCol span={12}>
              <FEditableTable className="f-editable-table3" {...table} />
            </FCol>
          )}

          {/*Buttons*/}
          <FCol span={12}>
            <FGrid justify="between" className="w-full">
              <FCol>
                {deleteButton && (
                  <div className="w-1">
                    <FButton onClick={() => setVisible(true)} bg="danger">
                      Delete
                    </FButton>
                  </div>
                )}
              </FCol>

              <FCol fixed>
                <FButton bg="primary" type="submit" loading={status === "loading"} {...restProps}>
                  Save
                </FButton>
              </FCol>
              <FCol fixed>
                <FButton onClick={() => back()} bg="secondary">
                  Back
                </FButton>
              </FCol>
            </FGrid>
          </FCol>
        </FGrid>
      </form>

      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message="Are you sure you want to delete?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={accept}
        reject={reject}
        position="top"
      />

      {/*  Delete Button for Form */}
      {/* <div style={divDeleteForm}>
        {deleteButton && (
          <FButton onClick={() => confirmDelete()} bg="danger" style={deleteStyle}>
            Delete
          </FButton>
        )}
      </div> */}
    </>
  )
}
