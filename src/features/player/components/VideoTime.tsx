import { type FC, memo, useEffect, useState } from "react"
import dayjs, { type Dayjs } from "dayjs"
import { IconButton, Stack, Tooltip } from "@mui/material"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import { TimeField } from "@mui/x-date-pickers"
import { useJobPlayerComputed } from "../slice"
import { useVideoPlayerApiActions } from "../hooks"

export const VideoTime = () => {
  const {
    slice: { day },
    computed: { time },
  } = useJobPlayerComputed()

  const { handleSeekPrev, handleSeekNext, handleSeekExact } = useVideoPlayerApiActions()

  return (
    <Stack direction={"row"} alignItems={"center"} gap={1}>
      <Tooltip title={"One Second Back"} placement={"top"}>
        <IconButton onClick={handleSeekPrev}>
          <KeyboardArrowLeftIcon />
        </IconButton>
      </Tooltip>
      <InputVideoTime time={time} day={day} onChange={handleSeekExact} />
      <Tooltip title={"One Second Forward"} placement={"top"}>
        <IconButton onClick={handleSeekNext}>
          <KeyboardArrowRightIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  )
}

type Props = {
  onChange: (newValue: number) => void
  time: Dayjs
  day: string
}

const InputVideoTime: FC<Props> = memo(({ time, onChange, day }) => {
  const [lock, setLock] = useState(false)
  const [value, setValue] = useState<Dayjs | null>(time)

  useEffect(() => {
    if (!lock) {
      setValue(time)
    }
  }, [time, lock])

  const handleBlur = () => {
    setLock(false)
    if (value) {
      onChange(value.unix() - dayjs(day).unix())
    }
  }

  return (
    <TimeField
      size="small"
      sx={{ minWidth: 70, padding: 0 }}
      label={null}
      format={"mm:ss"}
      onFocus={() => setLock(true)}
      onBlur={handleBlur}
      value={lock ? value : time}
      onChange={newValue => setValue(newValue)}
    />
  )
})
