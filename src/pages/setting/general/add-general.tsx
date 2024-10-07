import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { FCol, FGrid } from "src/components"
import { FFormGeneral } from "src/components/f-form-general"
import { FetchGeneralSettingsAsync, UpdateGeneralSettingsAsync } from "src/core/redux"
import { RootState } from "src/core/redux/store"

interface props {}
export const AddGeneral: React.FC<props> = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(FetchGeneralSettingsAsync())
  }, [])

  const { generalSetting, status, generalSetting_id, chamberVolumeValue } = useSelector(
    (state: RootState) => state.GeneralSetting
  )

  const { general_setting_id }: any = useParams()

  const onSubmitForm = () => {}

  return (
    <FGrid>
      <FCol lg={12} sm={12}>
        <FGrid justify="center" style={{ height: "647px" }}>
          <FCol span={12} xl={12} lg={12}>
            <FFormGeneral onSubmit={onSubmitForm} initialInputValues={generalSetting_id ?? generalSetting} status={status} />
          </FCol>
        </FGrid>
      </FCol>
    </FGrid>
  )
}
