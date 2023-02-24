import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const history = useNavigate();

  const redirectHome = () => {
    history("/");
  };

  return (
    <Box>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" onClick={redirectHome}>
              <HomeIcon /> &nbsp; Home
            </Button>
          </Typography>
          <Button color="inherit">
            {" "}
            <LogoutIcon /> &nbsp; Déconnexion
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
