import { jobsApiSlice } from "./jobsApiSlice"
import { type PlayerGetJobQueryFramesResult } from "./jobsApiSlice.dto"
import { createSelector } from "@reduxjs/toolkit"

const initialState = {
  frames: {
    byIds: {},
    byIndex: [],
  } as PlayerGetJobQueryFramesResult,
  meta: null,
  src: "",
}

export const selectJobResult = createSelector(
  [state => state, (_, params) => params],
  (state, params) => jobsApiSlice.endpoints.getJob.select(params)(state)?.data ?? initialState,
)
