import {
  Box,
  Grid,
  TextField,
  Button,
  InputAdornment,
} from "@material-ui/core";
import { useState } from "react";
import { ILogin } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { inject, observer } from "mobx-react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { authStoreInterface } from "../../store/authStore";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyIcon from "@mui/icons-material/Key";
import backGround from "../../assets/test.webp";
import config from "../../config";
import useStyles from "./style";

const defaultData: ILogin = {
  nom: "",
  password: "",
};

interface Ilogin {
  authStore: authStoreInterface;
}

const Login = (props: any) => {
  const { authStore } = props as Ilogin;

  const classes = useStyles();

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
      window.location.reload();
    } else {
      setOpen(true);
      setError("Utilisateur introuvable ou mot de passe incorrect !");
    }
  };

  const handleEnterKey = (e: KeyboardEvent | any) => {
    if (e.code === "Enter") {
      submit(e);
    }
  };

  return (
    <Box
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        backgroundImage: `url('${config.baseGetFile}/test.webp')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        paddingTop: "5rem",
      }}
    >
      <Grid
        xs={10}
        sm={10}
        md={3}
        lg={3}
        style={{
          // backgroundColor: "#898686",
          // opacity: 0.1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid xs={10} sm={10} md={10} lg={10}>
          <center>
            <h1 style={{ color: "yellow", fontFamily: "Georgia, sans-serif" }}>
              Etablissement Scolaire
            </h1>
          </center>
          <label style={{ color: "white" }}>&nbsp; Nom d'utilisateur</label>
          <br />
          <TextField
            variant="standard"
            name="nom"
            size="small"
            value={data.nom}
            onChange={handleChange}
            fullWidth={true}
            autoComplete="none"
            onKeyPress={handleEnterKey}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  &nbsp; &nbsp; <PersonOutlineIcon /> &nbsp; &nbsp;
                </InputAdornment>
              ),
              style: {
                color: "#fff",
                border: "solid 2px #848080",
                borderRadius: "8px",
                background: "#000",
                zIndex: 1,
              },
            }}
          />
          <br />
          <br />
          <>
            <label style={{ color: "white" }}>&nbsp; Mot de passe</label>
            <br />
            <TextField
              variant="standard"
              name="password"
              type="password"
              size="small"
              value={data.password}
              onChange={handleChange}
              fullWidth={true}
              onKeyPress={handleEnterKey}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    &nbsp; &nbsp; <KeyIcon /> &nbsp; &nbsp;
                  </InputAdornment>
                ),
                style: {
                  color: "#fff",
                  border: "solid 2px #848080",
                  borderRadius: "8px",
                  background: "#000",
                },
              }}
            />
          </>

          <br />
          <br />
          <center>
            <Button
              variant="contained"
              color="primary"
              onClick={submit}
              size="small"
            >
              Connexion
            </Button>
          </center>
        </Grid>
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
