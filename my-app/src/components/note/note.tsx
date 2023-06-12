import {
  Box,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Alert,
  Button,
} from "@mui/material";
import { inject, observer } from "mobx-react";
import { useEffect, useState } from "react";
import useStyles from "./style";
import { IAutreInterface } from "../../store/autreStore";
import { NiveauStoreInterface } from "../../store/niveauStore";
import { MatiereInterface } from "../../store/matiereStore";
import { UserStoreInterface } from "../../store/userStore";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { NoteStoreInterface } from "../../store/noteStore";

interface INote {
  autreStore: IAutreInterface;
  niveauStore: NiveauStoreInterface;
  matiereStore: MatiereInterface;
  userStore: UserStoreInterface;
  noteStore: NoteStoreInterface;
}

interface IAlert {
  message: string;
  severity: string | any;
  open?: boolean;
}

const defaultAlert: IAlert = {
  message: "",
  severity: "error",
  open: false,
};

const Note = (props: any) => {
  const { autreStore, niveauStore, matiereStore, userStore, noteStore } =
    props as INote;

  const [annee, setAnnee] = useState<any>();
  const [periode, setPeriode] = useState<any[]>([]);
  const [selectedPeriode, setSelectedPeriode] = useState();
  const [selectedNiveau, setSelectedNiveau] = useState();
  const [selecetedMatiere, setSelectedMatiere] = useState();
  const [nivPerProf, setNivPerProf] = useState<any[]>([]);
  const [listeEtudiant, setListeEtudiant] = useState<any[]>([]);

  useEffect(() => {
    autreStore.getAnnee();
    autreStore.getData();
    niveauStore.getNiveau();
    matiereStore.getAllMatiere();

    // return () => {
    //   second
    // }
  }, []);

  useEffect(() => {
    const getMatiereParProf = async () => {
      await autreStore.getMatiereParProf(userStore.user.matricule);
    };
    getMatiereParProf().then(() => setNivPerProf(autreStore.matiereParProf));
  }, [userStore.user]);

  useEffect(() => {
    if (nivPerProf?.length > 0) {
      const getListeEtudiant = async () => {
        await autreStore.etudiantParNiveau(nivPerProf[0].niveau);
      };
      getListeEtudiant().then(() => setListeEtudiant(autreStore.listeEtudiant));
    }
  }, [nivPerProf]);

  useEffect(() => {
    setAnnee(autreStore.annee);
    setPeriode(autreStore.allData);
  }, [autreStore.allData, autreStore.annee]);

  const handleChange = (e: any) => {
    const { value } = e.target;
    setSelectedPeriode(value);
  };

  const handleChangeNiveau = async (e: any) => {
    const { value } = e.target;
    setSelectedNiveau(value);
    const getListeEtudiant = async () => {
      await autreStore.etudiantParNiveau(value);
    };
    getListeEtudiant().then(() => setListeEtudiant(autreStore.listeEtudiant));
  };

  const handleChangeMatiere = (e: any) => {
    const { value } = e.target;
    setSelectedMatiere(value);
  };

  const handleChangeNote = (row: any) => (e: any) => {
    const current = listeEtudiant;
    current.splice(row.id, 1, {
      ...listeEtudiant[row.id],
      note: e.target.value,
    });
    setListeEtudiant(listeEtudiant);
  };
  console.log("listeEtudiant :", listeEtudiant);

  const columns: GridColDef[] = [
    {
      field: "nomEtu",
      headerName: "Nom et prénom",
      width: 790,
      valueGetter: (params: GridValueGetterParams) =>
        `${params?.row?.nomEtu} ${params?.row?.prenomEtu}`,
    },
    {
      field: "note",
      headerName: "Note",
      width: 200,
      renderCell: (params: any) => (
        <input
          type="number"
          inputMode="numeric"
          pattern="^\d*(\.\d{0,2})?$"
          className={classes.styleText}
          onChange={handleChangeNote(params.row)}
        />
      ),
    },
  ];

  const classes = useStyles();

  const handleClick = async (e: any) => {
    if (listeEtudiant.length === 0) {
      errorFunction("Veuillez remplir correctement les notes", "error");
      return;
    }
    if (listeEtudiant) {
      for (let k = 0; k < listeEtudiant.length; k++) {
        if (listeEtudiant[k].note === "") {
          errorFunction("Veuillez remplir correctement les notes", "error");
          return;
        }
      }
    }

    let resultArray: any[] = [];
    for (let i = 0; i < listeEtudiant.length; i++) {
      const dataSend = {
        periode: selectedPeriode || periode[0].periode,
        annee: annee.annee,
        niveau: selectedNiveau || nivPerProf[0]?.niveau,
        prof: userStore.user.matricule,
        etudiant: listeEtudiant[i]._id,
        matiere: selecetedMatiere || nivPerProf[0]?.matiere,
        note: listeEtudiant[i].note,
      };
      resultArray.push(dataSend);
    }
    console.log("resultArray :", resultArray);
    await noteStore.saveNote(resultArray);
    errorFunction("Note ajouté avec succès !", "success");
  };

  const [messageAlert, setMessageAlert] = useState(defaultAlert);

  const errorFunction = (message: string, severity: string) => {
    setMessageAlert({ ...messageAlert, open: true, severity, message });
    setTimeout(() => {
      setMessageAlert({ ...messageAlert, open: false });
    }, 4000);
  };

  return (
    <Box className={classes.BoxContainer}>
      <Grid className={classes.boxJustify}>
        <h2>Note . . .</h2>
        <Grid>
          {annee && (
            <Grid className={classes.boxFlexContainer}>
              <p className={classes.p}>Année scolaire : </p>
              <TextField value={annee.annee || ""} disabled />
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid className={classes.boxJustify}>
        <Grid>
          {periode.length > 0 && (
            <Grid className={classes.boxFlexContainer}>
              <p className={classes.p}>Période d'examen :</p>
              <FormControl variant="outlined">
                {/* <InputLabel shrink={true}>Année scolaire</InputLabel> */}
                <Select
                  name="sexe"
                  value={selectedPeriode || periode[0].periode || ""}
                  onChange={handleChange}
                >
                  {periode?.map((k: any) => (
                    <MenuItem value={k.periode}>{k.periode}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>
        <Grid>
          {nivPerProf && (
            <Grid className={classes.boxFlexContainer}>
              <p className={classes.p}>niveau : </p>
              <FormControl variant="outlined">
                {/* <InputLabel shrink={true}>Année scolaire</InputLabel> */}
                <Select
                  //   name="sexe"
                  value={selectedNiveau || nivPerProf[0]?.niveau || ""}
                  onChange={handleChangeNiveau}
                >
                  {nivPerProf?.map((k: any) => (
                    <MenuItem value={k.niveau}>{k.niveau}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>
        <Grid>
          {nivPerProf && (
            <Grid className={classes.boxFlexContainer}>
              <p className={classes.p}>Matiere : </p>
              <FormControl variant="outlined">
                {/* <InputLabel shrink={true}>Année scolaire</InputLabel> */}
                <Select
                  //   name="sexe"
                  value={selecetedMatiere || nivPerProf[0]?.matiere || ""}
                  onChange={handleChangeMatiere}
                >
                  {nivPerProf?.map((k: any) => (
                    <MenuItem value={k.matiere}>{k.matiere}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>
      </Grid>
      <hr />
      <Grid className={classes.boxJustify}>
        <h3>Liste des étudiants . . .</h3>
        <Button variant="contained" size="small" onClick={handleClick}>
          Ajouter
        </Button>
      </Grid>
      <Grid className={classes.listeComponent}>
        {listeEtudiant && (
          <DataGrid
            rows={listeEtudiant}
            columns={columns}
            pageSize={25}
            rowsPerPageOptions={[25]}
          />
        )}
      </Grid>
      {messageAlert.open && messageAlert?.severity && (
        <span
          style={{
            position: "absolute",
            right: "30%",
            left: "30%",
            bottom: "-25%",
          }}
        >
          <Alert severity={messageAlert?.severity}>
            {messageAlert.message}
          </Alert>
        </span>
      )}
    </Box>
  );
};

export default inject(
  "autreStore",
  "niveauStore",
  "matiereStore",
  "userStore",
  "noteStore"
)(observer(Note));
