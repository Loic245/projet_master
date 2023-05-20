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
import { adminDefault } from "../../../common/default";
import { IAdmin } from "../../../common/Interfaces";
import { useState, useEffect, useRef } from "react";
import { userStore } from "../../../store";
import { useNavigate } from "react-router-dom";
import config from "../../../config";
import person from "../../../assets/person_icon.png";
import BackupIcon from "@mui/icons-material/Backup";
import axios from "axios";

const CreateView = () => {
  useEffect(() => {
    return () => {
      setData(adminDefault);
    };
  }, []);

  const [selectedFile, setSelectedFile] = useState<any>([]);
  const history = useNavigate();

  const style = useStyles();

  const [data, setData] = useState<IAdmin>(adminDefault);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
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

  const handleSubmit = async () => {
    if (selectedFile.length > 0) {
      const newValue = await uploadFileFunction();
      await userStore.createAdmin(newValue);
    } else {
      await userStore.createAdmin(data);
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

  const handleback = () => {
    history("/users");
  };

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

  return (
    <Box className={style.boxContainer}>
      <h1>Création Administrateur</h1>
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
            name="nomAdmin"
            required={true}
            value={data.nomAdmin}
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
            name="prenomAdmin"
            required={true}
            value={data.prenomAdmin}
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
            name="adresseAdmin"
            required={true}
            value={data.adresseAdmin}
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
            label="Poste"
            name="poste"
            required={true}
            value={data.poste}
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

export default CreateView;
