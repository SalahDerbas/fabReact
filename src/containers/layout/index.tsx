import React from "react"
import { Header } from "src/containers/layout/header/index"
import { useLocation } from "react-router-dom"
import { useWidth } from "src/utils"
import { useSelector } from "react-redux"
import { RootState } from "src/core/redux/store"
import { FSidebar } from "./sidebar"
// import { Footer } from "./footer"

interface props {}

export const Layout: React.FC<props> = ({ children }) => {
  /*------------------------------|| HOOKS ||------------------------------------------------*/

  /*!!!!! Important : Refresh path name when route changes*/
  useLocation()

  const { isMobile } = useWidth()
  const { sidebarOpen } = useSelector((state: RootState) => state.App)

  const laptopMargin = !sidebarOpen ? "4.5rem" : "11.5rem"
  const content_style: React.CSSProperties = {
    minHeight: "70vh",
    padding: "3.5rem 1.5rem",
    marginLeft: isMobile ? "0" : laptopMargin,
    transition: "all .3s",
    overflowX: "hidden",
    marginTop: "2.9rem",
    height: "817px",
  }

  /*------------------------------|| RENDER ||------------------------------------------------*/
  return (
    <div className="flex flex-column content-div">
      <Header />
      <FSidebar />
      <div style={content_style}>{children}</div>
      {/* <Footer drawerIsOpen={sidebarOpen} /> */}
    </div>
  )
}
