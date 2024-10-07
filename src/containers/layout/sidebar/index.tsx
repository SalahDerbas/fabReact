import React, { CSSProperties } from "react"
import { useHistory } from "react-router-dom"
import { useWidth } from "src/utils"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "src/core/redux/store"
import { setSidebarOpen } from "src/core/redux/app"
import { getSettingLabels, mainLabels } from "src/constants"
import { FGrid, FSpace } from "src/components"
import { ToggleButton } from "primereact/togglebutton"

import { Sidebar } from "primereact/sidebar"

interface props {}

export const FSidebar: React.FC<props> = () => {
  /*------------------------------|| HOOKS ||------------------------------------------------*/
  const dispatch = useDispatch()
  const history = useHistory()
  const { isMobile } = useWidth()
  const { sidebarOpen } = useSelector((state: RootState) => state.App)
  const closedWidth = isMobile
  const handelSidebar = () => {
    dispatch(setSidebarOpen())
  }

  /*------------------------------|| STYLES ||------------------------------------------------*/

  const togglebuttonStyle: CSSProperties = {
    // position: "absolute",
    top: "95px",
    left: sidebarOpen ? "165px" : "50px",
    width: "28px",
    height: "28px",
    border: "1px solid gray",
    transition: `all 0.3s ease 0s`,
    // zIndex: 2,
  }
  const onIcon = isMobile ? "pi pi-bars" : "pi pi-chevron-left"
  const offIcon = isMobile ? "pi pi-bars" : "pi pi-chevron-right"

  /*------------------------------|| RENDER ||------------------------------------------------*/
  return (
    <>
      {!isMobile && (
        <>
          <Sidebar
            className={`absolute z-2 overflow-x-hidden sidebarStyle ${
              sidebarOpen ? "opend" : `${!closedWidth ? "closed" : "closedMobile"}`
            }`}
            onHide={handelSidebar}
            baseZIndex={-1}
            visible={true}
            modal={false}
            dismissable
            showCloseIcon={true}
          >
            <div className="sidebar-menu">
              <FGrid style={{ alignContent: "space-between", height: "95%" }}>
                {/*main labels (on top)*/}
                <div>
                  {mainLabels(history).map((e: any) => (
                    <div key={e.label} onClick={e.command} className={`aStyle sidebar-menu-link ${e.className}`}>
                      <span className={`sidebar-menu-link-span top menuSidebarStyle ${sidebarOpen ? "Opened" : "closed"}`} />
                      <FSpace gap={10} align="center">
                        <i className={e.icon} style={{ fontSize: "0.9em" }} />
                        {sidebarOpen ? e.label : ""}
                      </FSpace>
                      <span className={`sidebar-menu-link-span bottom menuSidebarStyle ${sidebarOpen ? "Opened" : "closed"}`} />
                    </div>
                  ))}
                </div>
                {/*setting labels (on bottom)*/}
                <div>
                  {getSettingLabels(history).map((el) => (
                    <div key={el.label} onClick={el.command} className={`aStyle sidebar-menu-link ${el.className}`}>
                      <span className={`sidebar-menu-link-span top menuSidebarStyle ${sidebarOpen ? "Opened" : "closed"}`} />
                      <FSpace gap={10} align="center">
                        <i className={el.icon} style={{ fontSize: "0.9em" }} />
                        {sidebarOpen ? el.label : ""}
                      </FSpace>
                      <span className={`sidebar-menu-link-span bottom menuSidebarStyle ${sidebarOpen ? "Opened" : "closed"}`} />
                    </div>
                  ))}
                </div>
              </FGrid>
            </div>
          </Sidebar>

          <ToggleButton
            style={togglebuttonStyle}
            checked={sidebarOpen}
            onChange={handelSidebar}
            onLabel=""
            offLabel=""
            onIcon={`${onIcon} primary-color`}
            offIcon={`${offIcon} primary-color`}
            className="p-button-rounded fixed z-1"
            //className={`p-button-rounded absolute z-2 togglebuttonStyle ${sidebarOpen ? "sidebarOpened" : "sidebarClosed"}`}
          />
        </>
      )}
      {/* {isMobile && (
        <>
          <Menu model={allLabels(history)} popup={true} ref={(el) => (menu = el)} />
          <Avatar
            className="avatarStyles absolute z-1 fixed"
            // style={{ ...avatarStyles, position: "fixed" }}
            icon={`${onIcon} primary-color`}
            onClick={(event) => menu.toggle(event)}
          />
        </>
      )} */}
    </>
  )
}
