import { Paper, Stack, styled, Table, TableBody, TableCell as TableCellBase, TableRow, Typography } from "@mui/material"
import { IconResetCamera } from "./IconResetCamera"
import { SliderRotateHorizontal } from "./SliderRotateHorizontal"
import { BoxHigh } from "../../../components/BoxHigh"
import { SliderZoom } from "./SliderZoom"
import { VideoContainer } from "./VideoContainer"
import { SliderRotateVertical } from "./SliderRotateVertical"
import { VideoControls } from "./VideoControls"

export const VideoPlayer = () => {
  return (
    <Stack gap={1}>
      <Typography variant={"h4"}>Player:</Typography>

      <Paper>
        <Table sx={{ mt: 2 }} cellPadding={0} cellSpacing={0} padding={"none"} size={"small"} border={0}>
          <TableBody>
            <TableRow>
              <TableCell>
                <IconResetCamera />
              </TableCell>
              <TableCell>
                <SliderRotateHorizontal />
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <BoxHigh>
                  <SliderZoom />
                </BoxHigh>
              </TableCell>
              <TableCell>
                <VideoContainer />
              </TableCell>
              <TableCell>
                <BoxHigh>
                  <SliderRotateVertical />
                </BoxHigh>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <VideoControls />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Stack>
  )
}

const TableCell = styled(TableCellBase)`
  position: relative;
  min-width: 32px;
  border: 0;
  padding: 8px 4px;
`
