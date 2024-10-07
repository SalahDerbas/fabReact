import React, { useMemo } from "react"

type ColorType = "primary" | "secondary" | "third" | "gray" | "lightGray" | "white" | "dark" | "danger"

interface props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  fw?: "light" | "normal" | "bold"
  fs?: 1 | 2 | 3 | 4 | 5
  color?: ColorType
  disable?: boolean
  style?: React.CSSProperties
}

export const FText: React.FC<props> = ({ children, fw = "normal", fs = 4, color = "dark", style, disable, ...rest }) => {
  /*------------------------------|| HOOKS ||------------------------------------------------*/
  var fontSize = useMemo(() => {
    switch (fs) {
      case 1:
        return "text-3xl"

      case 2:
        return "text-xl"

      case 3:
        return "text-base"

      case 4:
        return "text-sm"

      case 5:
        return "text-xs"

      default:
        return "text-base"
    }
  }, [fs])

  var fontWeight: any = useMemo(() => {
    switch (fw) {
      case "bold":
        return "font-bold"

      case "light":
        return "font-light"

      default:
        return "font-normal"
    }
  }, [fw])

  var fontColor: string = useMemo(() => {
    return `f-text-${color}`
  }, [color])

  /*------------------------------|| STYLES ||------------------------------------------------*/
  // const default_style: React.CSSProperties = {
  //   // fontSize,
  //   // fontWeight,
  //   // color: disable ? lightgray : fontColor,
  //   textAlign: "left",
  //   letterSpacing: "0px",
  //   // cursor: disable ? "not-allowed" : "unset",
  //   opacity: 1,
  // }

  /*------------------------------|| RENDER ||------------------------------------------------*/
  return (
    <span className={`f-text ${fontColor} ${fontSize} ${fontWeight}`} style={{ ...style }} {...rest}>
      {children}
    </span>
  )
}
