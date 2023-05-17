import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { inject, observer } from "mobx-react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { authStoreInterface } from "../../store/authStore";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import io from "socket.io-client";
import TemporaryDrawer from "./Menu";

interface INavbar {
  authStore?: authStoreInterface;
}

const NavBar = (props: any) => {
  const { authStore } = props as INavbar;

  const socket = io("http://localhost:3009");

  const history = useNavigate();

  // const redirectHome = () => {
  //   history("/dashboard");
  // };

  const redirect = (data: string) => () => {
    socket.emit("send_message", { message: "Hello" });
    history(data);
  };

  const logout = async () => {
    await authStore?.logout();
    history("/");
  };

  return (
    <Box>
      <AppBar>
        <Toolbar sx={{ backgroundColor: "#000" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <TemporaryDrawer />
            {/* <Button color="inherit" onClick={redirectHome}>
              <HomeIcon /> &nbsp; Home
            </Button> */}
          </Typography>
          <Button title="Message" onClick={redirect("/message")}>
            <Badge
              badgeContent={3}
              color="error"
              style={{ margin: "0 1rem", cursor: "pointer" }}
            >
              <EmailIcon style={{ color: "#fff" }} />
            </Badge>
          </Button>
          <Button title="Notification(s)" onClick={redirect("/notification")}>
            <Badge
              badgeContent={3}
              color="error"
              style={{ margin: "0 1rem", cursor: "pointer" }}
            >
              <NotificationsIcon style={{ color: "#fff" }} />
            </Badge>
          </Button>
          <Button title="Communiqué" onClick={redirect("/communique")}>
            <Badge
              badgeContent={0}
              color="error"
              style={{ margin: "0 1rem", cursor: "pointer" }}
            >
              <ContentPasteIcon style={{ color: "#fff" }} />
            </Badge>
          </Button>

          <Button color="inherit" onClick={logout}>
            <LogoutIcon /> &nbsp; Déconnexion
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default inject("authStore")(observer(NavBar));
