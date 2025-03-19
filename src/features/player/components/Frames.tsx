import { type FC, useState } from "react"
import { Box, Paper, Stack, Tab, Tabs, Typography } from "@mui/material"
import { useVideoPlayerFrames } from "../hooks"
import { FramesList } from "./FramesList"
import { FramesTimeline } from "./FramesTimeline"
import { formatSeconds } from "../helpers/formatSecondsToVideoTime"
import type { PlayerFrameEntry } from "../api"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export const Frames = () => {
  const { byIds, byIndex } = useVideoPlayerFrames()
  const entries = Object.entries(byIds)

  const [value, setValue] = useState(0)

  const listFrames = entries
    .filter(([, { annotations = [] }]) => Boolean(annotations.length))
    .map<PlayerFrameEntry>(entry => {
      const [filename, frame] = entry
      const timestamp = byIndex.findIndex(filenames => filenames.includes(filename))
      return [
        filename,
        {
          ...(Boolean(timestamp > -1) && { video_time: formatSeconds(timestamp) }),
          ...frame,
        },
      ]
    })

  return (
    <Stack gap={1}>
      <Typography variant={"h4"}>Frames:</Typography>

      <Paper>
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={(...[, newValue]) => {
                setValue(newValue)
              }}
              aria-label="basic tabs example"
            >
              <Tab label="Annotated" />
              <Tab label="Timeline" />
              <Tab label="All" />
            </Tabs>
          </Box>
          <FrameTabPanel value={value} index={0}>
            <FramesList frames={listFrames} />
          </FrameTabPanel>
          <FrameTabPanel value={value} index={1}>
            <FramesTimeline index={byIndex} />
          </FrameTabPanel>
          <FrameTabPanel value={value} index={2}>
            <FramesList frames={entries} />
          </FrameTabPanel>
        </Box>
      </Paper>
    </Stack>
  )
}

const FrameTabPanel: FC<TabPanelProps> = props => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}
