import { classNames } from "primereact/utils"
import React from "react"

export interface ColProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  fixed?: boolean
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}

export const FCol: React.FC<ColProps> = ({ children, span, sm, md, lg, xl, fixed = false, className, ...rest }) => {
  /*------------------------------|| STYLES ||------------------------------------------------*/
  var spanClass: string
  var smClass = sm ? `sm:col-${sm}` : ""
  var mdClass = md ? `md:col-${md}` : ""
  var lgClass = lg ? `lg:col-${lg}` : ""
  var xlClass = xl ? `xl:col-${xl}` : ""

  if (span) {
    spanClass = `col-${span}`
  } else {
    spanClass = `col`
  }
  if (fixed) {
    spanClass = "col-fixed"
  }

  let classes = classNames([smClass, spanClass, mdClass, lgClass, xlClass, className])

  /*------------------------------|| RENDER ||------------------------------------------------*/
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
