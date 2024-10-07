import React, { useMemo } from "react"

interface props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  justify?: "center" | "around" | "between" | "end" | "start"
  align?: "center" | "baseline" | "end" | "start" | "stretch" | "space-between"
  gap?: number | [number, number] //row, col
  direction?: "column" | "row"
  shadow?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  alignContent?:
    | "normal"
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "stretch"
    | "start"
    | "end"
    | "baseline"
}

export const FGrid: React.FC<props> = ({
  children,
  justify = "start",
  align = "start",
  alignContent = "start",
  gap = 0,
  direction = "row",
  shadow = 0,
  style,
  className,
  ...rest
}) => {
  /*------------------------------|| HOOKS ||------------------------------------------------*/
  let gapStyle = useMemo(() => {
    switch (typeof gap) {
      case "number":
        return `${gap}rem`
      case "object":
        return `${gap[0]}rem ${gap[1]}rem`
      default:
        return `${gap}rem`
    }
  }, [gap])

  let shadowClassName = useMemo(() => `shadow-${shadow}`, [shadow])

  var directionClassName = useMemo(() => (direction ? `flex-${direction}` : ``), [direction])

  /*------------------------------|| STYLES ||------------------------------------------------*/
  const styles: React.CSSProperties = {
    gap: gapStyle,
    margin: 0,
    ...style,
  }
  /*------------------------------|| RENDER ||------------------------------------------------*/

  return (
    <div
      className={` grid justify-content-${justify} align-items-${align} align-items-${alignContent} ${directionClassName} ${shadowClassName} ${className} `}
      style={styles}
      {...rest}
    >
      {children}
    </div>
  )
}
