import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

interface ICreateNiveau {
  open: boolean;
  handleClose: () => void;
  defaultData: any;
  handleSubmit: (data: any) => void;
}

const CreateNewNiveau = (props: any) => {
  const { open, handleClose, defaultData, handleSubmit } =
    props as ICreateNiveau;

  const [niveau, setNiveau] = useState(defaultData);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNiveau({ ...niveau, [name]: value });
  };

  const handleConfirm = async () => {
    await handleSubmit(niveau);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <DialogContent>
        <TextField
          label="Code"
          value={niveau.code}
          onChange={handleChange}
          required
          name="code"
          fullWidth
        />
        <br />
        <br />
        <TextField
          label="Niveau"
          value={niveau.niveau}
          onChange={handleChange}
          required
          name="niveau"
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

export default CreateNewNiveau;
