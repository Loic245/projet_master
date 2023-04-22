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
import { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { NiveauStoreInterface } from "../../../../store/niveauStore";

interface IMatiereDialog {
  openMatiere: boolean;
  handleCloseMatiere: () => void;
  niveauStore: NiveauStoreInterface;
}

interface INiveau {
  code: string;
  niveau: string;
}

const defaultNiveau: INiveau = {
  code: "",
  niveau: "",
};

const MatiereDialog = (props?: any) => {
  const { openMatiere, handleCloseMatiere, niveauStore } =
    props as IMatiereDialog;

  const [current, setCurrent] = useState(defaultNiveau);

  useEffect(() => {
    niveauStore.getNiveau();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCurrent({ ...current, [name]: value });
  };

  return (
    <Dialog open={openMatiere} onClose={handleCloseMatiere} maxWidth="xs">
      <DialogTitle id="alert-dialog-title" color="primary">
        Ajout matière
      </DialogTitle>
      <DialogContent>
        <FormControl variant="standard" fullWidth={true}>
          <InputLabel shrink={true}>Niveau</InputLabel>
          <Select name="niveau" value={current.niveau} onChange={handleChange}>
            {niveauStore.listNiveau.map((k: any) => (
              <MenuItem value={k.code}> {k.niveau} </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="primary">
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default inject("niveauStore")(observer(MatiereDialog));
