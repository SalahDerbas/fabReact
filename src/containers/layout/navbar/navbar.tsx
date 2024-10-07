import React, { useState } from "react"
import { Avatar } from "primereact/avatar"
import { Menu } from "primereact/menu"
import { useWidth } from "src/utils"
import { Rightsidebar } from "../sidebar/rightsidebar"
import { useDispatch, useSelector } from "react-redux"
import { signOut } from "src/core/redux"
import { ConfirmDialog } from "primereact/confirmdialog" // To use confirmDialog method
import { RootState } from "src/core/redux/store"
import { FSpace, FText } from "src/components"
import { useHistory } from "react-router-dom"
import { FCol, FGrid, FTabMenu } from "src/components"
import { navbarItems } from "src/constants/layout/navbar"
import { allLabels } from "src/constants"
interface props {}

export const RightNavbar: React.FC<props> = () => {
  /*------------------------------|| HOOKS ||------------------------------------------------*/
  const [visible, setVisible] = useState<boolean>(false)

  let history = useHistory()
  const { user } = useSelector((state: RootState) => state.Authentication)
  const dispatch = useDispatch()

  const { isMobile } = useWidth()

  let menu: any
  let sett: any
  /*------------------------------|| ACTIONS ||------------------------------------------------*/

  // const confirm = () => {
  //   confirmDialog({
  //     message: "Are you sure you want to Logout?",
  //     header: "Logout",
  //     icon: "pi pi-exclamation-triangle",
  //     accept: () => dispatch(signOut()),
  //     position: "center",
  //   })
  // }
  /*------------------------------|| MENU ITEMS ||------------------------------------------------*/
  const items = [
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

  const settings = [
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
        setVisible(true)
      },
    },
  ]
  return (
    <div>
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message="Are you sure you want to proceed?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={() => dispatch(signOut())}
        position="top"
      />{" "}
      <div className="right-navbar layout-topbar-icons">
        {!isMobile && (
          <>
            <FSpace className="options mx-5" direction="horizontal" align="center">
              <Menu className="mt-3" model={items} popup={true} ref={(el) => (menu = el)} />
              <Avatar
                icon="pi pi-bell p-overlay-badge"
                className="avatar p-button-rounded p-button-info p-button-outlined"
                onClick={(event) => menu.toggle(event)}
              />

              <Menu className="mt-3" model={settings} popup={true} ref={(en) => (sett = en)} />

              <Avatar
                icon="pi pi-user"
                className="avatar p-button-rounded p-button-info p-button-outlined"
                onClick={(event) => sett.toggle(event)}
              />
              <FText color="primary" fs={3} fw="bold">
                {user?.username}
              </FText>
            </FSpace>
          </>
        )}

        {isMobile && <Rightsidebar />}
      </div>
    </div>
  )
}

interface leftProps {}
export const LeftNavbar: React.FC<leftProps> = () => {
  /*------------------------------|| HOOKS ||------------------------------------------------*/
  let history = useHistory()
  const { isMobile } = useWidth()
  const model = navbarItems(history)
  /*------------------------------|| ACTIONS ||------------------------------------------------*/
  const onClickLogo = () => {
    history.push("/")
  }
  let menu: any
  return (
    <FGrid align="center" className="left-navbar w-full">
      {!isMobile && (
        <FCol fixed className="logo-container p-0">
          <a href="/" onClick={onClickLogo}>
            <img src="/images/smallLogo.png" alt="fabsight" />
          </a>
        </FCol>
      )}
      {isMobile && (
        <FCol fixed>
          <Menu model={allLabels(history)} popup={true} ref={(el) => (menu = el)} />
          <Avatar
            className="f-avatar p-button-rounded p-button-info p-button-outlined"
            icon={`pi pi-bars`}
            onClick={(event) => menu.toggle(event)}
          />
        </FCol>
      )}

      <FCol>
        <FTabMenu model={model} />
      </FCol>
    </FGrid>
  )
}
