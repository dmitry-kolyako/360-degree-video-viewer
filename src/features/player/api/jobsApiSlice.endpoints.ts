const JOBS_BASE_URL = import.meta.env.DEV ? "/static/jobs" : "https://sporta-klubi.lv/video-360/jobs"

export const JobsApiEndpoints = {
  base: JOBS_BASE_URL,
  prefix: function (full = false) {
    return full ? this.base : ""
  },
  metadata: (jobId: number) => `/${jobId}/json/metadata.json`,
  video: function (jobId: number, full = false) {
    return this.prefix(full) + `/${jobId}/stitched/video.mp4`
  },
  preview: function (jobId: number, filename: string, full = false) {
    return this.prefix(full) + `/${jobId}/frames/${filename}`
  },
}
