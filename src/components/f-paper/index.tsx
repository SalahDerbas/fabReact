import React from "react"

export const FPaper: React.FC<{}> = ({ children, ...rest }) => {
  /*------------------------------|| RENDER ||------------------------------------------------*/
  return (
    <div className="paper" {...rest}>
      {children}
    </div>
  )
}
