import React from "react"

interface props {
  drawerIsOpen: boolean
}

export const Footer: React.FC<props> = ({ drawerIsOpen }) => {
  /*------------------------------|| RENDER ||------------------------------------------------*/
  return <div className={`overflow-x-hidden p-mt-auto footerDrawer ${drawerIsOpen ? "opend" : "closed"}`}>Footer</div>
}
