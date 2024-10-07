import { FC } from "react"
import { capitalize } from "src/utils"
import { FGrid } from "../f-grid"
import { FCol } from "../f-col"
interface props {
  label: any
}

export const FLabeled: FC<props> = ({ children, label }) => {
  /*------------------------------|| RENDER ||------------------------------------------------*/
  return (
    <FGrid>
      <FCol className="p-0" span={12} lg={3}>
        <label htmlFor="username1" className="f-input-label">
          {capitalize(label)}
        </label>
      </FCol>
      <FCol className="p-0" span={12} lg={9}>
        <span className="w-full">{children}</span>
      </FCol>
    </FGrid>
  )
}
