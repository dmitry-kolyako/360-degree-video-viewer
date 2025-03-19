import { useAppSelector } from "../../../redux/hooks"
import { useGetJobQuery } from "./jobsApiSlice"
import { selectJobResult } from "./jobsApiSlice.selectors"

export const useJobApiData = (job: number) => {
  const { isFetching } = useGetJobQuery(job)
  const data = useJobData(job)

  return {
    isFetching,
    data,
  }
}

export const useJobData = (job: number) => useAppSelector(state => selectJobResult(state, job))
