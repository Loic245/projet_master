import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

interface ICreateMatiere {
  open: boolean;
  handleClose: () => void;
  defaultData: any;
  handleSubmit: (data: any) => void;
}

const CreateNewMatiere = (props: any) => {
  const { open, handleClose, defaultData, handleSubmit } =
    props as ICreateMatiere;

  const [matiere, setMatiere] = useState(defaultData);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setMatiere({ ...matiere, [name]: value });
  };

  const handleConfirm = async () => {
    await handleSubmit(matiere);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <DialogContent>
        <TextField
          label="Code"
          value={matiere.code}
          onChange={handleChange}
          required
          name="code"
          fullWidth
        />
        <br />
        <br />
        <TextField
          label="Matiere"
          value={matiere.niveau}
          onChange={handleChange}
          required
          name="matiere"
          fullWidth
        />
      </DialogContent>
      <DialogActions style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" onClick={handleConfirm}>
          Créer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewMatiere;
