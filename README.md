# Player 360°

Uses [Vite](https://vitejs.dev/), [Vitest](https://vitest.dev/),
and [React Testing Library](https://github.com/testing-library/react-testing-library)


## Table of Contents
- [Goals](#goals)
- [Setup](#setup)
- [Run](#run)
- [Scripts](#scripts)
- [Usage](#usage)
  - [Frames Section](#frames-section)
    - [Annotated Tab](#annotated-tab)
    - [Timeline Tab](#timeline-tab)
    - [All Tab](#all-tab)
  - [Player Section](#player-section)
  - [Active Frames Section](#active-frames-section)
- [References](#references)

## Goals

- Display Video in Player 360
- Show annotations

## Setup

- `npm install` to deploy dependencies
- prepare  `static` directories for local content (dev mode):
- `static/jobs`
- `static/jobs/[job-id]` in sample files received `job-id` is [63025](static/jobs/63025)
- `static/jobs/[job-id]/json` should contain [metadata.json](static/jobs/63025/json/metadata.json) file, as
- `static/jobs/[job-id]/frames` should contain snapshot files list named accordingly as mentioned
  in [metadata.json](static/jobs/63025/json/metadata.json)
- `static/jobs/[job-id]/stitched` should contain [video.mp4](static/jobs/63025/stitched/video.mp4) prepared to be used
  in Player 360

So it should became like:

- `static/jobs/[job-id]/json/metadata.json`
- `static/jobs/[job-id]/frames/[files**]`
- `static/jobs/[job-id]/stitched/video.mp4`

## Run

After Setup is finished, you can either start the app in dev mode

- `npm run dev`

Or prepare dist bundle and preview prod mode

- `npm run build` - build for production
- `npm run preview` - locally preview production build

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build

## Usage

### `Frames` Section

#### `Annotated` Tab

- filtered records from Metadata JSON referred to frames with annotations
- click on timestamp to navigate to the specific video frame
- click on image preview icon to open 360 image related

#### `Timeline` Tab

- each second can be used to navigate to the specific frame
- click on image preview icon to open 360 image related
- click on timestamp to navigate to the specific video frame

#### `All` Tab

- all Metadata JSON files are displayed
- click on timestamp to navigate to the specific video frame
- click on image preview icon to open 360 image related
- icons with badges are displaying how many annotations and bounded boxes marks available for the time frame

### `Player` section

Camera controls:

- drag-n-drop player
- top slider: rotate camera axis X
- right slider: rotate camera axis Y
- left slider: change zoom aspect ratio
- left top corner icon: reset camera settings to the default value

Video playback control panel:

- Play/Pause button: plays or pauses video
- Stop Button: stops video and resets to start
- Reset Button: stops video, resets to start and resets camera

Video time control panel:

- Slider timeline: select and scroll through video timeline
- Prev Icon: pauses video and takes one second back
- Next Icon: pauses video and takes one second forward
- Current Time: displays current time and can be used as direct time stamp input

### `Active Frames` section

- Displays detailed info on active frames of that timestamp

## References

- [Create React App](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)
- [Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [Vitest](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)
