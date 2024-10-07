import React, { ReactElement, useMemo } from "react"
import RequestStatus from "src/constants/enums/request-status"
import { ProgressSpinner } from "primereact/progressspinner"
import { FGrid } from ".."

interface props {
  status: RequestStatus
  type?: "spinner" | "skeleton"
  customStanding?: ReactElement
  fullScreen?: boolean
}

export const FLoadingData: React.FC<props> = ({ children, fullScreen, status, type, customStanding = <></> }) => {
  /*------------------------------|| HOOKS ||------------------------------------------------*/
  const loadingStyle = useMemo(() => <Spin fullScreen={fullScreen} />, [type])

  switch (status) {
    case "no-thing":
      return customStanding

    case "loading":
      return loadingStyle

    case "error":
      return <>{children}</>

    case "data":
      return <>{children}</>

    default:
      return <>INIT</>
  }
}
/*------------------------------|| RENDER ||------------------------------------------------*/
//spinner component
const Spin: React.FC<{ fullScreen?: boolean }> = ({ fullScreen }) => {
  return (
    <FGrid className={`${fullScreen ? "h-screen" : "h-30rem"}`} justify="center" align="center">
      <ProgressSpinner />
    </FGrid>
  )
}
