import NavBar from "../Navbar/NavBar";
import SideBar from "../SideBar";
import { Box, Grid } from "@material-ui/core";
import { FC, useEffect } from "react";
import { rootStoreInterface } from "../../store/rootStore";
import { inject, observer } from "mobx-react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";
import { useState } from "react";
import { UserStoreInterface } from "../../store/userStore";
import { useNavigate } from "react-router-dom";

interface IProps {
  children: any;
  rootStore?: rootStoreInterface;
  userStore?: UserStoreInterface;
}

const Layout: FC<IProps | any> = (props) => {
  const { children, rootStore, userStore } = props as IProps;
  const history = useNavigate();

  useEffect(() => {
    userStore?.getUser();
    if (localStorage.getItem("token") === null) {
      history("/");
    }
  }, []);

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = useState(rootStore?.snackBarState.open);

  const handleClose = (event: any, reason?: string) => {
    // if (reason === "clickaway") {
    //   return;
    // }

    setOpen(!rootStore?.snackBarState.open);
  };

  return (
    <Box>
      <Grid style={{ position: "fixed", overflow: "hidden", zIndex: 2 }}>
        <NavBar />
      </Grid>
      <Grid
        container
        style={{
          marginTop: "4rem",
          height: "97vh",
          // backgroundColor: "#e8e3e3",
          width: "100%",
        }}
      >
        <Grid
          item
          xs={3}
          sm={3}
          md={3}
          lg={3}
          style={{
            position: "fixed",
            // paddingTop: "18rem",
            height: "100vh",
            backgroundColor: "#e8e3e3",
            borderRight: "4px solid #1c1847",
          }}
        >
          <SideBar />
        </Grid>
        <Grid xs={2} sm={2} md={2} lg={2} />
        <Grid
          item
          xs={10}
          sm={10}
          md={10}
          lg={10}
          style={{
            padding: "0 0 0 3.8rem",
          }}
        >
          {children}
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={rootStore?.snackBarState.duration}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={rootStore?.snackBarState.severity}
        >
          &nbsp; &nbsp; {rootStore?.snackBarState.message} &nbsp; &nbsp;
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default inject("rootStore", "userStore")(observer(Layout));
