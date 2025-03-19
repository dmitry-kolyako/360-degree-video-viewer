import { type FC, useCallback } from "react"
import { Slider } from "@mui/material"
import { useJobPlayerComputed, useJobPlayerSliceActions } from "../slice"
import { type TSliderChange } from "../types"
import { radToDegLabel } from "../helpers/radToDegree"
import { SliderRotateThumb } from "./SliderRotateThumb"

const marks = [
  {
    value: Math.PI * -1,
    label: "",
  },
  {
    value: Math.PI,
    label: "",
  },
]

export const SliderRotateHorizontal = () => {
  const {
    slice: { rotateY },
    computed: { isDisabled },
  } = useJobPlayerComputed()
  const { setRotateY } = useJobPlayerSliceActions()

  const handleRotateY = useCallback<TSliderChange>(
    (...[, value]) => {
      setRotateY(Number(value))
    },
    [setRotateY],
  )

  return <Render {...{ rotateY, handleRotateY, isDisabled }} />
}

type Props = {
  rotateY: number
  isDisabled: boolean
  handleRotateY: TSliderChange
}
const Render: FC<Props> = ({ rotateY, handleRotateY, isDisabled }) => {
  return (
    <Slider
      marks={marks}
      min={Math.PI * -1}
      max={Math.PI}
      track={false}
      step={0.001}
      aria-label="Rotate Horizonally"
      orientation="horizontal"
      value={rotateY}
      valueLabelDisplay="on"
      valueLabelFormat={radToDegLabel}
      onChange={handleRotateY}
      disabled={isDisabled}
      slots={{
        thumb: props => <SliderRotateThumb {...props} transform={"rotate(90deg)"} title={"Rotate Horizontal Angle"} />,
      }}
    />
  )
}
