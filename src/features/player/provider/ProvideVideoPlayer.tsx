import { createContext, type FC, type PropsWithChildren, useContext, useEffect, useRef, useState } from "react"
import {
  BackSide,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  VideoTexture,
  WebGLRenderer,
} from "three"
import { VideoPlayerEmbed } from "../components/VideoPlayerEmbed"
import { clamp } from "../helpers/clamp"
import { useJobPlayerSlice, useJobPlayerSliceActions } from "../slice"
import type { TWithVideo } from "../types"
import type { PlayerProviderProps, VideoPlayerContextType } from "./ProvideVideoPlayer.types"

const VideoPlayerContext = createContext<VideoPlayerContextType | null>(null)

export const VideoPlayerProvider: FC<PropsWithChildren<PlayerProviderProps>> = ({ children, config, meta, src }) => {
  const api = usePlayerApiState()
  const value = {
    ...api,
    config,
    meta,
    src,
  }

  return (
    <VideoPlayerContext.Provider value={value}>
      <PlayerInit>{children}</PlayerInit>
    </VideoPlayerContext.Provider>
  )
}

const PlayerInit: FC<PropsWithChildren> = ({ children }) => {
  const { video } = useVideoPlayerContext()

  usePlayerInitRefs()
  usePlayerInitRenderer()
  usePlayerInitCameraControls()

  return (
    <>
      {video && <PlayerReady video={video}>{children}</PlayerReady>}
      <div style={{ display: "none" }}>
        <VideoPlayerEmbed />
      </div>
    </>
  )
}

const PlayerReady: FC<PropsWithChildren<TWithVideo>> = ({ children, video }) => {
  useSetupVideoControls(video)
  useSetupThreeVideoPlayer(video)
  return <>{children}</>
}

export const useVideoPlayerContext = () => {
  const context = useContext(VideoPlayerContext)
  if (!context) {
    throw new Error("useVideoPlayerContext must be used within VideoPlayerProvider")
  }
  return context
}

const usePlayerApiState = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const rendererPlaceholderRef = useRef<HTMLDivElement>(null)

  const [video, setVideo] = useState<VideoPlayerContextType["video"]>(null)
  const [cameraApi, setCamera] = useState<VideoPlayerContextType["cameraApi"]>(null)
  const [rendererPlaceholder, setRendererPlaceholder] = useState<VideoPlayerContextType["rendererPlaceholder"]>(null)
  const [webGlRenderer, setRenderer] = useState<VideoPlayerContextType["webGlRenderer"]>(null)

  return {
    videoRef,
    rendererPlaceholderRef,

    video,
    setVideo,

    rendererPlaceholder,
    setRendererPlaceholder,

    cameraApi,
    setCamera,
    webGlRenderer,
    setRenderer,
  }
}

const usePlayerInitRefs = () => {
  const { videoRef, setVideo, rendererPlaceholderRef, setRendererPlaceholder } = useVideoPlayerContext()

  useEffect(() => {
    setVideo(videoRef.current ?? null)
  }, [setVideo, videoRef?.current])

  useEffect(() => {
    setRendererPlaceholder(rendererPlaceholderRef.current ?? null)
  }, [setRendererPlaceholder, rendererPlaceholderRef?.current])
}

const usePlayerInitRenderer = () => {
  const { webGlRenderer, rendererPlaceholder } = useVideoPlayerContext()

  useEffect(() => {
    if (rendererPlaceholder && webGlRenderer) {
      rendererPlaceholder.appendChild(webGlRenderer.domElement)

      return () => {
        if (rendererPlaceholder) {
          rendererPlaceholder.removeChild(webGlRenderer.domElement)
        }
      }
    }
  }, [rendererPlaceholder, webGlRenderer])
}

const usePlayerInitCameraControls = () => {
  const { cameraApi } = useVideoPlayerContext()
  const { setIsReady } = useJobPlayerSliceActions()
  const { zoom, rotateX, rotateY } = useJobPlayerSlice()

  // init Player
  useEffect(() => {
    setIsReady(Boolean(cameraApi))
  }, [cameraApi, setIsReady])

  // init Player Controls
  useEffect(() => {
    if (cameraApi) {
      cameraApi.fov = zoom
      cameraApi.updateProjectionMatrix()
    }
  }, [cameraApi, zoom])

  useEffect(() => {
    if (cameraApi) {
      cameraApi.rotation.set(rotateX, rotateY, 0)
    }
  }, [cameraApi, rotateX, rotateY])
}

const useSetupThreeVideoPlayer = (video: HTMLVideoElement) => {
  const { setShiftRotateX, setShiftRotateY, setZoom } = useJobPlayerSliceActions()
  const { config, setCamera, setRenderer } = useVideoPlayerContext()

  useEffect(() => {
    // gather video metadata
    const quality = video.getVideoPlaybackQuality()
    const fps = quality.totalVideoFrames / video.duration
    video.requestVideoFrameCallback(frameMetadata => {})

    // create a scene
    const scene = new Scene()

    // create a perspective camera
    // https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
    const width = config.Player.width
    const height = config.Player.height
    const camera = new PerspectiveCamera(75, width / height, 1, 100)
    setCamera(camera)

    // create a renderer
    // https://threejs.org/docs/#api/en/renderers/WebGLRenderer
    const renderer = new WebGLRenderer()
    renderer.setSize(width, height)
    setRenderer(renderer)

    // create a sphere geometry
    // https://threejs.org/docs/#api/en/geometries/SphereGeometry
    const geometry = new SphereGeometry(15, 32, 16)

    // create a VideoTexture
    const texture = new VideoTexture(video)

    // create a material from the texture
    const material = new MeshBasicMaterial({ map: texture })

    // need to use back side - surface of the sphere is facing outside but we put the camera inside of the sphere
    material.side = BackSide

    // create a mesh and add to the scene
    const mesh = new Mesh(geometry, material)
    scene.add(mesh)

    // zoom in / out
    const onWheel = (e: WheelEvent) => {
      const zoomLevel = clamp(camera.fov + e.deltaY / config.Zoom.step, config.Zoom.min, config.Zoom.max)
      // need to call this function after changing most of properties in PerspectiveCamera

      setZoom(zoomLevel)
      e.stopPropagation()
      e.preventDefault()
    }

    // rotate camera
    let mouseDown = false
    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 0) mouseDown = true
      renderer.domElement.style.cursor = 'grabbing'
    }

    const onMouseUp = (e: MouseEvent) => {
      if (e.button === 0) mouseDown = false
      renderer.domElement.style.cursor = 'grab'
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!mouseDown) return

      const { movementX, movementY } = e

      // rotateX: rotate vertically since x-axis is horizontal
      const rotateX = movementY / 100
      const rotateY = movementX / 100

      camera.rotateX(rotateX)
      camera.rotateY(rotateY)

      setShiftRotateX(rotateX)
      setShiftRotateY(rotateY)
    }

    // run renderer
    renderer.setAnimationLoop(() => renderer.render(scene, camera))

    renderer.domElement.addEventListener("wheel", onWheel)
    renderer.domElement.addEventListener("mousedown", onMouseDown)
    renderer.domElement.addEventListener("mouseup", onMouseUp)
    renderer.domElement.addEventListener("mousemove", onMouseMove)

    return () => {
      setRenderer(null)

      renderer.domElement.removeEventListener("wheel", onWheel, false)
      renderer.domElement.removeEventListener("mousedown", onMouseDown, false)
      renderer.domElement.removeEventListener("mouseup", onMouseUp, false)
      renderer.domElement.removeEventListener("mousemove", onMouseMove, false)
    }
  }, [video, setCamera, setRenderer, setZoom, setShiftRotateX, setShiftRotateY, config])
}

const useSetupVideoControls = (video: HTMLVideoElement) => {
  const { setDuration, setCurrentTimeProgress, setIsSeeking, setIsPlaying, setBufferedTime } =
    useJobPlayerSliceActions()

  useEffect(() => {
    const handleTimeUpdate = () => setCurrentTimeProgress(video.currentTime)
    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }
    const handleProgress = () => {
      if (video.buffered.length > 0) {
        setBufferedTime(video.buffered.end(video.buffered.length - 1))
      }
    }

    const handleSeeking = () => {
      setIsSeeking(true)
    }
    const handleSeeked = () => {
      setIsSeeking(false)
    }
    const handlePause = () => {
      setIsPlaying(false)
    }
    const handleStop = () => {
      setIsPlaying(false)
    }
    const handlePlaying = () => {
      setIsPlaying(true)
    }
    const handlePlay = () => {
      setIsPlaying(true)
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("progress", handleProgress)
    video.addEventListener("seeking", handleSeeking)
    video.addEventListener("seeked", handleSeeked)
    video.addEventListener("playing", handlePlaying)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("stop", handleStop)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("progress", handleProgress)
      video.removeEventListener("seeking", handleSeeking)
      video.removeEventListener("seeked", handleSeeked)
      video.removeEventListener("playing", handlePlaying)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("stop", handleStop)
    }
  }, [video, setIsSeeking, setDuration, setBufferedTime, setCurrentTimeProgress, setIsPlaying])
}
