import { FC, useMemo } from "react"
import { InputTextProps, InputText } from "primereact/inputtext"
import { PasswordProps } from "primereact/password"
import { InputTypes } from "src/constants"
import { Password } from "primereact/password"
import { InputMask, InputMaskProps } from "primereact/inputmask"
import { Checkbox, CheckboxProps } from "primereact/checkbox"
import { InputNumber, InputNumberProps } from "primereact/inputnumber"
import { Calendar, CalendarProps } from "primereact/calendar"
import { inputStyle } from "./style"
interface FInputAttributes {
  type?: InputTypes
  name: string
  label?: string | null
  icon?: string
  labelClassName?: string
  errorMessage?: any
  auth?: boolean
  
}
export type FInputProps = FInputAttributes &
  InputTextProps &
  PasswordProps &
  InputMaskProps &
  CheckboxProps &
  InputNumberProps &
  CalendarProps

export const FInput: FC<FInputProps> = ({
  name,
  type,
  label,
  icon,
  placeholder,
  labelClassName,
  errorMessage,
  value,
  onChange,
  mode,
  useGrouping = false,
  auth,

  ...rest
}) => {
  /*------------------------------|| HOOKS ||------------------------------------------------*/
  let { InputComponent, extendAttributs = { style: inputStyle } }: any = useMemo(() => {
    switch (type) {
      case "password":
        return { InputComponent: Password, extendAttributs: { inputStyle: inputStyle, toggleMask: true, onChange } }
      case "text":
        return {
          InputComponent: InputText,
          extendAttributs: {
            style: inputStyle,
            onChange,
          },
        }
      case "phonenumber":
        return { InputComponent: InputMask, extendAttributs: { onChange, style: inputStyle } }
      case "checkbox":
        return { InputComponent: Checkbox, extendAttributs: { onChange } }
      case "number":
        let decimalAttribut = mode === "decimal" ? { maxFractionDigits: 10, minFractionDigits: 2 } : {}

        return {
          InputComponent: InputNumber,
          extendAttributs: {
            inputStyle: inputStyle,
            useGrouping: useGrouping,
            onValueChange: onChange,
            mode: mode,
            ...decimalAttribut,
          },
        }
      case "time":
        return {
          InputComponent: Calendar,
          extendAttributs: {
            onChange,
            inputStyle: inputStyle,
            value: value ? new Date(value) : null,
            minDate: new Date(),
          },
        }
      default:
        break
    }
  }, [type, mode, onChange, useGrouping, value])

  let propsFromName = useMemo(
    () => ({
      label: label ? label : name,
      placeholder: placeholder ? placeholder : name,
      name: name,
      id: name,
    }),
    [name, placeholder, label]
  )
  /*------------------------------|| RENDER ||------------------------------------------------*/
  return (
    <>
      {type !== "checkbox" ? (
        <>
          {icon && <i className={`pi ${icon}`} />}
          <InputComponent value={value} {...extendAttributs} {...propsFromName} {...(rest as any)} />
        </>
      ) : (
        <>
          <InputComponent checked={value} {...extendAttributs} {...propsFromName} {...(rest as any)} />
          <label htmlFor="accept" className={`f-input-label ${labelClassName ? labelClassName : ""}`}>
            {propsFromName.label}
          </label>
        </>
      )}
    </>
  )
}
