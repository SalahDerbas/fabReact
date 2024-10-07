import { Panel } from "primereact/panel"
import { FC } from "react"

interface props {}

export const FPanel: FC<props> = ({ children }) => {
  return <Panel className="p-panel-content text-xs">{children}</Panel>
}
