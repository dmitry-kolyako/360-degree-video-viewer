import type { FC } from "react"
import { Stack } from "@mui/material"
import { createUid } from "../utils/createUid"

export const Attributes: FC<object> = props => (
  <Stack>
    {Object.entries(props).map(([attr, val]) => (
      <Stack direction={"row"} gap={2} mr={2} key={createUid()}>
        <Stack flex={1}>{attr}</Stack>
        <Stack flexWrap={"nowrap"}>{JSON.stringify(val)}</Stack>
      </Stack>
    ))}
  </Stack>
)
