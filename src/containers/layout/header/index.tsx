import React from "react"
import { RightNavbar, LeftNavbar } from "src/containers/layout/navbar/navbar"
import { FGrid, FCol } from "src/components"
import { Toolbar } from "primereact/toolbar"
interface props {}

export const Header: React.FC<props> = () => {
  /*------------------------------|| RENDER ||------------------------------------------------*/
  return (
    <FGrid className="header w-full z-1 m-0 fixed" align="center">
      <FCol className="p-0">
        <Toolbar className="toolbar py-1 px-3" left={<LeftNavbar />} right={<RightNavbar />} />
      </FCol>
    </FGrid>
  )
}
