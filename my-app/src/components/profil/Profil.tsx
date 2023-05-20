import { inject, observer } from "mobx-react";
import { UserStoreInterface } from "../../store/userStore";
import config from "../../config";
import useStyles from "./style";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { Grid, TextField, Button } from "@material-ui/core";
import axios from "axios";

interface IProfil {
  userStore: UserStoreInterface;
}

const Profil = (props: any) => {
  const { userStore } = props as IProfil;

  const [selectedFile, setSelectedFile] = useState<any>([]);
  const [viewImage, setViewImage] = useState<any>();
  const [profile, setProfile] = useState<any>();

  useEffect(() => {
    if (userStore.profil) {
      setProfile({ ...userStore.profil, password: "" });
    }
    // return () => {
    //   second
    // }
  }, [userStore.profil]);

  const classes = useStyles();

  const hiddenFileInputTwo = useRef<any>({});

  const handleClickViewed = () => {
    hiddenFileInputTwo.current.click();
  };

  const handleFileChange = async (e: any) => {
    e.preventDefault();
    setViewImage(URL.createObjectURL(e.target.files[0]));
    if (selectedFile.length > 0) {
      setSelectedFile([]);
    }
    setSelectedFile([...selectedFile, e.target.files[0]]);
  };

  const handleSubmit = async (e: any) => {
    let newData = profile;
    if (selectedFile.length > 0) {
      const newValue = await uploadFileFunction();
      newData = newValue;
    }
    if (profile.password === "") {
      delete newData.password;
    }
    await userStore.updateProfile({ ...newData, role: userStore?.user?.role });
    setSelectedFile([]);
    setProfile({ ...newData, password: "" });
    e.preventDefault();
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
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
      ...profile,
      image: `/${path}/${resultUpload?.data?.filename}`,
    };

    return newData;
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

  const adresseExact =
    userStore.user.role === "ADMIN"
      ? "adresseAdmin"
      : userStore.user.role === "PROF"
      ? "adresseProf"
      : "adresseEtu";

  return (
    <div className={classes.conteneur}>
      <div>
        <Grid container className={classes.imageBtn}>
          <div className={classes.uploadCountour}>
            <button onClick={handleClickViewed} className={classes.btnUpload}>
              <img
                className={classes.viewImage}
                src={
                  selectedFile.length > 0
                    ? viewImage
                    : `${config.baseGetFile}${userStore.user.image}`
                }
                alt="profile_image"
              />
            </button>
            <input
              type="file"
              onChange={handleFileChange}
              ref={hiddenFileInputTwo}
              style={{ display: "none" }}
            />
          </div>
          <Button
            variant="contained"
            className={classes.btnSubmit}
            onClick={handleSubmit}
            size="small"
          >
            Enregistrer
          </Button>
        </Grid>
        <Grid container className={classes.listContainer}>
          <TextField
            variant="standard"
            label="Nom"
            value={userStore.user.nom}
            InputLabelProps={{ shrink: true }}
            className={classes.list}
            disabled
          />
          <TextField
            variant="standard"
            label="E-mail"
            value={profile?.mail}
            InputLabelProps={{ shrink: true }}
            className={classes.list}
            disabled
          />
          <TextField
            variant="standard"
            label="Prenom"
            value={userStore.user.prenom}
            InputLabelProps={{ shrink: true }}
            className={classes.list}
            disabled
          />
          <TextField
            variant="standard"
            label="CIN"
            name="CIN"
            value={profile?.CIN}
            InputLabelProps={{ shrink: true }}
            className={classes.list}
            onChange={handleChange}
          />
          <TextField
            variant="standard"
            label="Adresse"
            name={adresseExact}
            value={
              profile?.adresseAdmin || profile.adresseEtu || profile.adresseProf
            }
            InputLabelProps={{ shrink: true }}
            className={classes.list}
            onChange={handleChange}
          />
          <TextField
            variant="standard"
            label="Date de naissance"
            value={moment(profile?.birthday).format("DD/MM/YYYY")}
            InputLabelProps={{ shrink: true }}
            className={classes.list}
            disabled
          />
          <TextField
            variant="standard"
            label="Lieu de naissance"
            value={profile?.placeOfBirth}
            InputLabelProps={{ shrink: true }}
            className={classes.list}
            disabled
          />
          <TextField
            variant="standard"
            label="Sexe"
            value={profile?.sexe}
            InputLabelProps={{ shrink: true }}
            className={classes.list}
            disabled
          />
          <TextField
            variant="standard"
            label="Mot de passe"
            value={profile?.password}
            name="password"
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
            className={classes.list}
          />
        </Grid>
      </div>
    </div>
  );
};

export default inject("userStore")(observer(Profil));
