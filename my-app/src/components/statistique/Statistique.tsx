import {
  Box,
  Grid,
  Card,
  CardContent,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import { inject, observer } from "mobx-react";
import useStyles from "./style";
import { NoteStoreInterface } from "../../store/noteStore";
import { useEffect, useState } from "react";
import { IAutreInterface } from "../../store/autreStore";
import { annee } from "../parametre/parametre";

interface DataColumn {
  _id: any;
  count: string;
  maxNote: string;
  minNote: string;
  avgNote: string;
}

interface IStatistique {
  noteStore: NoteStoreInterface;
  autreStore: IAutreInterface;
}

const Statistique = (props: any) => {
  const { noteStore, autreStore } = props as IStatistique;

  const classes = useStyles();

  const noteColor = (note: string) => {
    if (+note >= 15) {
      return "green";
    }
    if (+note > 10 && +note < 15) {
      return "blue";
    }
    return "red";
  };

  const [note, setNote] = useState<Array<any>>([]);
  const [noteMaster, setNoteMaster] = useState<any[]>([]);
  const [periode, setPeriode] = useState<any[]>([]);
  const [selectedPeriode, setSelectedPeriode] = useState();
  const [annees, setAnnee] = useState<any>();

  useEffect(() => {
    const getAllNote = async () => {
      await noteStore.getAllNote();
    };
    getAllNote().then(() => {
      setNote(noteStore.note);
      setNoteMaster(noteStore.master);
    });
    autreStore.getAnnee();
    autreStore.getData();

    // return () => {
    //   second
    // }
  }, []);

  useEffect(() => {
    setNote(noteStore.note);
    setNoteMaster(noteStore.master);

    // return () => {
    //   second
    // }
  }, [noteStore.note, noteStore.master]);

  useEffect(() => {
    setAnnee(autreStore.annee.annee);
    setPeriode(autreStore.allData);
  }, [autreStore.allData, autreStore.annee]);

  const handleChange = (e: any) => {
    const { value } = e.target;
    setSelectedPeriode(value);
    checkFilter(value, "");
  };

  const handleChangeYear = (e: any) => {
    const { value } = e.target;
    setAnnee(value);
    checkFilter("", value);
  };

  const checkFilter = async (per?: string, year?: string) => {
    const data = {
      annees: year !== "" ? year : annees,
      periode: per !== "" ? per : selectedPeriode || periode[0].periode,
    };
    await noteStore.filterNote(data);
  };

  const globalInfoLicence = () => {
    let max = 0;
    let min = 0;
    let avg = 0;
    let totalCount = 0;
    if (note && note?.length !== 0) {
      let emptyArray: any[] = [];
      for (let i = 0; i < note.length; i++) {
        emptyArray.push({
          maxNote: +note[i].maxNote,
          minNote: +note[i].minNote,
          avgNote: +note[i].avgNote,
        });
      }
      const maxNumber: number[] = emptyArray.map((k: any) => k.maxNote);
      const minNumber: number[] = emptyArray.map((k: any) => k.minNote);
      max = Math.max(...maxNumber);
      min = Math.min(...minNumber);
      avg = (max + min) / 2;
      totalCount = note.length
        ? note?.map((k: any) => k.count).reduce((a: any, b: any) => +a + +b, 0)
        : 0;
    }
    const newObject = {
      min,
      max,
      avg,
      totalCount,
    };

    return newObject;
  };

  const globalInfoMaster = () => {
    let max = 0;
    let min = 0;
    let avg = 0;
    let totalCount = 0;
    if (noteMaster.length !== 0) {
      let emptyArray: any[] = [];
      for (let i = 0; i < noteMaster.length; i++) {
        emptyArray.push({
          maxNote: +noteMaster[i].maxNote,
          minNote: +noteMaster[i].minNote,
          avgNote: +noteMaster[i].avgNote,
        });
      }
      const maxNumber: number[] = emptyArray.map((k: any) => k.maxNote);
      const minNumber: number[] = emptyArray.map((k: any) => k.minNote);
      max = Math.max(...maxNumber);
      min = Math.min(...minNumber);
      avg = (max + min) / 2;
      totalCount = noteMaster.length
        ? noteMaster
            ?.map((k: any) => k.count)
            .reduce((a: any, b: any) => +a + +b, 0)
        : 0;
    }
    const newObject = {
      min,
      max,
      avg,
      totalCount,
    };

    return newObject;
  };

  const exampleArray = ["", "", ""];

  return (
    <Box className={classes.boxContainer}>
      <Grid>
        <h2>Statistique générale pour l'année universitaire : {annees}</h2>
        <br />
        <Grid container className={classes.navbar}>
          {periode.length > 0 && (
            <p className={classes.flexText}>
              <b>Période :</b> &nbsp; &nbsp;
              <FormControl variant="outlined" size="small">
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
            </p>
          )}
          <p className={classes.flexText}>
            <b>Année universitaire :</b> &nbsp; &nbsp;
            <FormControl variant="outlined" size="small">
              {/* <InputLabel shrink={true}>Année scolaire</InputLabel> */}
              <Select
                name="sexe"
                value={annees?.annee || annees || ""}
                onChange={handleChangeYear}
              >
                {annee?.map((k: any) => (
                  <MenuItem value={k}>{k}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </p>
        </Grid>
      </Grid>
      <Grid container>
        <Grid container xs={12} md={9} lg={9}>
          <h2>Détails</h2>
          <Grid container className={classes.listContainer}>
            {note.length > 0 ? (
              note?.map((data: DataColumn) => (
                <Grid className={classes.cardContent}>
                  <Card>
                    <CardContent>
                      <li className={classes.listNote}>
                        <u>Niveau :</u> <b>{data._id?.niveau || "Néant"}</b>
                      </li>
                      <li className={classes.listNote}>
                        <u>Nbre étudiants :</u> <b>{data.count} </b>
                      </li>
                      <li className={classes.listNote}>
                        <u>Note max : </u>
                        <b>
                          <span style={{ color: noteColor(data.maxNote) }}>
                            {data.maxNote}
                          </span>
                        </b>
                      </li>
                      <li className={classes.listNote}>
                        <u>Note min : </u>
                        <b>
                          <span style={{ color: noteColor(data.minNote) }}>
                            {data.minNote}
                          </span>
                        </b>
                      </li>
                      <li className={classes.listNote}>
                        <u>Note moy : </u>
                        <b>
                          <span style={{ color: noteColor(data.avgNote) }}>
                            {(+data.avgNote).toFixed(2)}
                          </span>
                        </b>
                      </li>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <></>
            )}
            {note.length === 0 && (
              <>
                {exampleArray?.map((k: any) => (
                  <Grid className={classes.cardContent}>
                    <Card>
                      <CardContent>
                        <li className={classes.listNote}>
                          <u>Niveau :</u> <b>Néant</b>
                        </li>
                        <li className={classes.listNote}>
                          <u>Nbre étudiants :</u> <b>0</b>
                        </li>
                        <li className={classes.listNote}>
                          <u>Note max : </u>
                          <b>
                            <span style={{ color: noteColor("0") }}>0</span>
                          </b>
                        </li>
                        <li className={classes.listNote}>
                          <u>Note min : </u>
                          <b>
                            <span style={{ color: noteColor("0") }}>0</span>
                          </b>
                        </li>
                        <li className={classes.listNote}>
                          <u>Note moy : </u>
                          <b>
                            <span style={{ color: noteColor("0") }}>0</span>
                          </b>
                        </li>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Grid>
        <Grid xs={12} md={3} lg={3}>
          <h2>Global</h2>
          <Grid className={classes.cardContent}>
            <Card>
              <CardContent>
                <li className={classes.listNote}>
                  <u>Niveau :</u> <b>Licence</b>
                </li>
                <li className={classes.listNote}>
                  <u>Nbre étudiants :</u>{" "}
                  <b>{globalInfoLicence().totalCount} </b>
                </li>
                <li className={classes.listNote}>
                  <u>Note max : </u>
                  <b>
                    <span
                      style={{ color: noteColor(`${globalInfoLicence().max}`) }}
                    >
                      {globalInfoLicence().max}
                    </span>
                  </b>
                </li>
                <li className={classes.listNote}>
                  <u>Note min : </u>
                  <b>
                    <span
                      style={{ color: noteColor(`${globalInfoLicence().min}`) }}
                    >
                      {globalInfoLicence().min}
                    </span>
                  </b>
                </li>
                <li className={classes.listNote}>
                  <u>Note moy : </u>
                  <b>
                    <span
                      style={{ color: noteColor(`${globalInfoLicence().avg}`) }}
                    >
                      {globalInfoLicence().avg}
                    </span>
                  </b>
                </li>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <hr />

      <Grid container>
        <Grid xs={12} md={9} lg={9} className={classes.listMasterContainer}>
          {noteMaster.length > 0 ? (
            noteMaster.map((master: DataColumn) => (
              <Grid className={classes.cardContent}>
                <Card>
                  <CardContent>
                    <li className={classes.listNote}>
                      <u>Niveau :</u> <b>{master._id.niveau}</b>
                    </li>
                    <li className={classes.listNote}>
                      <u>Nbre étudiants :</u> <b>{master.count} </b>
                    </li>
                    <li className={classes.listNote}>
                      <u>Note max : </u>
                      <b>
                        <span style={{ color: noteColor(master.maxNote) }}>
                          {master.maxNote}
                        </span>
                      </b>
                    </li>
                    <li className={classes.listNote}>
                      <u>Note min : </u>
                      <b>
                        <span style={{ color: noteColor(master.minNote) }}>
                          {master.minNote}
                        </span>
                      </b>
                    </li>
                    <li className={classes.listNote}>
                      <u>Note moy : </u>
                      <b>
                        <span style={{ color: noteColor(master.avgNote) }}>
                          {master.avgNote}
                        </span>
                      </b>
                    </li>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <></>
          )}
          {noteMaster.length === 0 &&
            exampleArray.map((k: any) => (
              <Grid className={classes.cardContent}>
                <Card>
                  <CardContent>
                    <li className={classes.listNote}>
                      <u>Niveau :</u> <b>Néant</b>
                    </li>
                    <li className={classes.listNote}>
                      <u>Nbre étudiants :</u> <b>0 </b>
                    </li>
                    <li className={classes.listNote}>
                      <u>Note max : </u>
                      <b>
                        <span style={{ color: noteColor("0") }}>0</span>
                      </b>
                    </li>
                    <li className={classes.listNote}>
                      <u>Note min : </u>
                      <b>
                        <span style={{ color: noteColor("0") }}>0</span>
                      </b>
                    </li>
                    <li className={classes.listNote}>
                      <u>Note moy : </u>
                      <b>
                        <span style={{ color: noteColor("0") }}>0</span>
                      </b>
                    </li>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Grid xs={12} md={3} lg={3}>
          <Grid className={classes.cardContent}>
            <Card>
              <CardContent>
                <li className={classes.listNote}>
                  <u>Niveau :</u> <b>Master</b>
                </li>
                <li className={classes.listNote}>
                  <u>Nbre étudiants :</u>{" "}
                  <b>{globalInfoMaster().totalCount} </b>
                </li>
                <li className={classes.listNote}>
                  <u>Note max : </u>
                  <b>
                    <span
                      style={{ color: noteColor(`${globalInfoMaster().max}`) }}
                    >
                      {globalInfoMaster().max}{" "}
                    </span>
                  </b>
                </li>
                <li className={classes.listNote}>
                  <u>Note min : </u>
                  <b>
                    <span
                      style={{ color: noteColor(`${globalInfoMaster().min}`) }}
                    >
                      {globalInfoMaster().min}{" "}
                    </span>
                  </b>
                </li>
                <li className={classes.listNote}>
                  <u>Note moy : </u>
                  <b>
                    <span
                      style={{ color: noteColor(`${globalInfoMaster().avg}`) }}
                    >
                      {globalInfoMaster().avg}{" "}
                    </span>
                  </b>
                </li>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default inject("noteStore", "autreStore")(observer(Statistique));
