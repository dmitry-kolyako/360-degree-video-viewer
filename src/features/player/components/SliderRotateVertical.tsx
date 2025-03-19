import { Slider, type SliderProps } from "@mui/material"
import { useJobPlayerComputed, useJobPlayerSliceActions } from "../slice"
import { radToDegLabel } from "../helpers/radToDegree"
import { degToRad } from "../helpers/degToRad"
import { SliderRotateThumb } from "./SliderRotateThumb"

const step = degToRad(1)

export const SliderRotateVertical = () => {
  const {
    slice: { rotateX },
    computed: { isDisabled }
  } = useJobPlayerComputed()
  const { setRotateX } = useJobPlayerSliceActions()
  const handleRotateX: SliderProps["onChange"] = (...[, value]) => {
    setRotateX(Number(value))
  }


  return (
    <Slider
      min={Math.PI * -1}
      max={Math.PI}
      track={false}
      step={step}
      aria-label="Rotate X"
      value={rotateX}
      onChange={handleRotateX}
      valueLabelDisplay="on"
      orientation={"vertical"}
      disabled={isDisabled}
      valueLabelFormat={radToDegLabel}

      slots={{
        thumb: props => <SliderRotateThumb {...props}
                                           title={"Rotate Vertical Angle"} />,
      }}
    />
  )
}
