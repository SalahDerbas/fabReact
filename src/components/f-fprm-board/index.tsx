import React, { FC, ReactNode } from "react"
import { FGrid, FCol, FButton, FInputProps, ColProps } from "src/components"
import { useFormik } from "formik"
import RequestStatus from "src/constants/enums/request-status"
import moment from "moment"
import { FEditableTable, FEditableTableProps } from "../f-editable-table"
interface InputValidation {
  required: boolean
  rule?: RegExp
}
//Addtional props to f-input component
type FInputFormProps = FInputProps & { colProps?: ColProps; validate?: InputValidation; component?: ReactNode }

interface props {
  inputs?: FInputFormProps[]
  onSubmit: (data: any) => void
  onCancel?: (data: any) => void
  status?: RequestStatus
  submitLable?: string
  initialInputValues?: any
  resetFrom?: boolean
  onDelete?: () => void
  onBack?: () => void
  deleteButton?: boolean
  labels?: string
  fieldsetInformation?: any
  table?: FEditableTableProps
  onPublish?: () => void
  withOutPanel?: boolean
}

let getFormData = (initialInputValues: any, inputs: FInputFormProps[]) => {
  // Define formik values
  let initValues: any = {}
  //for each input in form set : initial Value
  if (!initialInputValues) {
    inputs.forEach((input) => {
      initValues[input.name] = ""
    })
  } else {
    inputs.forEach((input: FInputFormProps) => {
      if (input.type === "number" && isNaN(parseFloat(initialInputValues[input.name]))) initValues[input.name] = 0
      else if (input.type === "time" && !moment(initialInputValues[input.name], "yyyy-MM-dd HH:mm:ss.SSS").isValid()) {
        initValues[input.name] = moment().format("YYYY-MM-DD hh:mm:ss.SSS")
      } else initValues[input.name] = initialInputValues[input.name]
    })
  }

  //for each input in form set : error value
  let validate: (data: any) => any = (data: any) => {
    let errors: any = {}
    inputs.forEach((input) => {
      const fieldName = input.label ? input.label : input.name
      switch (input.name) {
        case "confirmPassword":
          if (!data.confirmPassword) {
            errors.confirmPassword = "Confirm Password is required."
          } else if (data.confirmPassword !== data.password) {
            errors.confirmPassword = "confirm password not match."
          }
          break
        default:
          if (input.validate?.required) {
            if (!data[input.name]) {
              errors[input.name] = `${fieldName} is required.`
            } else if (input.validate.rule && !input.validate.rule.test(data[input.name])) {
              errors[input.name] = `Invalid ${fieldName} format.`
            }
          }
          break
      }
    })

    return errors
  }
  return {
    initialValues: initValues,
    formValidate: validate,
  }
}

export const FFormBoard: FC<props> = ({
  inputs = [],
  onSubmit,
  onCancel,
  status,
  submitLable = "Submit",
  initialInputValues,
  resetFrom,
  onDelete,
  onBack = () => {},
  deleteButton,
  labels,
  fieldsetInformation,
  table,
  onPublish,
  withOutPanel,
  ...restProps
}) => {
  // const { user } = useSelector((state: RootState) => state.Authentication)

  let { formValidate, initialValues }: any = getFormData(initialInputValues, inputs)

  const formik = useFormik({
    initialValues: initialValues,
    validate: formValidate,
    onSubmit: (data) => {
      onSubmit(data)
      formik.resetForm()
    },
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="p-fluid">
        <FGrid>
          <FCol xl={12} lg={12} span={12} style={{ height: "570px" }}>
            {/*table*/}
            {table && (
              <FCol span={12}>
                <FEditableTable {...table} />
              </FCol>
            )}
          </FCol>
          {/*Buttons*/}
          <FCol>
            <FGrid justify="end">
              <FCol fixed>
                <FButton bg="primary" type="submit" loading={status === "loading"} {...restProps}>
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
