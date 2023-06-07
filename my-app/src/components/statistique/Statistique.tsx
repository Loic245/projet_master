import { Box, Grid, Card, CardContent } from "@material-ui/core";
import useStyles from "./style";

interface DataColumn {
  niveau: string;
  nbrEtudiant: string;
  noteMax: string;
  noteMin: string;
  avg: string;
}

const licenceColumn: DataColumn[] = [
  {
    niveau: "Licence 1",
    nbrEtudiant: "50",
    noteMax: "17",
    noteMin: "08",
    avg: "13.5",
  },
  {
    niveau: "Licence 2",
    nbrEtudiant: "40",
    noteMax: "16",
    noteMin: "07",
    avg: "12",
  },
  {
    niveau: "Licence 3",
    nbrEtudiant: "30",
    noteMax: "15",
    noteMin: "05",
    avg: "10",
  },
];

const masterColumn: DataColumn[] = [
  {
    niveau: "Master I",
    nbrEtudiant: "50",
    noteMax: "17",
    noteMin: "08",
    avg: "13.5",
  },
  {
    niveau: "Master II",
    nbrEtudiant: "40",
    noteMax: "16",
    noteMin: "07",
    avg: "12",
  },
];

const Statistique = () => {
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

  return (
    <Box className={classes.boxContainer}>
      <Grid>
        <h2>Statistique générale pour l'année universitaire : 2022 - 2023</h2>
        <br />
        <Grid container className={classes.navbar}>
          <p>
            <b>Période :</b> Semestre-1{" "}
          </p>
          <p>
            <b>Année universitaire :</b> 2022-2023
          </p>
        </Grid>
      </Grid>
      <Grid container>
        <Grid container xs={12} md={9} lg={9}>
          <h2>Détails</h2>
          <Grid container className={classes.listContainer}>
            {licenceColumn.map((data: DataColumn) => (
              <Grid className={classes.cardContent}>
                <Card>
                  <CardContent>
                    <li className={classes.listNote}>
                      <u>Niveau :</u> <b>{data.niveau}</b>
                    </li>
                    <li className={classes.listNote}>
                      <u>Nbre étudiants :</u> <b>{data.nbrEtudiant} </b>
                    </li>
                    <li className={classes.listNote}>
                      <u>Note max : </u>
                      <b>
                        <span style={{ color: noteColor(data.noteMax) }}>
                          {data.noteMax}
                        </span>
                      </b>
                    </li>
                    <li className={classes.listNote}>
                      <u>Note min : </u>
                      <b>
                        <span style={{ color: noteColor(data.noteMin) }}>
                          {data.noteMin}
                        </span>
                      </b>
                    </li>
                    <li className={classes.listNote}>
                      <u>Note moy : </u>
                      <b>
                        <span style={{ color: noteColor(data.avg) }}>
                          {data.avg}
                        </span>
                      </b>
                    </li>
                  </CardContent>
                </Card>
              </Grid>
            ))}
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
                  <u>Nbre étudiants :</u> <b>120 </b>
                </li>
                <li className={classes.listNote}>
                  <u>Note max : </u>
                  <b>
                    <span style={{ color: noteColor("17") }}>17</span>
                  </b>
                </li>
                <li className={classes.listNote}>
                  <u>Note min : </u>
                  <b>
                    <span style={{ color: noteColor("05") }}>05</span>
                  </b>
                </li>
                <li className={classes.listNote}>
                  <u>Note moy : </u>
                  <b>
                    <span style={{ color: noteColor("08.5") }}>08.5</span>
                  </b>
                </li>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <hr />

      <Grid container>
        {/* <Grid> */}
        <Grid xs={12} md={9} lg={9} className={classes.listMasterContainer}>
          {masterColumn.map((master: DataColumn) => (
            <Grid className={classes.cardContent}>
              <Card>
                <CardContent>
                  <li className={classes.listNote}>
                    <u>Niveau :</u> <b>{master.niveau}</b>
                  </li>
                  <li className={classes.listNote}>
                    <u>Nbre étudiants :</u> <b>{master.nbrEtudiant} </b>
                  </li>
                  <li className={classes.listNote}>
                    <u>Note max : </u>
                    <b>
                      <span style={{ color: noteColor(master.noteMax) }}>
                        {master.noteMax}
                      </span>
                    </b>
                  </li>
                  <li className={classes.listNote}>
                    <u>Note min : </u>
                    <b>
                      <span style={{ color: noteColor(master.noteMin) }}>
                        {master.noteMin}
                      </span>
                    </b>
                  </li>
                  <li className={classes.listNote}>
                    <u>Note moy : </u>
                    <b>
                      <span style={{ color: noteColor(master.avg) }}>
                        {master.avg}
                      </span>
                    </b>
                  </li>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* </Grid> */}
        <Grid xs={12} md={3} lg={3}>
          <Grid className={classes.cardContent}>
            <Card>
              <CardContent>
                <li className={classes.listNote}>
                  <u>Niveau :</u> <b>Master</b>
                </li>
                <li className={classes.listNote}>
                  <u>Nbre étudiants :</u> <b>90 </b>
                </li>
                <li className={classes.listNote}>
                  <u>Note max : </u>
                  <b>
                    <span style={{ color: noteColor("17") }}>17</span>
                  </b>
                </li>
                <li className={classes.listNote}>
                  <u>Note min : </u>
                  <b>
                    <span style={{ color: noteColor("07") }}>07</span>
                  </b>
                </li>
                <li className={classes.listNote}>
                  <u>Note moy : </u>
                  <b>
                    <span style={{ color: noteColor("08.5") }}>13</span>
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

export default Statistique;
