import { inject, observer } from "mobx-react";
import { NiveauStoreInterface } from "../../store/niveauStore";
import { Grid, Box, Button, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { MatiereInterface } from "../../store/matiereStore";

interface IParametre {
  niveauStore: NiveauStoreInterface;
  matiereStore: MatiereInterface;
}

interface INiveau {
  code: string;
  niveau: string;
}

interface IMatiere {
  code: string;
  matiere: string;
}

const defaultMatiere: IMatiere = {
  code: "",
  matiere: "",
};

const defaultNiveau: INiveau = {
  code: "",
  niveau: "",
};

const Parametre = (props: any) => {
  const { niveauStore, matiereStore } = props as IParametre;
  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Code",
      width: 200,
    },
    {
      field: "niveau",
      headerName: "Niveau",
      width: 200,
    },
  ];

  const columnsMatiere: GridColDef[] = [
    {
      field: "code",
      headerName: "Code",
      width: 200,
    },
    {
      field: "matiere",
      headerName: "Matière",
      width: 200,
    },
  ];

  useEffect(() => {
    niveauStore.getNiveau();
    matiereStore.getAllMatiere();
  }, [niveauStore, matiereStore]);

  const [niveau, setNiveau] = useState(defaultNiveau);
  const [matiere, setMatiere] = useState(defaultMatiere);
  const [addNiveau, setAddNiveau] = useState(false);
  const [addMatiere, setAddMatiere] = useState(false);

  const handleNewNiveau = () => {
    niveauStore.createNiveau(niveau);
    setAddNiveau(!addNiveau);
    setNiveau(defaultNiveau);
  };

  const handleCreateMatiere = () => {
    matiereStore.createMatiere(matiere);
    setAddMatiere(!addMatiere);
    setMatiere(defaultMatiere);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNiveau({ ...niveau, [name]: value });
  };

  const handleChangeMatiere = (e: any) => {
    const { name, value } = e.target;
    setMatiere({ ...matiere, [name]: value });
  };

  const handleAddNiveau = () => {
    setAddNiveau(!addNiveau);
  };

  const handleAddMatiere = () => {
    setAddMatiere(!addMatiere);
  };

  console.log("niveauStore.listNiveau :", niveauStore.listNiveau);

  return (
    <div>
      <Box>
        <Grid container sx={{ justifyContent: "space-around" }}>
          <Grid item xs={12} sm={5} md={5} sx={{ height: 400 }}>
            <DataGrid
              rows={niveauStore.listNiveau}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
                display: addNiveau ? "none" : "block",
              }}
              onClick={handleAddNiveau}
            >
              {!addNiveau ? "Créer" : "Annuler"}
            </Button>
            {addNiveau && (
              <Grid>
                <TextField
                  label="Code"
                  value={niveau.code}
                  onChange={handleChange}
                  required
                  name="code"
                  fullWidth
                />
                <TextField
                  label="Niveau"
                  value={niveau.niveau}
                  onChange={handleChange}
                  required
                  name="niveau"
                  fullWidth
                />{" "}
                <br />
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ textTransform: "none" }}
                  onClick={handleNewNiveau}
                >
                  Enregistrer
                </Button>
              </Grid>
            )}
          </Grid>

          <Grid item xs={12} sm={5} md={5} sx={{ height: 400 }}>
            <DataGrid
              rows={matiereStore.listMatiere}
              columns={columnsMatiere}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: "none" }}
              onClick={handleAddMatiere}
            >
              {!addMatiere ? "Créer" : "Annuler"}
            </Button>
            {addMatiere && (
              <Grid>
                <TextField
                  label="Code"
                  value={matiere.code}
                  onChange={handleChangeMatiere}
                  required
                  name="code"
                  fullWidth
                />
                <TextField
                  label="Matiere"
                  value={matiere.matiere}
                  onChange={handleChangeMatiere}
                  required
                  name="matiere"
                  fullWidth
                />{" "}
                <br />
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ textTransform: "none" }}
                  onClick={handleCreateMatiere}
                >
                  Enregistrer
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default inject("niveauStore", "matiereStore")(observer(Parametre));
