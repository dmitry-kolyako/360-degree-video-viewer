import { Grid2, Stack, Typography } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Player } from "../features/player/Player"

export const App = () => {
  return (
    <Grid2
      container
      flex={1}
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "100vh",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack gap={4} alignItems="center" flex={1} direction="column" mt={4} mb={4}>
          <Typography variant={"h3"}>Player 360°</Typography>
          <Player job_id={63025} />
        </Stack>
      </LocalizationProvider>
    </Grid2>
  )
}
