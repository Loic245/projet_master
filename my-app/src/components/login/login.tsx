import { Box, Grid, TextField, Button } from "@material-ui/core";
import { useState } from "react";
import { ILogin } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { inject, observer } from "mobx-react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { authStoreInterface } from "../../store/authStore";

const defaultData: ILogin = {
  nom: "",
  password: "",
};

interface Ilogin {
  authStore: authStoreInterface;
}

const Login = (props: any) => {
  const { authStore } = props as Ilogin;

  const redirect = useNavigate();

  const [data, setData] = useState(defaultData);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [error, setError] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();

    if (data.nom === "" || data.password === "") {
      setOpen(true);
      setError("Veuillez remplir correctement les champs !");
    }

    const result: any = await authStore.login(data);
    if (result) {
      redirect("/dashboard");
    } else {
      setOpen(true);
      setError("Utilisateur introuvable ou mot de passe incorrect !");
    }
  };

  return (
    <Box style={{ display: "flex", justifyContent: "center" }}>
      <Grid xs={10} sm={10} md={4} lg={4}>
        <TextField
          variant="standard"
          label="Nom"
          name="nom"
          value={data.nom}
          fullWidth={true}
          onChange={handleChange}
        />
        <TextField
          variant="standard"
          label="Mot de passe"
          name="password"
          type="password"
          value={data.password}
          fullWidth={true}
          onChange={handleChange}
        />
        <br />
        <br />
        <center>
          <Button variant="contained" color="primary" onClick={submit}>
            Connexion
          </Button>
        </center>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert severity="error">
          &nbsp; &nbsp; {error} &nbsp; &nbsp;
          <CloseIcon onClick={handleClose} />
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default inject("authStore")(observer(Login));
