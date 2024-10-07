import { useEffect, useState } from "react"
import { ReturnType } from "src/core/interface/returnType"

export const useWidth = (): ReturnType => {
  const [state, setState] = useState<ReturnType>({
    innerWidth: 0,
    outerWidth: 0,
    isMobile: false,
    isSmallMobile: false,
  })

  const calc = () => {
    setState({
      innerWidth: window.innerWidth ?? 0,
      outerWidth: window.outerWidth ?? 0,
      isMobile: (window.outerWidth ?? 0) < 992,
      isSmallMobile: (window.outerWidth ?? 0) < 600,
    })
  }

  useEffect(() => {
    if (state.innerWidth === 0) {
      calc()
    }
    window.addEventListener("resize", calc)
    return () => window.removeEventListener("resize", calc)
  }, [])

  return state
}
