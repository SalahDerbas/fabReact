export const navbarItems = (history: any) => {
  let path: string = history.location.pathname ?? ""

  if (path.includes("operations")) {
    return OperationsItems(history)
  }
  if (path.includes("imports")) {
    return ImportsItems(history)
  }
  if (path.includes("definitions")) {
    return DefinitionsItems(history)
  }
  if (path.includes("setting")) {
    return SettingGeneral(history)
  }

  return []
}

export const OperationsItems = (history: any) => {
  let path: string = history.location.pathname ?? ""

  return [
    {
      items: [
        // {
        // key: "batch-parameter",
        // label: "Batch Parameter",
        // icon: "pi pi-home",
        // className: `${path.includes("batch-parameters") ? "active" : ""}`,
        // command: () => {
        //   history.push("/operations/batch-parameters")
        // },
        // },
        {
          key: "production-targets",
          label: "Production Target",
          className: `${path.includes("production-targets") || path.includes("batch-parameter") ? "active" : ""}`,
          command: () => {
            history.push("/operations/production-targets")
          },
        },
        // {
        //   key: "execution",
        //   label: "Execution",
        //   className: `${path.includes("execution") ? "active" : ""}`,
        //   command: () => {
        //     history.push("/operations/execution")
        //   },
        // },
      ],
    },
  ]
}
export const DefinitionsItems = (history: any) => {
  let path: string = history.location.pathname ?? ""

  return [
    {
      items: [
        {
          key: "mix-design",
          label: "Mix Design",
          // icon: "pi pi-home",
          className: `${path.includes("mix-design") ? "active" : ""}`,
          command: () => {
            history.push("/definitions/mix-design")
          },
        },
        {
          key: "block-type",
          label: "Block Type",
          // icon: "pi pi-home",
          className: `${path.includes("block-type") ? "active" : ""}`,
          command: () => {
            history.push("/definitions/block-type")
          },
        },
        {
          key: "materials",
          label: "Materials",
          // icon: "pi pi-home",
          className: `${path.includes("materials") ? "active" : ""}`,
          command: () => {
            history.push("/definitions/materials")
          },
        },

        {
          key: "suppliers",
          label: "Suppliers",
          // icon: "pi pi-home",
          className: `${path.includes("suppliers") ? "active" : ""}`,
          command: () => {
            history.push("/definitions/suppliers")
          },
        },
      ],
    },
  ]
}

export const ImportsItems = (history: any) => {
  let path: string = history.location.pathname ?? ""

  return [
    {
      items: [
        {
          key: "stillage",
          label: "Stillage",
          className: `${path === "/imports/stillage" ? "active" : ""}`,
          command: () => {
            history.push("/imports/stillage")
          },
        },
        {
          key: "ahu",
          label: "Ahu",
          // icon: "pi pi-home",
          className: `${path === "/imports/ahu" ? "active" : ""}`,
          command: () => {
            history.push("/imports/ahu")
          },
        },
      ],
    },
  ]
}

export const SettingGeneral = (history: any) => {
  let path: string = history.location.pathname ?? ""

  return [
    {
      items: [
        {
          key: "setting",
          label: "Setting",
          className: `${path.includes("setting") ? "active" : ""}`,
          command: () => {
            history.push("/setting")
          },
        },
      ],
    },
  ]
}
