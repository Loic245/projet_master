import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
