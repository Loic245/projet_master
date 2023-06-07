import { Box, Grid, Card, CardContent, TextField } from "@material-ui/core";
import useStyles from "./style";
import { inject, observer } from "mobx-react";
import { UserStoreInterface } from "../../store/userStore";
import { useEffect, useState } from "react";
import person from "../../assets/person_icon.png";
import config from "../../config";
import SendIcon from "@mui/icons-material/Send";
import { MessageStoreInterface } from "../../store/messageStore";
import users from "../users/users";
import moment from "moment";

interface IMessage {
  userStore: UserStoreInterface;
  messageStore: MessageStoreInterface;
}

const Message = (props: any) => {
  const { userStore, messageStore } = props as IMessage;

  useEffect(() => {
    userStore.getAllUser();
    messageStore.getAllMessage(userStore.user.matricule);

    // return () => {
    //   second
    // }
  }, []);

  useEffect(() => {
    const allUser = userStore.allUser.filter(
      (k: any) => k.matricule !== userStore.user.matricule
    );
    setUser(allUser);

    setAllMessage(messageStore.allMessage);
    // return () => {
    //   setUser([]);
    // };
  }, [userStore.user, messageStore.allMessage]);

  const [user, setUser] = useState<any>();
  const [oneUser, setOneUser] = useState<any>();
  const [allMessage, setAllMessage] = useState<any>();
  const [messageSend, setMessageSend] = useState<any>();

  const classes = useStyles();

  const handleChooseUser = (matricule: string) => () => {
    const selected = user.filter((k: any) => k.matricule === matricule);
    if (selected) {
      setMessageSend({
        ...messageSend,
        source: userStore.user.matricule,
        destinataire: matricule,
      });
      setOneUser(selected[0]);
    }
  };

  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setMessage(value);
  };

  const sendMessage = async (e: any) => {
    if (message !== "") {
      setMessageSend({
        ...messageSend,
        message,
        date: moment().format("DD/MM/YYYY"),
      });
      await messageStore.newMessage({
        data: { ...messageSend, message, date: moment().format("DD/MM/YYYY") },
      });
      setMessage("");
    }
  };

  const handleEnterKey = (e: KeyboardEvent | any) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      sendMessage(e);
    }
  };

  console.log("allMessage :", allMessage);

  const onlyText =
    "Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussiadapté à la bureautique informatique";

  return (
    <Box className={classes.boxContainer}>
      <h2>Messages ...</h2>
      {user && (
        <Grid className={classes.nowrapContainer}>
          {user.map((k: any) => (
            <span
              className={classes.userContainer}
              onClick={handleChooseUser(k.matricule)}
            >
              <img
                src={k.image ? `${config.baseGetFile}${k.image}` : person}
                alt="profile_photo"
                width={70}
                height={70}
              />
              {k.nom}
            </span>
          ))}
        </Grid>
      )}

      <hr />

      <Grid container>
        <Grid xs={12} sm={12} md={8} lg={8} className={classes.scrollComponent}>
          <Grid
            className={classes.listContainer}
            onClick={handleChooseUser("002")}
          >
            <span className={classes.userListContainer}>
              <img
                src={
                  userStore.user.image
                    ? `${config.baseGetFile}${userStore.user.image}`
                    : person
                }
                alt="profile_photo"
                width={40}
                height={40}
              />
              <p>{userStore.user.nom}</p>
            </span>
            <p style={{ float: "right" }}>{`${onlyText.substring(
              0,
              50
            )} ...`}</p>
          </Grid>

          <Grid className={classes.listContainer}>
            <span className={classes.userListContainer}>
              <img
                src={
                  userStore.user.image
                    ? `${config.baseGetFile}${userStore.user.image}`
                    : person
                }
                alt="profile_photo"
                width={40}
                height={40}
              />
              <p>{userStore.user.nom}</p>
            </span>
            <p style={{ float: "right" }}>{`${onlyText.substring(
              0,
              50
            )} ...`}</p>
          </Grid>

          <Grid className={classes.listContainer}>
            <span className={classes.userListContainer}>
              <img
                src={
                  userStore.user.image
                    ? `${config.baseGetFile}${userStore.user.image}`
                    : person
                }
                alt="profile_photo"
                width={40}
                height={40}
              />
              <p>{userStore.user.nom}</p>
            </span>
            <p style={{ float: "right" }}>{`${onlyText.substring(
              0,
              50
            )} ...`}</p>
          </Grid>
          <Grid className={classes.listContainer}>
            <span className={classes.userListContainer}>
              <img
                src={
                  userStore.user.image
                    ? `${config.baseGetFile}${userStore.user.image}`
                    : person
                }
                alt="profile_photo"
                width={40}
                height={40}
              />
              <p>{userStore.user.nom}</p>
            </span>
            <p style={{ float: "right" }}>{`${onlyText.substring(
              0,
              50
            )} ...`}</p>
          </Grid>
          <Grid className={classes.listContainer}>
            <span className={classes.userListContainer}>
              <img
                src={
                  userStore.user.image
                    ? `${config.baseGetFile}${userStore.user.image}`
                    : person
                }
                alt="profile_photo"
                width={40}
                height={40}
              />
              <p>{userStore.user.nom}</p>
            </span>
            <p style={{ float: "right" }}>{`${onlyText.substring(
              0,
              50
            )} ...`}</p>
          </Grid>
          <Grid className={classes.listContainer}>
            <span className={classes.userListContainer}>
              <img
                src={
                  userStore.user.image
                    ? `${config.baseGetFile}${userStore.user.image}`
                    : person
                }
                alt="profile_photo"
                width={40}
                height={40}
              />
              <p>{userStore.user.nom}</p>
            </span>
            <p style={{ float: "right" }}>{`${onlyText.substring(
              0,
              50
            )} ...`}</p>
          </Grid>
        </Grid>
        <Grid xs={12} sm={12} md={4} lg={4}>
          {oneUser && (
            <Card className={classes.cardContainer}>
              <CardContent>
                <span className={classes.messageCardHeader}>
                  <img
                    src={
                      oneUser.image
                        ? `${config.baseGetFile}${oneUser.image}`
                        : person
                    }
                    alt="profile_photo"
                    width={40}
                    height={40}
                  />
                  <p>
                    <b>{oneUser.nom}</b>
                  </p>
                </span>
                <hr />
                <Grid className={classes.messageContainer}>
                  <p className={classes.localMessage}>some text</p>
                  <p className={classes.localMessage}>some text</p>
                  <p className={classes.messageTextInComing}>some text</p>
                  <p className={classes.localMessage}>some text</p>
                  <p className={classes.messageTextInComing}>some text</p>
                  <p className={classes.localMessage}>some text</p>
                  <p className={classes.messageTextInComing}>some text</p>
                </Grid>
                <hr />
                <Grid container className={classes.sendBtn}>
                  <TextField
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    placeholder="Message . . ."
                    className={classes.textMessage}
                    onKeyPress={handleEnterKey}
                    value={message}
                    onChange={handleChange}
                  />
                  <SendIcon style={{ color: "blue" }} onClick={sendMessage} />
                </Grid>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default inject("userStore", "messageStore")(observer(Message));
