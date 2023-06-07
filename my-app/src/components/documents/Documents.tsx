import folder from "../../assets/folder.png";
import { Grid, Box } from "@mui/material";
import useStyles from "./style";

const data = [
  "Condition d'utilisation",
  "Guide d'utilisation de l'application",
  "Lettre d'introduction",
  "Règles de l'établissement",
  "A propos de l'établissement",
  "Calendrier de paiement de frais de scolarité",
  "Calendrier d'examen",
  "Emploi du temps",
  "Note",
];

const Documents = () => {
  const classes = useStyles();

  return (
    <Box>
      <Grid container className={classes.gridContainer}>
        {data.map((k: any) => (
          <Grid className={classes.gridContent}>
            <center>
              <img src={folder} alt="folder_icon" width={100} height={100} />
            </center>
            <p className={classes.text}>{k}</p>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Documents;
