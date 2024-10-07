import React, { useEffect, useState } from "react"
import { RootState } from "src/core/redux/store"
import { AddNewMaterial, DeleteMaterial, UpdateMaterialAsync, ShowMaterialAsync, FetchUnitsAsync } from "src/core/redux"
import { useDispatch, useSelector } from "react-redux"
import { FFormDefinition, FInputFormProps, FPaper } from "src/components"
import { useHistory, useParams } from "react-router-dom"
import { Dropdown } from "primereact/dropdown"
import { FLoadingData } from "src/components/f-loading-data"
import { Notification } from "src/utils/ui/toast-message"
import { Material } from "src/core/interface"

interface props {
  keepOpen?: boolean
  resetFrom?: boolean
}

export const AddMaterial: React.FC<props> = (props) => {
  //Hooks
  let history = useHistory()
  const dispatch = useDispatch()
  const { material, units, status } = useSelector((state: RootState) => state.Materials)
  const { material_id }: any = useParams()
  const [selectUnit, setSelectUnit] = useState<any>(null)

  useEffect(() => {
    dispatch(FetchUnitsAsync())
    if (material_id) dispatch(ShowMaterialAsync(material_id))
  }, [])

  useEffect(() => {
    material_id && setSelectUnit(material?.unit.name)
  }, [material_id, material])

  //Events
  const onSubmitForm = (formMaterial: Material) => {
    if (!selectUnit) {
      Notification({ severity: "warn", summary: "Please Add an unit", detail: "" })
      return
    }
    if (material_id)
      dispatch(UpdateMaterialAsync({ ...formMaterial, unit: units.find((un) => un.name === selectUnit)! }, material_id ?? ""))
    else {
      dispatch(AddNewMaterial({ ...formMaterial, unit: units.find((un) => un.name === selectUnit)! }))
    }
    history.push("/definitions/materials")
  }

  const onUnitChange = (e: any) => {
    setSelectUnit(e.value)
  }
  const groupedItemTemplate = (option: any) => {
    return (
      <div className="flex align-items-center country-item">
        <div>{option.name}</div>
      </div>
    )
  }

  // Actions
  const onBack = () => {
    history.push("/definitions/materials")
  }
  const onDelete = () => {
    dispatch(DeleteMaterial(material_id ?? ""))
    history.push("/definitions/materials")
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
      type: "text",
      name: "desc",
      label: "Description",
      placeholder: "Description",
      validate: { required: true },
    },
    {
      name: "unit",
      component: (
        <Dropdown
          value={selectUnit}
          options={units.map((unit) => unit.name)}
          onChange={onUnitChange}
          optionGroupTemplate={groupedItemTemplate}
          placeholder="Select a Unit"
        />
      ),
    },
  ]

  return (
    <FPaper>
      <FLoadingData status={status}>
        <FFormDefinition
          inputs={inputs}
          onSubmit={onSubmitForm}
          initialInputValues={material_id ? material : null}
          deleteButton={material_id}
          onDelete={onDelete}
          onBack={onBack}
          fieldsetInformation={material_id ? material : null}
        />
      </FLoadingData>
    </FPaper>
  )
}
