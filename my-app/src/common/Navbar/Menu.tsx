import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { UserStoreInterface } from "../../store/userStore";
import useStyles from "./style";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BarChartIcon from "@mui/icons-material/BarChart";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

// type Anchor = "top" | "left" | "bottom" | "right";
type Anchor = "left";

interface IMenu {
  userStore: UserStoreInterface;
}

export const column = [
  {
    id: 0,
    path: "/dashboard",
    component: "Tableau de bord",
    icon: <DashboardIcon />,
    permission: ["ADMIN", "PROF", "ETUDIANT"],
  },
  {
    id: 1,
    path: "/users",
    component: "Utilisateurs",
    icon: <SupervisedUserCircleIcon />,
    permission: ["ADMIN"],
  },
  {
    id: 2,
    path: "/profil",
    component: "Mon profil",
    icon: <AccountBoxIcon />,
    permission: ["ADMIN", "PROF", "ETUDIANT"],
  },
  {
    id: 3,
    path: "/parametre",
    component: "Paramètres",
    icon: <SettingsIcon />,
    permission: ["ADMIN"],
  },
  {
    id: 4,
    path: "/documents",
    component: "Mes documents",
    icon: <FolderOpenIcon />,
    permission: ["ADMIN", "PROF", "ETUDIANT"],
  },
  {
    id: 5,
    path: "/statistique",
    component: "Statistique",
    icon: <BarChartIcon />,
    permission: ["ADMIN"],
  },
  {
    id: 6,
    path: "/a_propos",
    component: "A propos",
    icon: <InfoIcon />,
    permission: ["ADMIN", "PROF", "ETUDIANT"],
  },
];

const TemporaryDrawer = (props: any) => {
  const { userStore } = props as IMenu;
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const classes = useStyles();

  const history = useNavigate();

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const redirect =
    (anchor: Anchor, open: boolean, path: string) =>
    async (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
      setTimeout(() => {
        history(path);
      }, 400);
    };

  return (
    <div>
      {/* {(["left", "right", "top", "bottom"] as const).map((anchor) => ( */}
      <React.Fragment key={"left"}>
        <Button color="inherit" onClick={toggleDrawer("left", true)}>
          <HomeIcon /> &nbsp; MENU
        </Button>
        <Drawer
          anchor={"left"}
          open={state.left}
          onClose={toggleDrawer("left", false)}
          // style={{ background: "#eddede" }}
        >
          <h3 style={{ color: "#77b3d4" }}>
            &nbsp; &nbsp; &nbsp; <u>Etablissement scolaire</u>
          </h3>
          {column.map((item: any) => (
            <>
              <ListItem
                key={item.id}
                disablePadding
                onClick={redirect("left", false, item.path)}
                className={classes.menuList}
                style={{
                  width: 300,
                  display: item.permission.includes(userStore.user.role)
                    ? "block"
                    : "none",
                }}
              >
                <ListItemButton>
                  <p>
                    &nbsp; &nbsp;
                    {item.icon} &nbsp; &nbsp; &nbsp; {item.component}
                  </p>
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          ))}
        </Drawer>
      </React.Fragment>
      {/* ))} */}
    </div>
  );
};

export default inject("userStore")(observer(TemporaryDrawer));
