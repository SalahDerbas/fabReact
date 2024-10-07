import React, { useEffect } from "react"
import { RootState } from "src/core/redux/store"
import { InsertSupplierAsync, DeleteSupplierAsync, UpdateSupplierAsync, ShowSupplierAsync } from "src/core/redux"
import { useDispatch, useSelector } from "react-redux"
import { FFormDefinition, FInputFormProps, FPaper } from "src/components"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { FLoadingData } from "src/components/f-loading-data"
import { Supplier } from "src/core/interface"

interface props {
  action?: Function
  keepOpen?: boolean
  resetFrom?: boolean
}

export const AddSupplier: React.FC<props> = () => {
  const dispatch = useDispatch()
  const { supplier, status } = useSelector((state: RootState) => state.Suppliers)
  const { supplier_id }: any = useParams()
  let history = useHistory()

  useEffect(() => {
    if (supplier_id) dispatch(ShowSupplierAsync(supplier_id))
  }, [])

  const onSubmitForm = (formSupplier: Supplier) => {
    if (supplier_id) dispatch(UpdateSupplierAsync(formSupplier, supplier_id ?? ""))
    else {
      dispatch(InsertSupplierAsync(formSupplier))
    }
    history.push("/definitions/suppliers")
  }

  // Actions
  const onBack = () => history.push("/definitions/suppliers")
  const onDelete = () => {
    dispatch(DeleteSupplierAsync(supplier_id ?? ""))
    history.push("/definitions/suppliers")
  }

  const inputs: FInputFormProps[] = [
    {
      type: "text",
      name: "name",
      label: "Name",
      placeholder: "Name",
      validate: { required: true },
    },
    {
      type: "phonenumber",
      name: "phone",
      mask: "(999)-999-9999",
      placeholder: "(999)-999-9999",
      unmask: true,
      validate: {
        required: true,
      },
      label: "Phone",
    },
    {
      type: "text",
      name: "email",
      label: "Email",
      placeholder: "Email",
      validate: {
        required: true,
        rule: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      },
    },
    {
      type: "text",
      name: "address",
      label: "Address",
      placeholder: "Address",
      validate: { required: true },
    },
  ]

  return (
    <FPaper>
      <FLoadingData status={status}>
        <FFormDefinition
          inputs={inputs}
          onSubmit={onSubmitForm}
          initialInputValues={supplier_id ? supplier : null}
          deleteButton={supplier_id}
          onDelete={onDelete}
          onBack={onBack}
          fieldsetInformation={supplier_id ? supplier : null}
        />
      </FLoadingData>
    </FPaper>
  )
}
