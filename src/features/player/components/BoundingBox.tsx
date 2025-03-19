import { styled, Tooltip } from "@mui/material"
import type { FC } from "react"
import type { AnnotationBoundingBox, PlayerFrameAnnotation } from "../api"

const BoundingBoxFrame = styled("div")`
  position: absolute;
  border: 2px solid red;
  pointer-events: none;
`

type Props = {
  box: AnnotationBoundingBox
  annotation: PlayerFrameAnnotation
}

const Label = styled("div")`
  position: absolute;
    left: 0;
    top: 0;
    margin-top: ${ ({ theme: { spacing }}) => spacing(-3) };
`

export const BoundingBox: FC<Props> = ({ box: scaledCoords, annotation: { category_name } }) => {
  return (
    <BoundingBoxFrame
      key={scaledCoords.join(",")}
      sx={{
        left: scaledCoords[0],
        top: scaledCoords[1],
        width: scaledCoords[2] - scaledCoords[0],
        height: scaledCoords[3] - scaledCoords[1],
      }}
    >
      <Tooltip title={category_name} placement={"top"}>
        <Label>{category_name}</Label>
      </Tooltip>
    </BoundingBoxFrame>
  )
}
