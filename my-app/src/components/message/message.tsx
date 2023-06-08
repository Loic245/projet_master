import { Box, Grid, Card, CardContent, TextField } from "@material-ui/core";
import useStyles from "./style";
import { inject, observer } from "mobx-react";
import { UserStoreInterface } from "../../store/userStore";
import { useEffect, useState } from "react";
import person from "../../assets/person_icon.png";
import config from "../../config";
import SendIcon from "@mui/icons-material/Send";
import { MessageStoreInterface } from "../../store/messageStore";
import moment from "moment";
import { socket } from "../../utils";

interface IMessage {
  userStore: UserStoreInterface;
  messageStore: MessageStoreInterface;
}

const Message = (props: any) => {
  const { userStore, messageStore } = props as IMessage;

  useEffect(() => {
    userStore.getAllUser();
    messageStore.getAllMessage(`${userStore.user.matricule}`);

    // return () => {
    //   second
    // }
  }, []);

  useEffect(() => {
    // afterEffectFunction();
    messageStore.getAllMessage(`${userStore.user.matricule}`);
    setAllMessage(
      messageStore.allMessage.filter(
        (k: any) => k.destinataire !== `${userStore.user.matricule}`
      )
    );
  }, [userStore.user]);

  useEffect(() => {
    const allUser = userStore.allUser.filter(
      (k: any) => k.matricule !== userStore.user.matricule
    );
    setUser(allUser);

    setAllMessage(
      messageStore.allMessage.filter(
        (k: any) => k.destinataire !== `${userStore.user.matricule}`
      )
    );
    // return () => {
    //   setUser([]);
    // };
  }, [userStore.user, messageStore.allMessage]);

  const [user, setUser] = useState<any>();
  const [oneUser, setOneUser] = useState<any>();
  const [allMessage, setAllMessage] = useState<any>();
  const [messageSend, setMessageSend] = useState<any>();
  const [listDiscussion, setListDiscussion] = useState<any>();

  useEffect(() => {
    socket.on("receive_message", async (data: any) => {
      await messageStore.getAllMessage(`${userStore.user.matricule}`);
      await messageStore.getOneMessage({
        source: data.source,
        destinataire: data.destinataire,
      });
      setListDiscussion(messageStore.oneMessageData);
    });
  }, [socket]);

  const classes = useStyles();

  const handleChooseUser = (matricule: string) => async () => {
    await messageStore.getOneMessage({
      source: userStore.user.matricule,
      destinataire: matricule,
    });
    setListDiscussion(messageStore.oneMessageData);
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

      // set list discussion
      await messageStore.getOneMessage({
        source: userStore.user.matricule,
        destinataire: messageSend.destinataire,
      });
      setListDiscussion(messageStore.oneMessageData);
      // set list discussion

      // set list message
      await messageStore.getAllMessage(userStore.user.matricule);
      setAllMessage(
        messageStore.allMessage.filter(
          (k: any) => k.destinataire !== `${userStore.user.matricule}`
        )
      );
      // set list message

      // socket configuration
      socket.emit("send_message", {
        ...messageSend,
        message,
        date: moment().format("DD/MM/YYYY"),
      });
      // socket configuration
      setMessage("");
    }
  };

  const handleEnterKey = (e: KeyboardEvent | any) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      sendMessage(e);
    }
  };

  console.log("allMessage :", allMessage);
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
          {allMessage
            ? allMessage.map((message: any) => (
                <Grid
                  className={classes.listContainer}
                  onClick={handleChooseUser(message.destinataire)}
                >
                  <span>
                    <img
                      src={
                        message.user[0].image
                          ? `${config.baseGetFile}${message.user[0].image}`
                          : person
                      }
                      alt="profile_photo"
                      width={40}
                      height={40}
                    />
                  </span>
                  <p>{message.user[0].nom}</p>
                  {/* <p>{`${message.message.substring(0, 50)} ...`}</p> */}
                </Grid>
              ))
            : "text"}
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
                  {listDiscussion &&
                    listDiscussion.map((text: any) => (
                      <p
                        className={
                          text.user[0].matricule === userStore.user.matricule
                            ? classes.messageTextInComing
                            : classes.localMessage
                        }
                      >
                        {text.message}
                      </p>
                    ))}
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
