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
import { useState, useEffect, useRef } from "react";
import { userStore } from "../../../store";
import { useNavigate } from "react-router-dom";
import MatiereDialog from "./matiereDialog";
import { inject, observer } from "mobx-react";
import { MatiereInterface } from "../../../store/matiereStore";
import axios from "axios";
import config from "../../../config";
import BackupIcon from "@mui/icons-material/Backup";

interface IDatas {
  niveau: string;
  matiere: string;
}

interface ICreateProf {
  matiereStore: MatiereInterface;
}

const CreateProf = (props: any) => {
  const { matiereStore } = props as ICreateProf;
  useEffect(() => {
    return () => {
      setData(defaultProf);
    };
  }, []);

  const [selectedFile, setSelectedFile] = useState<any>([]);
  const history = useNavigate();

  const style = useStyles();

  const [data, setData] = useState<IProfessor>(defaultProf);
  const [openMatiere, setOpenMatiere] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleChangeMatiere = (e: any) => {
    const { value } = e.target;
    setData({ ...data, matiere: [...value] });
  };

  const handleSubmit = async () => {
    if (selectedFile.length > 0) {
      const newValue = await uploadFileFunction();
      await userStore.createProf(newValue);
    } else {
      await userStore.createProf(data);
    }
    history("/users");
  };

  const uploadFileFunction = async () => {
    const formData = new FormData();

    const getTypeFile: string = selectedFile[0].type;

    const extName = getExtName(selectedFile[0].name);

    const name = getName(selectedFile[0].name);

    const fileUploaded = new File([selectedFile[0]], `${name}.${extName}`, {
      type: getTypeFile,
    });

    formData.append("file", fileUploaded);

    const path = "profiles";

    const resultUpload = await axios
      .post(`${config.baseURL}/upload/${path}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((err: any) => {
        console.log("errorrrr :", err);
      });

    const newData = {
      ...data,
      image: `/${path}/${resultUpload?.data?.filename}`,
    };
    setData(newData);

    return newData;
  };

  const hiddenFileInput = useRef<any>({});
  const hiddenFileInputTwo = useRef<any>({});

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleClickViewed = () => {
    hiddenFileInputTwo.current.click();
  };

  const [viewImage, setViewImage] = useState<any>();

  const handleFileChange = async (e: any) => {
    e.preventDefault();
    setViewImage(URL.createObjectURL(e.target.files[0]));
    if (selectedFile.length > 0) {
      setSelectedFile([]);
    }
    setSelectedFile([...selectedFile, e.target.files[0]]);
  };

  const getExtName = (FileName: string) => {
    const fileName = FileName.split(".");

    const size = fileName.length;

    return fileName[size - 1];
  };

  const getName = (FileName: string) => {
    const fileName = FileName.split(".");

    return fileName[0];
  };

  const handleback = () => {
    history("/users");
  };

  const handleOpenMatiere = () => {
    setOpenMatiere(!openMatiere);
  };

  const handleCloseMatiere = () => {
    setOpenMatiere(false);
  };

  const handleAddMatiere = () => {
    // const emptyArray = data.matiere;
    // emptyArray?.push(datas);
    setData({ ...data, matiere: matiereStore.niveauMatiere });
    handleCloseMatiere();
  };

  return (
    <Box className={style.boxContainer}>
      <h1>Création de Professeur</h1>
      <br />
      <Grid container={true} className={style.container} spacing={3}>
        <div className={style.uploadCountour}>
          {selectedFile.length > 0 ? (
            <>
              <button onClick={handleClickViewed} className={style.btnUpload}>
                <img
                  className={style.viewImage}
                  src={viewImage}
                  alt="profile_image"
                />
              </button>
              <input
                type="file"
                onChange={handleFileChange}
                ref={hiddenFileInputTwo}
                style={{ display: "none" }}
              />
            </>
          ) : (
            <>
              <button onClick={handleClick} className={style.btnUpload}>
                <BackupIcon sx={{ fontSize: "5rem" }} />
              </button>
              <input
                type="file"
                onChange={handleFileChange}
                ref={hiddenFileInput}
                style={{ display: "none" }}
              />
            </>
          )}
        </div>
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
      </Grid>

      <Grid container={true} className={style.container} spacing={3}>
        <Grid item={true} xs={4} sm={4} md={4} lg={4}>
          <FormControl fullWidth={true}>
            <InputLabel shrink={true}>Sexe</InputLabel>
            <Select name="sexe" value={data.sexe} onChange={handleChange}>
              <MenuItem value="Homme">Homme</MenuItem>
              <MenuItem value="Femme">Femme</MenuItem>
            </Select>
          </FormControl>
        </Grid>
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
      </Grid>

      <Grid container={true} spacing={3}>
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
            label="E-mail"
            name="mail"
            required={true}
            value={data.mail}
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
          <label onClick={handleOpenMatiere}>
            <Button variant="contained">Ajouter Matière</Button>{" "}
          </label>
        </Grid>
      </Grid>
      {matiereStore.niveauMatiere ? (
        data?.matiere?.map((k: any) => (
          <Grid
            container={true}
            spacing={5}
            style={{ margin: "0.5rem 1rem 1rem 1rem" }}
          >
            <Grid xs={6} sm={6} md={6} lg={6}>
              <TextField
                label="Niveau"
                value={k.niveau}
                InputProps={{
                  classes: {
                    input: style.inputClasses,
                  },
                }}
                InputLabelProps={{ shrink: true }}
                fullWidth={true}
              />
            </Grid>
            <Grid xs={6} sm={6} md={6} lg={6}>
              <TextField
                label="Matiere"
                value={k.matiere}
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
        ))
      ) : (
        <></>
      )}

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

      <MatiereDialog
        openMatiere={openMatiere}
        handleCloseMatiere={handleCloseMatiere}
        handleAddMatiere={handleAddMatiere}
      />
    </Box>
  );
};

export default inject("matiereStore")(observer(CreateProf));
