import { Card, CardContent, Box, Grid } from "@material-ui/core";
import useStyles from "./style";
import { INotificationInterface } from "../../store/notification";
import { inject, observer } from "mobx-react";
import { useEffect, useState } from "react";

interface INotification {
  notificationStore: INotificationInterface;
}

const Notification = (props: any) => {
  const { notificationStore } = props as INotification;

  const [notification, setNotification] = useState<any[]>([]);

  useEffect(() => {
    const getNotification = async () => {
      await notificationStore.getNotification();
    };
    getNotification().then(() =>
      setNotification(notificationStore.notification)
    );
  }, []);

  const classes = useStyles();

  return (
    <Box className={classes.boxContainer}>
      <h2>Notifications ...</h2>

      {notification.length !== 0 &&
        notification.map((k: any) => (
          <Grid>
            <div className={classes.dateContainer}>
              &nbsp; &nbsp; &nbsp; {k.date}
            </div>
            <Card>
              <CardContent>{k.message}</CardContent>
            </Card>
          </Grid>
        ))}

      {/* <Grid>
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
      </Grid> */}
    </Box>
  );
};

export default inject("notificationStore")(observer(Notification));
