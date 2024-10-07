import React from "react"
import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { FCol, FGrid } from "src/components"
import { FFormDrying } from "src/components/f-form-drying"
import { FLoadingData } from "src/components/f-loading-data"
import { RootState } from "src/core/redux/store"

interface props {}
export const AddDryingCycle: React.FC<props> = () => {
  const { productionTarget, status } = useSelector((state: RootState) => state.ProductionTargets)
  let history = useHistory()
  const onBack = () => history.push("/operations/production-targets")
  const { dryingCycle } = useSelector((state: RootState) => state.DryingCycle)
  const { dryingCycle_id }: any = useParams()
  const onSubmitForm = () => {}

  return (
    <FGrid style={{ height: "744px" }}>
      <FCol lg={12} sm={12}>
        <FLoadingData status={status}>
          <FGrid justify="center" style={{ height: "627px" }}>
            <FCol span={12} xl={12} lg={12}>
              <FFormDrying
                onSubmit={onSubmitForm}
                initialInputValues={dryingCycle_id ? dryingCycle : null}
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
