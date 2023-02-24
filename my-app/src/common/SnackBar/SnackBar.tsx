import { useState } from "react";
import React from "react";
import { rootStoreInterface } from "../../store/rootStore";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { inject, observer } from "mobx-react";

interface ISnackBar {
  rootstore: rootStoreInterface;
}

const SnackBarComponent = (props: any) => {
  const { rootstore } = props as ISnackBar;

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = useState(rootstore.snackBarState.open);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      {/* <Alert onClose={handleClose} severity={rootstore.snackBarState.severity}> */}
      <Alert severity={rootstore.snackBarState.severity}>
        {rootstore.snackBarState.message} &nbsp;{" "}
        <CloseIcon onClick={handleClose} />
      </Alert>
    </Snackbar>
  );
};

export default inject("rootstore")(observer(SnackBarComponent));
