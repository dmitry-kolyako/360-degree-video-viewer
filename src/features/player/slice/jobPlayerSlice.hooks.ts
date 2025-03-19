import { useMemo } from "react"
import { bindActionCreators } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { jobPlayerSliceComputed, jobPlayerSliceSelector } from "./jobPlayerSlice.selectors"
import { jobPlayerSliceActionMap } from "./jobPlayerSlice.actions"

export const useJobPlayerSlice = () => useAppSelector(jobPlayerSliceSelector)

export const useJobPlayerComputed = () => useAppSelector(jobPlayerSliceComputed)

export const useJobPlayerSliceActions = () => {
  const appDispatch = useAppDispatch()

  return useMemo(() => bindActionCreators(
    jobPlayerSliceActionMap,
    appDispatch,
  ), [appDispatch])
}
