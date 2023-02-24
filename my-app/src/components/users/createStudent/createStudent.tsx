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
import { defaultStudent, defaultLycee } from "../../../common/default";
import { IEtudiant, ILycee } from "../../../common/Interfaces";
import { useState, useEffect } from "react";
import { userStore } from "../../../store";
import { useNavigate } from "react-router-dom";

const CreateStudent = () => {
  useEffect(() => {
    return () => {
      setData(defaultStudent);
    };
  }, []);

  const history = useNavigate();

  const style = useStyles();

  const [data, setData] = useState<IEtudiant>(defaultStudent);
  const [snack, setSnack] = useState<any>();
  const [lycee, setLycee] = useState<ILycee>(defaultLycee);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleChangeLycee = (e: any) => {
    const { name, value } = e.target;
    setLycee({ ...lycee, [name]: value });
  };

  const handleSubmit = async () => {
    setData({ ...data, lycee: lycee });
    data.lycee = lycee;
    const result = await userStore.createStudent(data);
    setSnack(result);
    history("/users");
  };

  const handleback = () => {
    history("/users");
  };

  return (
    <Box className={style.boxContainer}>
      <h1>Création étudiant</h1>
      <br />
      <Grid container={true} className={style.container} spacing={3}>
        <Grid item={true} xs={4} sm={4} md={4} lg={4}>
          <TextField
            label="Nom"
            name="nomEtu"
            required={true}
            value={data.nomEtu}
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
            name="prenomEtu"
            required={true}
            value={data.prenomEtu}
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
            name="adresseEtu"
            required={true}
            value={data.adresseEtu}
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
            label="Lycée"
            name="nomLycee"
            required={true}
            value={lycee.nomLycee}
            onChange={handleChangeLycee}
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
            <InputLabel shrink={true}>Options</InputLabel>
            <Select
              name="TechG"
              value={lycee.TechG}
              onChange={handleChangeLycee}
            >
              <MenuItem value="Général">Général</MenuItem>
              <MenuItem value="Technique">Technique</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {lycee.TechG === "Général" && (
        <Grid container={true} spacing={3}>
          <Grid item={true} xs={4} sm={4} md={4} lg={4}>
            <TextField
              label="Série"
              name="serieBacc"
              required={true}
              value={lycee.serieBacc}
              onChange={handleChangeLycee}
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
      )}

      {snack}
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

export default CreateStudent;
