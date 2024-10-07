import React, { useEffect, useRef, useState } from "react"
import { FButton, FCol, FGrid, FPaper, FSpace, FText } from "src/components"
import { useHistory, useParams } from "react-router-dom"
// import { useParams } from "react-router-dom"
import { FLoadingData } from "src/components/f-loading-data"
import { FFormBatch } from "src/components/f-form-batch"
import { FFormBatchPara } from "src/components/f-form-batch-para"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "src/core/redux/store"
import { FetchMixDesignsAsync, FetchUsersAsync, ShowProductionTargetAsync } from "src/core/redux"
import { mixRecipe, MixItem } from "src/core/interface"
import { ColumnType } from "src/components/f-table/types"
import { Fieldset } from "primereact/fieldset"
import { Row } from "jspdf-autotable"

interface props {
  action?: Function
  keepOpen?: boolean
  resetFrom?: boolean
}

export const AddBatchParameters: React.FC<props> = () => {
  // const { batch_parameters_id }: any = useParams()
  const { production_target_id }: any = useParams()
  useEffect(() => {
    dispatch(ShowProductionTargetAsync(production_target_id))
  }, [])

  const dispatch = useDispatch()
  const { productionTarget, status } = useSelector((state: RootState) => state.ProductionTargets)
  // const { users } = useSelector((state: RootState) => state.BatchParameters)

  // const { mixDesigns } = useSelector((state: RootState) => state.MixDesigns)
  // const [selectedMix, setSelectedMix] = useState<any>(null)

  // useEffect(() => {
  //   if (mixDesigns && production_target_id) {
  //     setSelectedMix(mixDesigns?.findIndex((mix) => mix.name === (productionTarget as any)?.mix?.name) ?? 0)
  //   }
  // }, [mixDesigns, production_target_id])

  /**********************************************************************************/
  /*********************  mixTable  ********************/
  const cols: ColumnType[] = [
    {
      field: "material.name",
      header: "Material",
      type: "not-editable",
      style: { flex: 0.4 },
      body: (mixItems: MixItem) => mixItems.mixItem?.material?.name
    },
    {
      field: "value",
      header: "Amount",
      type: "not-editable",
      style: { flex: 0.2 },
      body: (mixItems: MixItem) => mixItems?.mixItem?.value,
    },
    {
      field: "batchAmount",
      header: "Batch Amount",
      type: "number",
      style: { flex: 0.4 },
      body: (mixItems: MixItem) => mixItems?.batchAmount,
    },
  ]
  const screenWidth = window.screen.width;
  const mixTable = {
    dataKey: "id",
    editMode: "row",
    columns: cols,
    value: production_target_id && (productionTarget as any)?.mix?.recipe ? (productionTarget as any)?.mix?.recipe : [],
    // loading: status === "loading",
    onUpdateData: (data: any) => {},
    rows: 3,
    initialRow: {
      material: { name: "" },
      value: 0,
      batchAmount: 0,
    } as any,
    // resizableColumns: true,
    columnResizeMode: "fit",
  }

  let history = useHistory()

  const onSubmitForm = (formProductionTarget: any) => {
    history.push("/operations/production-targets")
  }
  const disabled = productionTarget?.status === "PUBLISHED_VOID" || productionTarget?.status === "PUBLISHED"
  return (
    // <FPaper>
    <>

            <FGrid>
                      <FLoadingData status={"data"}>
                      {disabled && (
                          <FFormBatchPara
                          initialInputValues={production_target_id}
                          mixTable={mixTable as any}
                          onSubmit={onSubmitForm}
                          // user={users.map((user) => user.username)}
                          // selectedMix={production_target_id && (productionTarget as any)?.mix?.recipe}
                          ></FFormBatchPara>
                      )}
                      {!disabled && (
                          <FGrid justify="start">
                          <FText fs={2} fw="bold" style={{ justifyContent: "flex-start" }}>
                              No data Found
                          </FText>
                          </FGrid>
                      )}
                      </FLoadingData>
            </FGrid>
    </>
    // </FPaper>
  )
}
