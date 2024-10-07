import React, { useEffect, useState } from "react"
import { TabMenuProps } from "primereact/tabmenu"
import { FSpace, FText } from ".."
import { useWidth } from "src/utils"
import { Menu } from "primereact/menu"
import { Button } from "primereact/button"

interface props extends TabMenuProps {}

export const FTabMenu: React.FC<props> = ({ children, activeIndex, model, style, className, ...rest }) => {
  /*------------------------------|| HOOKS ||------------------------------------------------*/
  const { isMobile } = useWidth()

  const [setModel, setSelectedModel] = useState<any>()
  useEffect(() => {
    let index: any = 0

    if (model && model[0]) {
      index = model[0].items?.findIndex((item: any) => item.className === "active")
      if (index !== -1 && model[0].items) setSelectedModel((model[0].items[index] as any).label)
    }
  }, [model])

  const onModelChange = (e: { value: any }) => {
    setSelectedModel(e.value.label)
    e.value.command()
  }
  let menu: any

  const selectModel =
    model && model[0]
      ? model[0].items?.map((item: any) => ({
          ...item,
          command: () => {
            item.command()
            onModelChange({ value: item })
          },
        }))
      : []

  /*------------------------------|| RENDER ||------------------------------------------------*/
  return (
    <>
      {!isMobile && (
        <FSpace>
          {model?.map((el) =>
            el?.items?.map((e: any) => (
              <div key={e.label} onClick={e.command} className={`tab-menu-link ${e.className === "active" && "bg-white"}`}>
                {e.className === "active" && <span className="menu-right" />}
                <p>{e.label}</p>
                {e.className === "active" && <span className="menu-left" />}
              </div>
            ))
          )}
        </FSpace>
      )}

      {isMobile && model?.length !== 0 && (
        <>
          <FSpace align="center" gap={0}>
            <FText fs={2}>{setModel}</FText>
            <Menu model={selectModel} popup={true} ref={(el) => (menu = el)} />
            <Button onClick={(event) => menu.toggle(event)} icon="pi pi-angle-down" className="p-button-rounded p-button-text" />
          </FSpace>
        </>
      )}
    </>
  )
}
