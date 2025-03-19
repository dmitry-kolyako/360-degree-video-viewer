import type { FC, PropsWithChildren } from "react"
import { SliderThumb, Tooltip } from "@mui/material"
import HeightIcon from "@mui/icons-material/Height"

type ThumbProps = React.ComponentProps<typeof SliderThumb> &
  PropsWithChildren<{
    title: string
    transform?: "rotate(90deg)" | "rotate(0deg)"
  }>

export const SliderRotateThumb: FC<ThumbProps> = props => {
  const { children, transform = "rotate(0deg)", title, ...other } = props
  return (
    <SliderThumb {...other}>
      {children}

      <Tooltip title={title} placement={"bottom"}>
        <HeightIcon
          sx={{
            width: "75%",
            color: "white",
            transform,
          }}
        />
      </Tooltip>
    </SliderThumb>
  )
}
