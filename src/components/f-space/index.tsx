import { FC, useMemo } from "react"

interface props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  direction?: "horizontal" | "vertical"
  gap?: number //row, col
  align?: "center" | "baseline" | "end" | "start" | "stretch" | "space-between"
}

export const FSpace: FC<props> = ({
  children,
  align = "start",
  gap = 10,
  direction = "horizontal",
  style,
  className,
  ...rest
}) => {
  /*------------------------------|| HOOKS ||------------------------------------------------*/

  let directionClassName = useMemo(() => {
    switch (direction) {
      case "vertical":
        return `flex flex-column`
      case "horizontal":
        return "flex"
      default:
        return "flex"
    }
  }, [direction])

  /*------------------------------|| RENDER ||------------------------------------------------*/
  return (
    <div className={`${directionClassName} align-items-${align} ${className}`} style={{ gap: `${gap}px`, ...style }} {...rest}>
      {children}
    </div>
  )
}
