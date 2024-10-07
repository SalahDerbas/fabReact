import React from "react"
import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { FCol, FGrid } from "src/components"
import { FFormCuring } from "src/components/f-form-curing"
import { FLoadingData } from "src/components/f-loading-data"
import { RootState } from "src/core/redux/store"

interface props {}

export const AddCuringCycle: React.FC<props> = () => {
  const { status } = useSelector((state: RootState) => state.ProductionTargets)

  const { CuringCycle } = useSelector((state: RootState) => state.CuringCycle)
  const { CuringCycle_id }: any = useParams()
  let history = useHistory()
  const onBack = () => history.push("/operations/production-targets")
  const onSubmitForm = () => {}

  return (
    <FGrid style={{ height: "744px" }}>
      <FCol lg={12} sm={12}>
        <FLoadingData status={status}>
          <FGrid justify="center" style={{ height: "627px" }}>
            <FCol span={12} xl={12} lg={12}>
              <FFormCuring
                onSubmit={onSubmitForm}
                initialInputValues={CuringCycle_id ? CuringCycle : null}
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
