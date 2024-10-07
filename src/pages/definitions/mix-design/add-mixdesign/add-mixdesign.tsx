import React, { useEffect, useState } from "react"
import { RootState } from "src/core/redux/store"
import {
  InsertMixDesignAsync,
  DeleteMixDesignAsync,
  UpdateMixDesignAsync,
  ShowMixDesignAsync,
  FetchUnitsAsync,
  FetchMaterialsAsync,
  FetchSuppliersAsync,
} from "src/core/redux"
import { useDispatch, useSelector } from "react-redux"
import { FCol, FFormDefinition, FGrid, FInputFormProps, FPaper, FSpace, FText } from "src/components"
import { useHistory, useParams } from "react-router-dom"
import { ColumnType } from "src/components/f-table/types"
import { RadioButton } from "primereact/radiobutton"
import { FLoadingData } from "src/components/f-loading-data"
import { Notification } from "src/utils/ui/toast-message"
import { mixRecipe } from "src/core/interface"
import { InputText } from "primereact/inputtext"
import { Dropdown } from "primereact/dropdown"
interface props {
  keepOpen?: boolean
  resetFrom?: boolean
}

export const AddMixDesign: React.FC<props> = () => {
  let history = useHistory()
  const dispatch = useDispatch()
  const { mixDesign, status } = useSelector((state: RootState) => state.MixDesigns)
  const { materials } = useSelector((state: RootState) => state.Materials)
  const { suppliers } = useSelector((state: RootState) => state.Suppliers)
  const { mixdesign_id }: any = useParams()
  const [recipe, setrecipe] = useState<mixRecipe[]>(mixdesign_id && mixDesign?.recipe ? mixDesign.recipe : [])
  const [isPercentage, setisPercentage] = useState<boolean>(Boolean(mixdesign_id ? mixDesign?.percentage : true))

  useEffect(() => {
    dispatch(FetchUnitsAsync())
    dispatch(FetchMaterialsAsync())
    dispatch(FetchSuppliersAsync())
    if (mixdesign_id) dispatch(ShowMixDesignAsync(mixdesign_id))
  }, [])

  const onSubmitForm = (formMixDesign: any) => {
    if (recipe.length === 0) {
      Notification({ severity: "warn", summary: "Please Add Materials", detail: "" })
      return
    }
    if (mixdesign_id)
      dispatch(
        UpdateMixDesignAsync(
          {
            ...formMixDesign,
            percentage: isPercentage,
            recipe: recipe,
          },
          mixdesign_id
        )
      )
    else {
      dispatch(
        InsertMixDesignAsync({
          ...formMixDesign,
          percentage: isPercentage,
          recipe: recipe,
        })
      )
    }
    history.push("/definitions/mix-design")
  }

  // Actions
  const onBack = () => history.push("/definitions/mix-design")
  const onDelete = () => {
    dispatch(DeleteMixDesignAsync(mixdesign_id ?? ""))
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
      name: "",
      component: (
        <>
          <FSpace style={{ alignItems: "center" }}>
            <RadioButton value={isPercentage} name="Percentage" onChange={() => setisPercentage(true)} checked={isPercentage} />
            <FText fs={4} fw="bold">
              Percentage
            </FText>
            <RadioButton value={isPercentage} name="Amount" onChange={() => setisPercentage(false)} checked={!isPercentage} />
            <FText fs={4} fw="bold">
              Amount
            </FText>
          </FSpace>
        </>
      ),
    },
  ]
  const disabledInput = <InputText className="p-input-table" disabled />

  const cols: ColumnType[] = [
    {
      field: "material",
      header: "Material",
      type: "select",
      options: materials,
      optionName: "name",
      body: (rec: mixRecipe) =>
        rec?.material?.name === "" ? <Dropdown className="p-input-table" disabled /> : rec?.material?.name,
    },

    {
      field: "unit",
      header: "Unit",
      type: "not-editable",
      body: (rec: mixRecipe) => rec?.material?.unit?.name,
    },
    {
      field: "value",
      header: isPercentage ? "Percentage" : "Amount",
      type: "number",
      body: (rec: mixRecipe) =>
        rec?.value === 0 ? disabledInput : isPercentage ? `${rec?.value}%` : `${rec?.value} ${rec?.material?.unit.symbol ?? ""}`,
    },
    {
      field: "supplier",
      header: "Supplier",
      type: "select",
      options: suppliers,
      optionName: "name",
      body: (rec: mixRecipe) =>
        rec?.supplier?.name === "" ? <Dropdown className="p-input-table" disabled /> : rec?.supplier?.name,
    },
    {
      field: "note",
      header: "Note",
      type: "text",
      body: (rec: mixRecipe) => (rec?.note === "" ? disabledInput : rec?.note ?? ""),
    },
  ]

  return (
    <FPaper>
      <FGrid>
        <FCol lg={12} sm={12}>
          <FLoadingData status={status}>
            <FFormDefinition
              inputs={inputs}
              onSubmit={onSubmitForm}
              initialInputValues={mixdesign_id ? mixDesign : null}
              deleteButton={mixdesign_id}
              onDelete={onDelete}
              onBack={onBack}
              fieldsetInformation={mixdesign_id ? mixDesign : null}
              table={{
                dataKey: "id",
                editMode: "row",
                fixedRows: false,
                columns: cols,
                value: mixdesign_id && mixDesign?.recipe ? mixDesign.recipe : [],
                // loading: status === "loading",
                onUpdateData: (data) => {
                  setrecipe(data)
                },
                rows: 3,
                initialRow: {
                  material: {
                    name: "",
                    unit: {
                      name: "",
                    },
                  },
                  value: 0,
                  supplier: {
                    name: "",
                  },
                  note: "",
                },
              }}
            />
          </FLoadingData>
        </FCol>
      </FGrid>
    </FPaper>
  )
}
