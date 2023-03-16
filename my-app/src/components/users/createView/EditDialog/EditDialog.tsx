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
import { IAdmin } from "../../../../common/Interfaces";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { inject, observer } from "mobx-react";
import moment from "moment";
import { useState, useEffect } from "react";
import { UserStoreInterface } from "../../../../store/userStore";

interface IEditDialog {
  openDialogAdmin: boolean;
  handleCloseDialogAdmin: () => void;
  data: IAdmin;
  userStore?: UserStoreInterface;
}

const EditDialogAdmin = (props: any) => {
  const { openDialogAdmin, handleCloseDialogAdmin, data, userStore } =
    props as IEditDialog;

  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  const [currentData, setCurrentData] = useState<IAdmin | any>(data);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCurrentData({ ...currentData, [name]: value });
  };

  const handleChangeDay = (e: any) => {
    const { name, value } = e.target;
    setCurrentData({ ...currentData, [name]: value });
  };

  const update = async () => {
    await userStore?.updateAdmin(currentData);
    handleCloseDialogAdmin();
  };

  const deleteAdmin = async () => {
    await userStore?.deleteAdmin(currentData?._id);
    handleCloseDialogAdmin();
  };

  return (
    <Dialog
      open={openDialogAdmin}
      onClose={handleCloseDialogAdmin}
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title" color="primary">
        Modification Administrateur
      </DialogTitle>
      <DialogContent>
        <TextField
          variant="standard"
          label="Nom"
          name="nomAdmin"
          value={currentData.nomAdmin}
          onChange={handleChange}
          fullWidth={true}
        />
        <TextField
          variant="standard"
          label="Prénom"
          name="prenomAdmin"
          value={currentData.prenomAdmin}
          onChange={handleChange}
          fullWidth={true}
        />
        <TextField
          variant="standard"
          label="Adresse"
          name="adresseAdmin"
          value={currentData.adresseAdmin}
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
          label="Poste"
          name="poste"
          value={currentData.poste}
          onChange={handleChange}
          fullWidth={true}
        />
      </DialogContent>
      <DialogActions style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="default" onClick={deleteAdmin}>
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

export default inject("userStore")(observer(EditDialogAdmin));
