import React, { FC } from "react"
import moment from "moment"
import { useSelector } from "react-redux"
import { FCol, FText } from "src/components"
import { RootState } from "src/core/redux/store"
import { FPanel } from "."
import { filterObjectKeys } from "src/utils/helpers/filter-object-keys"
import { splitToCapitalized } from "src/utils/helpers/splitToCapitalized"

interface props {
  fieldsetInformation: any
  notShowedItems: string[]
}

export const FPanelTime: FC<props> = ({ fieldsetInformation, notShowedItems }) => {
  /*------------------------------|| HOOKS ||------------------------------------------------*/
  const { user } = useSelector((state: RootState) => state.Authentication)

  /*------------------------------|| RENDER ||------------------------------------------------*/
  return (
    <FPanel>
      {fieldsetInformation ? (
        filterObjectKeys(fieldsetInformation, notShowedItems).map(([key, value]: [string, any]) => (
          <React.Fragment key={key}>
            <FCol sm={12}>
              <FText fs={5} fw="bold">
                {splitToCapitalized(key)}{" "}
                <FText fs={5}>{key === "createdDate" || key === "lastModifiedDate" ? moment(value).format("LL") : value}</FText>
              </FText>
            </FCol>
          </React.Fragment>
        ))
      ) : (
        <>
          {/* Define Component for Time in New Item */}
          <FCol span={12} sm={12}>
            <FText fs={5} fw="bold">
              Created Date <FText fs={5}>{moment().format("LLL")}</FText>
            </FText>
          </FCol>

          <FCol span={12} sm={12}>
            <FText fs={5} fw="bold">
              Last Modified Date
            </FText>
          </FCol>
          <FCol span={12} sm={12}>
            <FText fs={5} fw="bold">
              Created By User <FText fs={5}>{user?.username}</FText>
            </FText>
          </FCol>

          <FCol span={12} sm={12}>
            <FText fs={5} fw="bold">
              Modified By User
            </FText>
          </FCol>
        </>
      )}
    </FPanel>
  )
}
