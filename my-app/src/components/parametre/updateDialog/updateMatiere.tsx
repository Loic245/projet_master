import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { MatiereInterface } from "../../../store/matiereStore";

interface IUpdateNiveau {
  open: boolean;
  handleClose: () => void;
  data: any;
  matiereStore?: MatiereInterface;
}

const UpdateMatiere = (props: any) => {
  const { open, handleClose, data, matiereStore } = props as IUpdateNiveau;

  const [matiere, setMatiere] = useState(data);

  useEffect(() => {
    setMatiere(data);
    //   return () => {
    //     second
    //   }
  }, [data]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setMatiere({ ...matiere, [name]: value });
  };

  const handleUpdate = async () => {
    await matiereStore?.updateMatiere(matiere);
    handleClose();
  };

  const handleDelete = async () => {
    await matiereStore?.deleteMatiere(matiere?._id);
    handleClose();
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
        <TextField
          label="Matiere"
          value={matiere.matiere}
          onChange={handleChange}
          required
          name="matiere"
          fullWidth
        />
        <br />
      </DialogContent>
      <DialogActions style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" onClick={handleDelete}>
          supprimer
        </Button>
        <Button variant="contained" onClick={handleUpdate}>
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default inject("matiereStore")(observer(UpdateMatiere));
