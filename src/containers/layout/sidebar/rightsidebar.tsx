import React, { useState } from "react"
import { Sidebar } from "primereact/sidebar"
import { FCol, FGrid, FText } from "src/components"
import { ToggleButton } from "primereact/togglebutton"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "src/core/redux/store"
import { Avatar } from "primereact/avatar"
import { Menu } from "primereact/menu"
import { useHistory } from "react-router-dom"
import { confirmDialog } from "primereact/confirmdialog"
import { signOut } from "src/core/redux"

interface props {}
export const Rightsidebar: React.FC<props> = () => {
  /*------------------------------|| HOOKS ||------------------------------------------------*/
  let history = useHistory()

  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.Authentication)
  //states
  const [visibleRight, setVisibleRight] = useState(false)
  //menu ref
  let menu: any, note: any

  /*------------------------------|| ACTIONS ||------------------------------------------------*/
  const confirm = () => {
    confirmDialog({
      message: "Are you sure you want to Logout?",
      header: "Logout",
      icon: "pi pi-exclamation-triangle",
      accept: () => dispatch(signOut()),
      position: "top",
    })
  }
  /*------------------------------|| MENU ITEMS ||------------------------------------------------*/
  const items = [
    {
      label: "Setting",
      icon: "pi pi-cog p-mr-2",
      command: () => {
        history.push("/setting")
      },
    },
    {
      label: "Logout",
      icon: "pi pi-power-off p-mr-2",
      command: () => {
        confirm()
      },
    },
  ]
  const notes = [
    {
      label: "Notification 1 ",
      icon: "pi pi-bell",
    },
    {
      label: "Notification 2",
      icon: "pi pi-bell",
    },
    {
      label: "Notification 3",
      icon: "pi pi-bell",
    },
    { label: "Notification 4", icon: "pi pi-bell" },
  ]
  /*------------------------------|| RENDER ||------------------------------------------------*/
  // TODO: Redesgin component
  return (
    <>
      <Sidebar
        //className="p-shadow-10"
        modal={true}
        className="sidebarStyle z-1"
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
        dismissable
        showCloseIcon={true}
      >
        <div className="p-sidebar-content">
          <div className="flex flex-column p-mt-4 p-ml-3">
            <FCol>
              <FGrid className="section">
                <Menu model={items} popup={true} ref={(el) => (menu = el)} className="menuStyles1" />
                <Avatar
                  icon="pi pi-user"
                  className="avatarStyles border-circle p-button-rounded p-button-info p-button-outlined"
                  onClick={(event) => menu.toggle(event)}
                />

                <FText color="primary" fs={3} fw="bold" style={{ marginTop: "12px" }}>
                  {user?.username}
                </FText>
              </FGrid>
            </FCol>

            <FCol>
              <FGrid className="section">
                <Avatar
                  icon="pi pi-bars"
                  className="avatarStyles border-circle p-button-rounded p-button-info p-button-outlined"
                />
                <FText color="primary" fs={3} fw="bold" style={{ marginTop: "12px" }}>
                  Setting
                </FText>
              </FGrid>
            </FCol>

            <FCol>
              <FGrid className="section">
                <Menu model={notes} popup={true} ref={(el) => (note = el)} className="menuStyles1" />
                <Avatar
                  icon="pi pi-bell p-overlay-badge"
                  className="avatarStyles border-circle p-button-rounded p-button-info p-button-outlined"
                  onClick={(event) => note.toggle(event)}
                />
                <FText color="primary" fs={3} fw="bold" style={{ marginTop: "12px" }}>
                  Notifications
                </FText>
              </FGrid>
            </FCol>
          </div>
        </div>
      </Sidebar>

      <ToggleButton
        checked={visibleRight}
        onChange={() => setVisibleRight(true)}
        onLabel=""
        offLabel=""
        onIcon="pi pi-chevron-right"
        offIcon="pi pi-chevron-left"
        className="p-button-rounded "
      />
    </>
  )
}
