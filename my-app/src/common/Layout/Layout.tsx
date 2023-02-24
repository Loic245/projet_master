import NavBar from "../Navbar/NavBar";
import SideBar from "../SideBar";
import { Box, Grid } from "@material-ui/core";
import { FC } from "react";
import { rootStoreInterface } from "../../store/rootStore";
import { inject, observer } from "mobx-react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";
import { useState } from "react";

interface IProps {
  children: any;
  rootStore?: rootStoreInterface;
}

const Layout: FC<IProps | any> = (props) => {
  const { children, rootStore } = props as IProps;

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
        container={true}
        style={{ marginTop: "4rem" }}
        xs={12}
        sm={12}
        md={12}
        lg={12}
      >
        <Grid
          item={true}
          xs={12}
          sm={3}
          md={3}
          lg={3}
          style={{
            position: "fixed",
            height: "100vh",
            borderRight: "2px solid #f50057",
          }}
        >
          <SideBar />
        </Grid>
        <Grid
          item={true}
          xs={12}
          sm={9}
          md={9}
          lg={9}
          style={{
            position: "relative",
            padding: "0.5rem",
            marginLeft: "18rem",
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

export default inject("rootStore")(observer(Layout));
