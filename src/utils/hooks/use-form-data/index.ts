import { useFormik } from "formik"
import moment from "moment"
import { useMemo } from "react"
import { FInputFormProps } from "src/components"

interface ReturnType {
  formValidator: (data: any) => any
  initialValues: any
  isFormFieldValid: (name: string) => boolean
  formik: any
}

/* useFormData used to prepare formik data */
export const useFormData = (initialInputValues: any, inputs: FInputFormProps[], onSubmit: (data: any) => any): ReturnType => {
  const { initialValues, formValidator } = useMemo(() => {
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
      formValidator: validate,
    }
  }, [initialInputValues, inputs])
  const formik = useFormik({
    initialValues: initialValues,
    validate: formValidator,
    onSubmit: (data) => {
      onSubmit(data)
      // formik.resetForm()
    },
  })

  const isFormFieldValid = (name: string) => !!(formik.touched[name] && formik.errors[name])

  return {
    initialValues,
    formValidator,
    isFormFieldValid,
    formik,
  }
}
