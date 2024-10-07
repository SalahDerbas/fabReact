import { FC } from "react"
import { Dialog, DialogProps } from "primereact/dialog"

export interface FDialogProps extends DialogProps {}

export const FDialog: FC<FDialogProps> = ({ children, style, ...rest }) => {
  /*------------------------------|| RENDER ||------------------------------------------------*/
  return (
    <Dialog style={style} {...rest}>
      {children}
    </Dialog>
  )
}
