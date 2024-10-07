import React, { useEffect, useState } from "react"
import { FCol, FGrid, FPaper, FText } from "src/components"
import { useHistory, useParams } from "react-router-dom"
// import { useParams } from "react-router-dom"
import { FLoadingData } from "src/components/f-loading-data"
import { FFormBatch } from "src/components/f-form-batch"
import { FFormBatchPara } from "src/components/f-form-batch-para"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "src/core/redux/store"
import { FetchMixDesignsAsync, FetchUsersAsync, ShowProductionTargetAsync } from "src/core/redux"
import { mixRecipe } from "src/core/interface"
import { ColumnType } from "src/components/f-table/types"

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
      field: "material",
      header: "Material",
      type: "not-editable",
      style: { flex: 0.4 },
      body: (rec: any) => rec?.material?.name,
    },
    {
      field: "value",
      header: "Amount",
      type: "not-editable",
      style: { flex: 0.2 },
      body: (rec: mixRecipe) => rec?.value,
    },
    {
      field: "batchAmount",
      header: "Batch Amount",
      type: "number",
      style: { flex: 0.4 },
      body: (rec: any) => rec?.batchAmount,
    },
  ]
  // console.log(
  //   "production_target_id && (productionTarget as any)?.mix",
  //   production_target_id && (productionTarget as any)?.mix?.recipe
  // )

  // useEffect(() => {
  //   dispatch(FetchUsersAsync())
  // })

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
    <FGrid style={{ height: "628px" }}>
      <FCol lg={12} sm={12}>
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
        {/* <FFormBatch onSubmit={onSubmitForm} /> */}
      </FCol>
    </FGrid>
    // </FPaper>
  )
}
