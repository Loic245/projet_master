import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Button, TextField } from "@material-ui/core";
import { IEtudiant, ILycee } from "../../../../common/Interfaces";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { inject, observer } from "mobx-react";
import moment from "moment";
import { useState, useEffect } from "react";
import { UserStoreInterface } from "../../../../store/userStore";
import config from "../../../../config";
import person from "../../../../assets/person_icon.png";

interface IEditDialog {
  openDialogAdmin: boolean;
  handleCloseDialogAdmin: () => void;
  data: IEtudiant;
  userStore?: UserStoreInterface;
}

const EditDialogStudent = (props: any) => {
  const { openDialogAdmin, handleCloseDialogAdmin, data, userStore } =
    props as IEditDialog;

  useEffect(() => {
    setCurrentData(data);
    setLycee(data.lycee);
  }, [data]);

  const [currentData, setCurrentData] = useState<IEtudiant | any>(data);
  const [lycee, setLycee] = useState<ILycee>(data.lycee);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCurrentData({ ...currentData, [name]: value });
  };

  const handleChangeDay = (e: any) => {
    const { name, value } = e.target;
    setCurrentData({ ...currentData, [name]: value });
  };

  const handleChangeLycee = (e: any) => {
    const { name, value } = e.target;
    setCurrentData({ ...currentData, lycee: { ...lycee, [name]: value } });
  };

  const update = async () => {
    await userStore?.updateStudent(currentData);
    handleCloseDialogAdmin();
  };

  const deleteAction = async () => {
    await userStore?.deleteStudent(currentData?._id);
    handleCloseDialogAdmin();
  };

  return (
    <Dialog
      open={openDialogAdmin}
      onClose={handleCloseDialogAdmin}
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title" color="primary">
        Etudiant
      </DialogTitle>
      <DialogContent>
        <center>
          <img
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              margin: "0 auto",
            }}
            src={
              currentData?.image
                ? `${config.baseGetFile}${currentData?.image}`
                : person
            }
            alt="profile_image"
          />
        </center>
        <TextField
          variant="standard"
          label="Nom"
          name="nomEtu"
          value={currentData.nomEtu}
          onChange={handleChange}
          fullWidth={true}
        />
        <TextField
          variant="standard"
          label="Prénom"
          name="prenomEtu"
          value={currentData.prenomEtu}
          onChange={handleChange}
          fullWidth={true}
        />
        <TextField
          variant="standard"
          label="Adresse"
          name="adresseProf"
          value={currentData.adresseEtu}
          onChange={handleChange}
          fullWidth={true}
        />
        <TextField
          variant="standard"
          label="E-mail"
          name="mail"
          value={currentData.mail}
          onChange={handleChange}
          fullWidth={true}
        />
        <TextField
          variant="standard"
          label="CIN"
          name="CIN"
          value={currentData.CIN}
          onChange={handleChange}
          fullWidth={true}
        />
        <TextField
          variant="standard"
          label="Date de naissance"
          name="birthday"
          type="date"
          value={moment(currentData.birthday).format("YYYY-MM-DD")}
          onChange={handleChangeDay}
          fullWidth={true}
        />
        <TextField
          variant="standard"
          label="Lieu de naissance"
          name="placeOfBirth"
          value={currentData.placeOfBirth}
          onChange={handleChange}
          fullWidth={true}
        />
        <FormControl variant="standard" fullWidth={true}>
          <InputLabel shrink={true}>Sexe</InputLabel>
          <Select name="sexe" value={currentData.sexe} onChange={handleChange}>
            <MenuItem value="Homme">Homme</MenuItem>
            <MenuItem value="Femme">Femme</MenuItem>
          </Select>
        </FormControl>
        <TextField
          variant="standard"
          label="Lycée"
          name="nomLycee"
          value={currentData.lycee.nomLycee}
          onChange={handleChangeLycee}
          fullWidth={true}
        />
        <FormControl variant="standard" fullWidth={true}>
          <InputLabel shrink={true}>Option</InputLabel>
          <Select
            name="TechG"
            value={currentData.lycee.TechG}
            onChange={handleChangeLycee}
          >
            <MenuItem value="Général">Général</MenuItem>
            <MenuItem value="Technique">Technique</MenuItem>
          </Select>
        </FormControl>
        {currentData.lycee.TechG === "Général" && (
          <TextField
            variant="standard"
            label="Série"
            name="serieBacc"
            value={currentData.lycee.serieBacc}
            onChange={handleChangeLycee}
            fullWidth={true}
          />
        )}
      </DialogContent>
      <DialogActions style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="default" onClick={deleteAction}>
          Supprimer{" "}
          <DeleteIcon titleAccess="Supprimer" style={{ color: "#f50057" }} />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCloseDialogAdmin}
        >
          Annuler <CloseIcon titleAccess="Supprimer" />
        </Button>
        <Button variant="contained" color="primary" onClick={update}>
          Enregistrer{" "}
          <SaveIcon titleAccess="Enregistrer" style={{ color: "#ffffff" }} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default inject("userStore")(observer(EditDialogStudent));
