import React from "react"
import { RootState } from "src/core/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { FCol, FForm, FInputFormProps } from "src/components"
import moment from "moment"
import { Stillage } from "src/core/interface"

interface props {
  hideDialog: any
  stillage?: Stillage | undefined
  action: Function
  keepOpen?: boolean
  resetFrom?: boolean
}

export const AddStillage: React.FC<props> = ({ hideDialog, stillage, action, keepOpen, resetFrom }) => {
  const dispatch = useDispatch()
  const { status } = useSelector((state: RootState) => state.Stillage)

  const onSubmitAddStillage = (formStillage: Stillage) => {
    dispatch(
      action({
        stillageId: stillage?.stillageId,
        number: formStillage.number,
        weight: formStillage.weight,
        date: moment(formStillage.date).format("YYYY-MM-DD hh:mm:ss.SSS"),
      })
    )
    if (!keepOpen) hideDialog()
  }

  const inputs: FInputFormProps[] = [
    {
      type: "number",
      name: "number",
      label: "Stillage #",
      placeholder: "Stillage #",
      validate: { required: true },
      colProps: { span: 12, md: 6 },
    },
    {
      type: "number",
      mode: "decimal",
      name: "weight",
      label: "Weight",
      placeholder: "Weight",
      validate: { required: true },
      colProps: { span: 12, md: 6 },
    },
    {
      type: "time",
      name: "date",
      label: "Date",
      placeholder: "Date",
      showTime: true,
      showSeconds: true,
      validate: { required: true },
      showMillisec: true,
      mask: "99/99/9999 99:99:99.999",
      colProps: { span: 12, md: 6 },
    },
  ]

  return (
    <FCol span={12}>
      <FForm
        inputs={inputs}
        onCancel={hideDialog}
        onSubmit={onSubmitAddStillage}
        submitLable={stillage ? `Update` : `Submit`}
        status={status}
        resetFrom={resetFrom}
        initialInputValues={stillage}
      />
    </FCol>
  )
}
