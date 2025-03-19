import { useEffect } from "react"

const useDebugLifecycle = (name: string) => {
  useEffect(() => {
    console.log("create: ", name)
    return () => {
      console.log("destroy: ", name)
    }
  }, [name])
}

export {
  useDebugLifecycle
}