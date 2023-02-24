import {
  TextField,
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import useStyles from "./style";
import { defaultProf } from "../../../common/default";
import { IProfessor } from "../../../common/Interfaces";
import { useState, useEffect } from "react";
import { userStore } from "../../../store";
import { useNavigate } from "react-router-dom";

const CreateProf = () => {
  useEffect(() => {
    return () => {
      setData(defaultProf);
    };
  }, []);

  const history = useNavigate();

  const style = useStyles();

  const [data, setData] = useState<IProfessor>(defaultProf);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleChangeMatiere = (e: any) => {
    const { value } = e.target;
    setData({ ...data, matiere: [...value] });
  };

  const handleSubmit = async () => {
    await userStore.createProf(data);
    history("/users");
  };

  const handleback = () => {
    history("/users");
  };

  return (
    <Box className={style.boxContainer}>
      <h1>Création de Professeur</h1>
      <br />
      <Grid container={true} className={style.container} spacing={3}>
        <Grid item={true} xs={4} sm={4} md={4} lg={4}>
          <TextField
            label="Nom"
            name="nomProf"
            required={true}
            value={data.nomProf}
            onChange={handleChange}
            InputProps={{
              classes: {
                input: style.inputClasses,
              },
            }}
            InputLabelProps={{ shrink: true }}
            fullWidth={true}
          />
        </Grid>
        <Grid item={true} xs={4} sm={4} md={4} lg={4}>
          <TextField
            label="Prénom"
            name="prenomProf"
            required={true}
            value={data.prenomProf}
            onChange={handleChange}
            InputProps={{
              classes: {
                input: style.inputClasses,
              },
            }}
            InputLabelProps={{ shrink: true }}
            fullWidth={true}
          />
        </Grid>
        <Grid item={true} xs={4} sm={4} md={4} lg={4}>
          <FormControl fullWidth={true}>
            <InputLabel shrink={true}>Sexe</InputLabel>
            <Select name="sexe" value={data.sexe} onChange={handleChange}>
              <MenuItem value="Homme">Homme</MenuItem>
              <MenuItem value="Femme">Femme</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container={true} className={style.container} spacing={3}>
        <Grid item={true} xs={4} sm={4} md={4} lg={4}>
          <TextField
            label="Adresse"
            name="adresseProf"
            required={true}
            value={data.adresseProf}
            onChange={handleChange}
            InputProps={{
              classes: {
                input: style.inputClasses,
              },
            }}
            InputLabelProps={{ shrink: true }}
            fullWidth={true}
          />
        </Grid>
        <Grid item={true} xs={4} sm={4} md={4} lg={4}>
          <TextField
            label="Date de naissance"
            name="birthday"
            required={true}
            type="date"
            value={data.birthday}
            onChange={handleChange}
            InputProps={{
              classes: {
                input: style.inputClasses,
              },
            }}
            InputLabelProps={{ shrink: true }}
            fullWidth={true}
          />
        </Grid>
        <Grid item={true} xs={4} sm={4} md={4} lg={4}>
          <TextField
            label="Lieu de naissance"
            name="placeOfBirth"
            required={true}
            value={data.placeOfBirth}
            onChange={handleChange}
            InputProps={{
              classes: {
                input: style.inputClasses,
              },
            }}
            InputLabelProps={{ shrink: true }}
            fullWidth={true}
          />
        </Grid>
      </Grid>

      <Grid container={true} spacing={3}>
        <Grid item={true} xs={4} sm={4} md={4} lg={4}>
          <TextField
            label="CIN"
            name="CIN"
            required={true}
            value={data.CIN}
            onChange={handleChange}
            InputProps={{
              classes: {
                input: style.inputClasses,
              },
            }}
            InputLabelProps={{ shrink: true }}
            fullWidth={true}
          />
        </Grid>
        <Grid item={true} xs={4} sm={4} md={4} lg={4}>
          <TextField
            label="Matière"
            name="matiere"
            required={true}
            value={data.matiere}
            onChange={handleChange}
            InputProps={{
              classes: {
                input: style.inputClasses,
              },
            }}
            InputLabelProps={{ shrink: true }}
            fullWidth={true}
          />
        </Grid>
      </Grid>

      <Grid container={true} className={style.validation}>
        <Button
          variant="contained"
          className={style.button}
          size="small"
          title="Revenir dans la liste"
          onClick={handleback}
        >
          Annuler
        </Button>
        <Button
          variant="contained"
          className={style.button}
          size="small"
          title="Créer l'utilisateur"
          onClick={handleSubmit}
        >
          Enregistrer
        </Button>
      </Grid>
    </Box>
  );
};

export default CreateProf;
