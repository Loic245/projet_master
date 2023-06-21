import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";
import { Button, TextField } from "@material-ui/core";
import { IProfessor } from "../../../../common/Interfaces";
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
  data: IProfessor;
  userStore?: UserStoreInterface;
}

const EditDialogProf = (props: any) => {
  const { openDialogAdmin, handleCloseDialogAdmin, data, userStore } =
    props as IEditDialog;

  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  const [currentData, setCurrentData] = useState<IProfessor | any>(data);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCurrentData({ ...currentData, [name]: value });
  };

  const handleChangeDay = (e: any) => {
    const { name, value } = e.target;
    setCurrentData({ ...currentData, [name]: value });
  };

  const update = async () => {
    await userStore?.updateProf(currentData);
    handleCloseDialogAdmin();
  };

  const deleteAction = async () => {
    await userStore?.deleteProf(currentData?._id);
    handleCloseDialogAdmin();
  };

  return (
    <Dialog
      open={openDialogAdmin}
      onClose={handleCloseDialogAdmin}
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title" color="primary">
        Enseignant
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
          name="nomProf"
          value={currentData.nomProf}
          onChange={handleChange}
          fullWidth={true}
        />
        <TextField
          variant="standard"
          label="Prénom"
          name="prenomProf"
          value={currentData.prenomProf}
          onChange={handleChange}
          fullWidth={true}
        />
        <TextField
          variant="standard"
          label="Adresse"
          name="adresseProf"
          value={currentData.adresseProf}
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
        <Grid>
          {currentData.matiere.map((k: any) => (
            <div style={{ display: "flex" }}>
              <TextField label="Niveau" value={k.niveau} />
              <TextField label="Matière" value={k.matiere} />
            </div>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="default"
          onClick={deleteAction}
          size="small"
        >
          <DeleteIcon titleAccess="Supprimer" style={{ color: "#f50057" }} />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCloseDialogAdmin}
          size="small"
        >
          <CloseIcon titleAccess="Supprimer" />
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={update}
          size="small"
        >
          <SaveIcon titleAccess="Enregistrer" style={{ color: "#ffffff" }} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default inject("userStore")(observer(EditDialogProf));
