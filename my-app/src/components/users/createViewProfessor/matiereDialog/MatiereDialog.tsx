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
import { MatiereInterface } from "../../../../store/matiereStore";

interface IMatiereDialog {
  openMatiere: boolean;
  handleCloseMatiere: () => void;
  handleAddMatiere: () => void;
  niveauStore: NiveauStoreInterface;
  matiereStore: MatiereInterface;
}

interface INiveau {
  code: string;
  niveau: string;
}

const defaultNiveau: INiveau = {
  code: "",
  niveau: "",
};

interface IMatiere {
  code: string;
  matiere: string;
}

const defaultMatiere: IMatiere = {
  code: "",
  matiere: "",
};

interface ISavedData {
  niveau: string;
  matiere: string;
}

const defaultSavedData: ISavedData = {
  niveau: "",
  matiere: "",
};

const MatiereDialog = (props?: any) => {
  const {
    openMatiere,
    handleCloseMatiere,
    niveauStore,
    matiereStore,
    handleAddMatiere,
  } = props as IMatiereDialog;

  const [current, setCurrent] = useState(defaultNiveau);
  const [matiere, setMatiere] = useState(defaultMatiere);
  const [savedData, setSavedData] = useState(defaultSavedData);

  useEffect(() => {
    niveauStore.getNiveau();
    matiereStore.getAllMatiere();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCurrent({ ...current, [name]: value });
    setSavedData({ ...savedData, niveau: value });
  };

  const handleChangeMatiere = (e: any) => {
    const { name, value } = e.target;
    setMatiere({ ...matiere, [name]: value });
    setSavedData({ ...savedData, matiere: value });
  };

  const AddMatiere = () => {
    if (!savedData.matiere || !savedData.niveau) {
      return;
    }
    matiereStore.setNiveauMatiere(savedData);
    setCurrent(defaultNiveau);
    setMatiere(defaultMatiere);
    setSavedData(defaultSavedData);
    handleAddMatiere();
  };

  return (
    <Dialog open={openMatiere} onClose={handleCloseMatiere} maxWidth="lg">
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
        </FormControl>{" "}
        <br />
        <FormControl variant="standard" fullWidth={true}>
          <InputLabel shrink={true}>Matière</InputLabel>
          <Select
            name="matiere"
            value={matiere.matiere}
            onChange={handleChangeMatiere}
          >
            {matiereStore.listMatiere.map((k: IMatiere) => (
              <MenuItem value={k.matiere}> {k.matiere} </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="primary" onClick={AddMatiere}>
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default inject("niveauStore", "matiereStore")(observer(MatiereDialog));
