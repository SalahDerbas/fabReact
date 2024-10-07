import moment from "moment"
import { Avatar } from "primereact/avatar"
import React from "react"
import { FCol, FGrid, FSpace, FText } from "src/components"

interface props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  userName: string
  date: string
  note: string
}

export const FNote: React.FC<props> = ({ date, note, userName, ...rest }) => {
  /*------------------------------|| RENDER ||------------------------------------------------*/
  return (
    <div className="note" {...rest}>
      <FGrid>
        <FCol fixed>
          <Avatar className="border-circle" label="A" size="normal" shape="circle" />
        </FCol>
        <FCol>
          <FSpace gap={3} direction="vertical">
            <FText fs={4} fw="bold">
              {userName}
            </FText>
            <FText fs={5} color="gray">
              {moment(date).format("lll")}
            </FText>
          </FSpace>
        </FCol>
        <FCol span={12}>
          <FText fs={4} color="primary">
            {note}
          </FText>
        </FCol>
      </FGrid>
    </div>
  )
}
