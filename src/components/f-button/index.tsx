import React, { useMemo } from "react"
import { Button, ButtonProps } from "primereact/button"

interface props extends ButtonProps {
  bg?: "primary" | "secondary" | "info" | "success" | "warning" | "danger" | "text" | "link"
  shape?: "normal" | "rounded"
  raised?: boolean
  aditionalClass?: string
}

export const FButton: React.FC<props> = ({ bg = "primary", shape = "normal", raised = false, aditionalClass, icon, children, ...rest }) => {
  /*------------------------------|| HOOKS ||------------------------------------------------*/
  shape = useMemo(() => {
    switch (shape) {
      case "rounded":
        return "rounded"

      default:
        return "normal"
    }
  }, [shape])
  /*------------------------------|| STYLES ||------------------------------------------------*/
  const raisedClassName = raised && bg !== "text" && bg !== "link" ? "p-button-raised" : ""

  const linkClassName = bg === "link" ? "p-p-0" : ""

  const className = `p-button-${bg} ${raisedClassName} ${linkClassName} p-button-${shape} text-center ${
    typeof children === "string" ? "" : "p-not-string" 
  } ${aditionalClass ? aditionalClass : ""}
  `

  /*-----------------------------|| Render ||------------------------------------------------*/
  return (
    <Button icon={icon} className={className} type="button" {...(rest as any)}>
      {children}
    </Button>
  )
}
