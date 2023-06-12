import { inject, observer } from "mobx-react";
import { NiveauStoreInterface } from "../../store/niveauStore";
import {
  Grid,
  Box,
  Button,
  TextField,
  Tab,
  Tabs,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { MatiereInterface } from "../../store/matiereStore";
import TabPanel from "../../common/TabPanel";
import { a11yProps } from "../../common/utils/function";
import { ParametreInterface } from "../../store/parametreStore";
import UpdateNiveau from "./updateDialog/updateNiveau";
import CreateNewNiveau from "./createNew/createNewNiveau";
import UpdateMatiere from "./updateDialog/updateMatiere";
import CreateNewMatiere from "./createNew/createNewMatiere";
import NewPeriode from "./newPeriode/newPeriode";
import useStyles from "./style";
import { IAutreInterface } from "../../store/autreStore";

interface IParametre {
  niveauStore: NiveauStoreInterface;
  matiereStore: MatiereInterface;
  parametreStore: ParametreInterface;
  autreStore: IAutreInterface;
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
  const { niveauStore, matiereStore, parametreStore, autreStore } =
    props as IParametre;
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
      width: 400,
    },
  ];

  const annee = [
    "2020-2021",
    "2021-2022",
    "2022-2023",
    "2023-2024",
    "2024-2025",
    "2025-2026",
    "2026-2027",
    "2027-2028",
    "2028-2029",
    "2029-2030",
  ];

  useEffect(() => {
    niveauStore.getNiveau();
    matiereStore.getAllMatiere();
  }, [niveauStore, matiereStore]);

  useEffect(() => {
    const getAnnee = async () => {
      await autreStore.getAnnee();
      await autreStore.getData();
    };
    getAnnee();

    // return () => {
    //   second
    // }
  }, []);

  useEffect(() => {
    if (autreStore.annee) {
      setAnneeEnCours(autreStore.annee);
    }

    if (autreStore.allData) {
      setAllPeriode(autreStore.allData);
    }

    // return () => {
    //   second
    // }
  }, [autreStore.annee, autreStore.allData]);

  const [niveau, setNiveau] = useState(defaultNiveau);
  const [matiere, setMatiere] = useState(defaultMatiere);
  const [openNiveau, setOpenNiveau] = useState(false);
  const [openMatiere, setOpenMatiere] = useState(false);
  const [dataNiveau, setDataNiveau] = useState(defaultNiveau);
  const [newNiveau, setNewNiveau] = useState(false);
  const [newMatiere, setNewMatiere] = useState(false);
  const [anneeEnCours, setAnneeEnCours] = useState<any>();
  const [openPeriode, setOpenPeriode] = useState(false);
  const [periode, setPeriode] = useState<string[] | any[]>([]);
  const [allperiode, setAllPeriode] = useState<any[]>([]);

  const classes = useStyles();

  const handleNewNiveau = async (data: any) => {
    await niveauStore.createNiveau(data);
    setNiveau(defaultNiveau);
    setNewNiveau(!newNiveau);
  };

  const handleCreateMatiere = async (data: any) => {
    await matiereStore.createMatiere(data);
    setMatiere(defaultMatiere);
    setNewMatiere(!newMatiere);
  };

  const handleAddNiveau = () => {
    setNewNiveau(!newNiveau);
  };

  const openNiveauDialog = (data: any) => {
    setDataNiveau(data.row);
    setOpenNiveau(true);
  };

  const openMatiereDialog = (data: any) => {
    setMatiere(data.row);
    setOpenMatiere(!openMatiere);
  };

  const handleAddMatiere = () => {
    setNewMatiere(!newMatiere);
  };

  const handleOpenTabs = (event: any, value: any) => {
    parametreStore.setTabsValue(value);
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    setAnneeEnCours({
      ...anneeEnCours,
      annee: value,
    });
  };

  const handleAddPeriode = () => {
    setOpenPeriode(true);
  };

  const handleNewPeriode = async (periodes: string) => {
    // setPeriode([...periode, periodes]);
    // const data = {
    //   periode: [...periode, periodes],
    // };
    await autreStore.saveData(periodes);
    handleClosePeriode();
  };

  const handleUpdateAnnee = async () => {
    await autreStore.updateAnnee(anneeEnCours);
  };

  const handleCloseNiveau = () => setOpenNiveau(false);
  const handleCloseMatiere = () => setOpenMatiere(false);
  const handleCloseNewNiveau = () => setNewNiveau(false);
  const handleCloseNewMatiere = () => setNewMatiere(false);
  const handleClosePeriode = () => setOpenPeriode(false);

  return (
    <Box sx={{ padding: "1rem" }}>
      <Tabs
        value={parametreStore?.tabsValue}
        onChange={handleOpenTabs}
        aria-label="basic tabs example"
      >
        <Tab label="Niveau" {...a11yProps(0)} />
        <Tab label="Matiere" {...a11yProps(1)} />
        <Tab label="Autres" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={parametreStore?.tabsValue} index={0}>
        <Grid sx={{ height: 400 }}>
          <Grid
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 2rem",
            }}
          >
            <h2>Liste des niveaux</h2>
            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
              }}
              onClick={handleAddNiveau}
            >
              Créer
            </Button>
          </Grid>
          <br />
          <DataGrid
            rows={niveauStore.listNiveau}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onRowClick={openNiveauDialog}
          />

          <UpdateNiveau
            data={dataNiveau}
            open={openNiveau}
            handleClose={handleCloseNiveau}
          />

          <CreateNewNiveau
            open={newNiveau}
            handleClose={handleCloseNewNiveau}
            defaultData={niveau}
            handleSubmit={handleNewNiveau}
          />
        </Grid>
      </TabPanel>
      <TabPanel value={parametreStore?.tabsValue} index={1}>
        <Grid sx={{ height: 400 }}>
          <Grid
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 2rem",
            }}
          >
            <h2>Liste des matières</h2>
            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
              }}
              onClick={handleAddMatiere}
            >
              Créer
            </Button>
          </Grid>
          <br />
          <DataGrid
            rows={matiereStore.listMatiere}
            columns={columnsMatiere}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onRowClick={openMatiereDialog}
          />

          <UpdateMatiere
            data={matiere}
            open={openMatiere}
            handleClose={handleCloseMatiere}
          />

          <CreateNewMatiere
            open={newMatiere}
            handleClose={handleCloseNewMatiere}
            defaultData={defaultMatiere}
            handleSubmit={handleCreateMatiere}
          />
        </Grid>
      </TabPanel>
      <TabPanel value={parametreStore?.tabsValue} index={2}>
        <Grid className={classes.newPeriode}>
          <h2>Année scolaire en cours</h2>
          <Button
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
            }}
            onClick={handleUpdateAnnee}
          >
            Créer
          </Button>
        </Grid>
        <hr />
        {anneeEnCours && (
          <FormControl variant="outlined" className={classes.yearWidth}>
            {/* <InputLabel shrink={true}>Année scolaire</InputLabel> */}
            <Select
              name="sexe"
              value={anneeEnCours.annee}
              onChange={handleChange}
            >
              {annee.map((k: string) => (
                <MenuItem value={k}>{k}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <br />
        <br />
        <hr />
        <Grid className={classes.newPeriode}>
          <h2>Période d'examen</h2>
          <Button
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
            }}
            onClick={handleAddPeriode}
          >
            Créer
          </Button>
        </Grid>
        {allperiode.length > 0 &&
          allperiode?.map((k: any) => (
            <table>
              <tbody>
                <tr>
                  <td>{k.periode}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          ))}

        <NewPeriode
          open={openPeriode}
          handleClose={handleClosePeriode}
          handleSubmit={handleNewPeriode}
        />
      </TabPanel>
    </Box>
  );
};

export default inject(
  "niveauStore",
  "matiereStore",
  "parametreStore",
  "autreStore"
)(observer(Parametre));
