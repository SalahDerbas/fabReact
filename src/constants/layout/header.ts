export const mainLabels = (history: any) => {
  let path: string = history.location.pathname ?? ""

  return [
    {
      label: "Dashboard ",
      icon: "pi pi-home",
      className: `${path === "/" ? "active" : ""}`,
      command: () => {
        history.push("/")
      },
    },
    {
      label: "Operations ",
      icon: "pi pi-folder",
      className: `${path.includes("/operations") ? "active" : ""}`,
      command: () => {
        history.push("/operations/production-targets")
      },
    },
  ]
}

export const getSettingLabels = (history: any) => {
  let path: string = history.location.pathname ?? ""

  return [
    {
      label: "Imports",
      icon: "pi pi-file",
      className: `${path.includes("imports") ? "active" : ""}`,
      command: () => {
        history.push("/imports/stillage")
      },
    },

    {
      label: "Definitions",
      icon: "pi pi-file",
      className: `${path.includes("definitions") ? "active" : ""}`,
      command: () => {
        history.push("/definitions/suppliers")
      },
    },
    {
      label: "Settings",
      icon: "pi pi-cog",
      className: `${path?.includes("/setting") ? "active" : ""}`,
      command: () => {
        history.push("/setting")
      },
    },
  ]
}
export const allLabels = (history: any) => mainLabels(history).concat(getSettingLabels(history))
