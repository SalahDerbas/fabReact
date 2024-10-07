import { FC, ReactNode, useMemo } from "react"
import { FInputProps, FInput, FGrid, FCol, FButton, ColProps } from "src/components"
import { useFormik } from "formik"
import RequestStatus from "src/constants/enums/request-status"
import { classNames } from "primereact/utils"
import { FSpace } from "../f-space"
import moment from "moment"
import { capitalize } from "src/utils"
interface InputValidation {
  required: boolean
  rule?: RegExp
}
//Addtional props to f-input component
export type FInputFormProps = FInputProps & { colProps?: ColProps; validate?: InputValidation; component?: ReactNode }

interface props {
  inputs: FInputFormProps[]
  onSubmit: (data: any) => void
  onCancel?: (data: any) => void
  status?: RequestStatus
  submitLable?: string
  initialInputValues?: any
  resetFrom?: boolean
}
export const FForm: FC<props> = ({
  inputs = [],
  onSubmit,
  onCancel,
  status,
  submitLable = "Submit",
  initialInputValues,
  resetFrom,
  ...restProps
}) => {
  let { formValidate, initialValues }: any = useMemo(() => {
    // Define formik values
    let initValues: any = {}
    //for each input in form set : initial Value
    if (!initialInputValues)
      inputs.forEach((input) => {
        initValues[input.name] = ""
      })
    else {
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
  }, [inputs, initialInputValues])

  const formik = useFormik({
    initialValues: initialValues,
    validate: formValidate,
    onSubmit: (data) => {
      onSubmit(data)
      if (resetFrom) formik.resetForm()
    },
  })

  const isFormFieldValid = (name: string) => !!(formik.touched[name] && formik.errors[name])
  const getFormErrorMessage = (name: string) => {
    return <small className="p-error"> {isFormFieldValid(name) && formik.errors[name]}</small>
  }

  return (
    <form onSubmit={formik.handleSubmit} className="p-fluid">
      <FGrid>
        {inputs.map(({ name, colProps, component, label, ...restInputProps }, index) => (
          <FCol span={12} key={name} {...colProps}>
            {!component ? (
              <>
                <span className="labeled">{capitalize(label ?? name)}</span>
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
              </>
            ) : (
              <>
                <span className="labeled">{capitalize(label ?? name)}</span>
                {component}
              </>
            )}
          </FCol>
        ))}

        <FCol span={12} className="justify-items-end">
          <FSpace gap={10} direction="vertical">
            <FButton type="submit" label={submitLable} loading={status === "loading"} {...restProps} />
            {/* {onCancel && <FButton type="reset" label="Close" onClick={onCancel} {...restProps} />} */}
          </FSpace>
        </FCol>
      </FGrid>
    </form>
  )
}
