import React from "react"
import { RootState } from "src/core/redux/store"
import { CreateAhuAsync } from "src/core/redux"
import { useDispatch, useSelector } from "react-redux"
import { FCol, FForm, FInputFormProps } from "src/components"
import moment from "moment"
import { Ahu } from "src/core/interface"

interface props {
  hideDialog: any
}

export const AddAhu: React.FC<props> = ({ hideDialog }) => {
  const dispatch = useDispatch()
  const { status } = useSelector((state: RootState) => state.Ahu)

  const onSubmitAddAhu = (ahu: Ahu) => {
    dispatch(CreateAhuAsync({ ...ahu, date: moment(ahu.date).format("YYYY-MM-DD hh:mm:ss.SSS") }))
  }

  const inputs: FInputFormProps[] = [
    {
      type: "number",
      mode: "decimal",
      name: "number",
      label: "Number ",
      placeholder: " Number ",
      validate: { required: true },
      colProps: { span: 12, md: 6 },
    },
    {
      type: "time",
      name: "date",
      label: "Date",
      placeholder: " Date ",
      showTime: true,
      showSeconds: true,
      validate: { required: true },
      colProps: { span: 12, md: 6 },
    },
    {
      type: "number",
      mode: "decimal",
      name: "humidity",
      label: "Humidity",
      placeholder: " Humidity ",
      validate: { required: true },
      colProps: { span: 12, md: 6 },
    },
    {
      type: "number",
      mode: "decimal",
      name: "inletTemperature",
      label: "Inlet Temperature",
      placeholder: " Inlet Temperature ",
      validate: { required: true },
      colProps: { span: 12, md: 6 },
    },

    {
      type: "number",
      mode: "decimal",
      name: "humiditySetpoint",
      label: "Humidity Setpoint",
      placeholder: "Humidity Setpoint ",
      validate: { required: true },
      colProps: { span: 12, md: 6 },
    },

    {
      type: "number",
      mode: "decimal",
      name: "o2level",
      label: "O2 Level",
      placeholder: " O2 Level",
      validate: { required: true },
      colProps: { span: 12, md: 6 },
    },

    {
      type: "number",
      mode: "decimal",
      name: "controlTemperatureSetpoint",
      label: "Control Temperature Setpoint",
      placeholder: " Control Temperature Setpoint ",
      validate: { required: true },
      colProps: { span: 12, md: 6 },
    },

    {
      type: "number",
      mode: "decimal",
      name: "heaterTemperatureSetpoint",
      label: "Heater Temperature Setpoint",
      placeholder: "Heater Temperature Setpoint ",
      validate: { required: true },
      colProps: { span: 12, md: 6 },
    },

    {
      type: "number",
      mode: "decimal",
      name: "co2level",
      label: "CO2 level",
      placeholder: "Co2 level ",
      validate: { required: true },
      colProps: { span: 12, md: 6 },
    },

    {
      type: "number",
      mode: "decimal",
      name: "pressure",
      label: "Pressure",
      placeholder: " Pressure ",
      validate: { required: true },
      colProps: { span: 12, md: 6 },
    },

    {
      type: "number",
      mode: "decimal",
      name: "controlTemperature",
      label: "Control Temperature ",
      placeholder: " Control Temperature  ",
      validate: { required: true },
      colProps: { span: 12, md: 6 },
    },
  ]

  return (
    <FCol span={12}>
      <FForm inputs={inputs} onSubmit={onSubmitAddAhu} status={status} resetFrom />
    </FCol>
  )
}
