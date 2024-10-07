import React from "react"
import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { FCol, FGrid } from "src/components"
import { FFormSummary } from "src/components/f-form-summary"
import { FLoadingData } from "src/components/f-loading-data"
import { RootState } from "src/core/redux/store"

interface props {}

export const AddSummary: React.FC<props> = () => {
  const { productionTarget, status } = useSelector((state: RootState) => state.ProductionTargets)
  const { production_target_id }: any = useParams()

  let history = useHistory()
  const onBack = () => history.push("/operations/production-targets")
  const onSubmitForm = (formProductionTarget: any) => {}

  return (
    <FGrid style={{ height: "744px" }}>
      <FCol lg={12} sm={12}>
        <FLoadingData status={status}>
          <FGrid justify="center" style={{ height: "620px" }}>
            <FCol span={12} xl={12} lg={12}>
              <FFormSummary
                onSubmit={onSubmitForm}
                initialInputValues={production_target_id ? productionTarget : null}
                onBack={onBack}
                status={status}
              />
            </FCol>
          </FGrid>
        </FLoadingData>
      </FCol>
    </FGrid>
  )
}
