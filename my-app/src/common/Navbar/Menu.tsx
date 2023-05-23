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

// type Anchor = "top" | "left" | "bottom" | "right";
type Anchor = "left";

interface IMenu {
  userStore: UserStoreInterface;
}

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

  const column = [
    {
      id: 0,
      path: "/dashboard",
      component: "Tableau de bord",
      permission: ["ADMIN", "PROF", "ETUDIANT"],
    },
    {
      id: 1,
      path: "/users",
      component: "Utilisateurs",
      permission: ["ADMIN"],
    },
    {
      id: 2,
      path: "/profil",
      component: "Mon profil",
      permission: ["ADMIN", "PROF", "ETUDIANT"],
    },
    {
      id: 3,
      path: "/parametre",
      component: "Paramètres",
      permission: ["ADMIN"],
    },
    {
      id: 4,
      path: "/documents",
      component: "Mes documents",
      permission: ["ADMIN", "PROF", "ETUDIANT"],
    },
    {
      id: 5,
      path: "/statistique",
      component: "Statistique",
      permission: ["ADMIN"],
    },
    {
      id: 6,
      path: "/a_propos",
      component: "A propos",
      permission: ["ADMIN", "PROF", "ETUDIANT"],
    },
  ];

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
          <h3>
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
                  <p>&nbsp; &nbsp; &nbsp; {item.component}</p>
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
