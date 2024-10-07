import { ToastMessage } from "primereact/toast"
import { toast } from "src"
import { Error_Res } from "src/core/interface/error_Res"

interface props extends ToastMessage {
  err?: Error_Res
}

export const Notification = ({ severity = "error", summary = `Unknown error happend`, detail, life = 4000, err }: props) => {
  toast.current?.show({ severity, summary, life, detail: detail ?? err?.error })
}
