import dayjs from "dayjs"
import { createSelector } from "@reduxjs/toolkit"
import { jobPlayerSlice } from "./jobPlayerSlice"

export const jobPlayerSliceSelector = jobPlayerSlice.selectSlice

export const jobPlayerSliceComputed = createSelector(jobPlayerSliceSelector, slice => {
  const { currentTimeProgress, isReady, day } = slice

  const time = dayjs(day).add(currentTimeProgress, "seconds")
  const timeSeconds = Math.round(currentTimeProgress)
  const isDisabled = !isReady

  return {
    slice,
    computed: {
      time,
      timeSeconds,
      isReady,
      isDisabled,
    },
  }
})
