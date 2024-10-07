import { useEffect, useRef } from "react"

export const useIsMount = () => {
  const isMountRef = useRef(true)

  useEffect(() => {
    isMountRef.current = false
  }, [])
  return isMountRef.current
}

// NOTE: Mounting is the process of outputting the virtual representation of a component into the final UI representation.
