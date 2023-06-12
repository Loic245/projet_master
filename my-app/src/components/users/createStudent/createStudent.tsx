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
import { useState, useEffect, useRef } from "react";
import { userStore } from "../../../store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../../config";
import BackupIcon from "@mui/icons-material/Backup";
import { inject, observer } from "mobx-react";
import { NiveauStoreInterface } from "../../../store/niveauStore";

interface ICreateEtudiant {
  niveauStore: NiveauStoreInterface;
}

const CreateStudent = (props: any) => {
  const { niveauStore } = props as ICreateEtudiant;

  useEffect(() => {
    return () => {
      setData(defaultStudent);
    };
  }, []);

  const history = useNavigate();

  const style = useStyles();

  const [selectedFile, setSelectedFile] = useState<any>([]);
  const [data, setData] = useState<IEtudiant>(defaultStudent);
  const [snack, setSnack] = useState<any>();
  const [lycee, setLycee] = useState<ILycee>(defaultLycee);
  const [niveau, setNiveau] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      await niveauStore.getNiveau();
    };
    getData()
      .then(() => setNiveau(niveauStore.listNiveau))
      .then(() =>
        setData({ ...data, niveau: niveauStore.listNiveau[0]?.code })
      );
  }, []);

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
    // if (selectedFile.length > 0) {
    //   const newValue = await uploadFileFunction();
    //   const result = await userStore.createStudent(newValue);
    //   setSnack(result);
    // } else {
    //   const result = await userStore.createStudent(data);
    //   setSnack(result);
    // }
    history("/users");
  };
  console.log("data :", data);

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

  const [selectedNiveau, setSelectedNiveau] = useState();

  const handleChangeNiveau = (e: any) => {
    const { value } = e.target;
    setSelectedNiveau(value);
    setData({ ...data, niveau: value });
  };

  return (
    <Box className={style.boxContainer}>
      <h1>Création étudiant</h1>
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

      <Grid container={true} spacing={3}>
        <Grid item={true} xs={4} sm={4} md={4} lg={4}>
          <TextField
            label="E-Mail"
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

        {niveau && (
          <Grid item={true} xs={4} sm={4} md={4} lg={4}>
            <FormControl fullWidth={true}>
              <InputLabel shrink={true}>Niveau</InputLabel>
              <Select
                value={selectedNiveau || niveau[0]?.code || ""}
                onChange={handleChangeNiveau}
              >
                {niveau?.map((k: any) => (
                  <MenuItem value={k.code}>{k.niveau}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}

        {lycee.TechG === "Général" && (
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
        )}
      </Grid>

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

export default inject("niveauStore")(observer(CreateStudent));
