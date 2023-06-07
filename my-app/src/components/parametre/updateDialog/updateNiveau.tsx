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
import { NiveauStoreInterface } from "../../../store/niveauStore";

interface IUpdateNiveau {
  open: boolean;
  handleClose: () => void;
  data: any;
  niveauStore?: NiveauStoreInterface;
}

const UpdateNiveau = (props: any) => {
  const { open, handleClose, data, niveauStore } = props as IUpdateNiveau;

  const [niveau, setNiveau] = useState(data);

  useEffect(() => {
    setNiveau(data);
    //   return () => {
    //     second
    //   }
  }, [data]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNiveau({ ...niveau, [name]: value });
  };

  const handleUpdate = async () => {
    await niveauStore?.updateNiveau(niveau);
    handleClose();
  };

  const handleDelete = async () => {
    await niveauStore?.deleteNiveau(niveau?._id);
    handleClose();
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

export default inject("niveauStore")(observer(UpdateNiveau));
