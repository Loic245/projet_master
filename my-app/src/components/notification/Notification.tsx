import { Card, CardContent, Box, Grid } from "@material-ui/core";
import useStyles from "./style";

const Notification = () => {
  const classes = useStyles();

  return (
    <Box className={classes.boxContainer}>
      <h2>Notifications ...</h2>
      <Grid>
        <div className={classes.dateContainer}>
          &nbsp; &nbsp; &nbsp; 02/02/2023
        </div>
        <Card>
          <CardContent>
            Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les
            années 1500, quand un imprimeur anonyme assembla ensemble des
            morceaux de texte pour réaliser un livre spécimen de polices de
            texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi
            adapté à la bureautique informatique
          </CardContent>
        </Card>
      </Grid>

      <Grid>
        <div className={classes.dateContainer}>
          &nbsp; &nbsp; &nbsp; 02/02/2023
        </div>
        <Card>
          <CardContent>
            Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les
            années 1500, quand un imprimeur anonyme assembla ensemble des
            morceaux de texte pour réaliser un livre spécimen de polices de
            texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi
            adapté à la bureautique informatique
          </CardContent>
        </Card>
      </Grid>

      <Grid>
        <div className={classes.dateContainer}>
          &nbsp; &nbsp; &nbsp; 02/02/2023
        </div>
        <Card>
          <CardContent>
            Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les
            années 1500, quand un imprimeur anonyme assembla ensemble des
            morceaux de texte pour réaliser un livre spécimen de polices de
            texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi
            adapté à la bureautique informatique
          </CardContent>
        </Card>
      </Grid>

      <Grid>
        <div className={classes.dateContainer}>
          &nbsp; &nbsp; &nbsp; 02/02/2023
        </div>
        <Card>
          <CardContent>
            Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les
            années 1500, quand un imprimeur anonyme assembla ensemble des
            morceaux de texte pour réaliser un livre spécimen de polices de
            texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi
            adapté à la bureautique informatique
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
};

export default Notification;
