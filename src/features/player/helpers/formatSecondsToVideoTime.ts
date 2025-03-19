import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"

dayjs.extend(duration)

export const formatSeconds = (seconds: number): string => {
  const duration = dayjs.duration(seconds, "seconds")
  return duration.format("mm:ss")
}