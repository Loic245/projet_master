import { inject, observer } from "mobx-react";
import { NiveauStoreInterface } from "../../store/niveauStore";
import { Grid, Box, Button, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

interface IParametre {
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

const Parametre = (props: any) => {
  const { niveauStore } = props as IParametre;
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

  useEffect(() => {
    niveauStore.getNiveau();
  }, [niveauStore]);

  const [niveau, setNiveau] = useState(defaultNiveau);
  const [addNiveau, setAddNiveau] = useState(false);

  const handleNewNiveau = () => {
    niveauStore.createNiveau(niveau);
    setAddNiveau(!addNiveau);
    setNiveau(defaultNiveau);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNiveau({ ...niveau, [name]: value });
  };

  const handleAddNiveau = () => {
    setAddNiveau(!addNiveau);
  };

  console.log("niveauStore.listNiveau :", niveauStore.listNiveau);

  return (
    <div>
      <Box>
        <Grid container sx={{ justifyContent: "space-around" }}>
          <Grid item xs={12} sm={5} md={5} sx={{ height: 400 }}>
            <DataGrid rows={niveauStore.listNiveau} columns={columns} />
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
            <DataGrid rows={niveauStore.listNiveau} columns={columns} />
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: "none" }}
            >
              Créer
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default inject("niveauStore")(observer(Parametre));
