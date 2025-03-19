import { useEffect } from "react"

const useDebugMutate = (variable: any, name: string) => {
  useEffect(() => {
    console.log('mutate in: ', name, { variable })
    return () => {
      console.log('mutate out: ', name, { variable })
    }
  }, [variable, name])

}

export { useDebugMutate }