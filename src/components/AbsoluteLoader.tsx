import { Box, CircularProgress } from "@mui/material"

export const AbsoluteLoader = () => (
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    }}
  >
    <CircularProgress />
  </Box>
)
