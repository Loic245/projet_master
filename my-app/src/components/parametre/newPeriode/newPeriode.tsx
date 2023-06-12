import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface ICreateNiveau {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (data: any) => void;
}

const NewPeriode = (props: any) => {
  const { open, handleClose, handleSubmit } = props as ICreateNiveau;

  const [periode, setPeriode] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPeriode(value);
  };

  const handleCloseDialog = () => {
    handleClose();
    setPeriode("");
  };

  const handleConfirm = async () => {
    await handleSubmit(periode);
    handleCloseDialog();
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="xs">
      <DialogContent>
        <TextField
          label="Période d'examen"
          value={periode}
          onChange={handleChange}
          required
          fullWidth
        />
        <br />
        <br />
      </DialogContent>
      <DialogActions style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" onClick={handleClose}>
          Annuler
        </Button>
        <Button variant="contained" onClick={handleConfirm}>
          Créer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewPeriode;
