import { useEffect, useState, useRef } from "react";
import { socket } from "../../utils";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import config from "../../config";
import moment from "moment";
import useStyles from "./style";
import { inject, observer } from "mobx-react";
import { CommuniqueStoreInterface } from "../../store/communiqueStore";
import DocViewer from "@cyntler/react-doc-viewer";
import FileViewer from "react-file-viewer";

interface IFrontCommunique {
  communiqueStore: CommuniqueStoreInterface;
}

const Communique = (props?: any) => {
  const { communiqueStore } = props as IFrontCommunique;
  const hiddenFileInput = useRef<any>({});
  const classes = useStyles();

  useEffect(() => {
    socket.on("receive_message_communique", async (data: any) => {
      await communiqueStore.getAllCommunique();
    });
  }, [socket]);

  useEffect(() => {
    communiqueStore.getAllCommunique();

    // eslint-disable-next-line no-use-before-define
  }, []);

  const [message, setMessage] = useState("");

  const [selectedFile, setSelectedFile] = useState<any>([]);

  const handleChange = (e: any) => {
    const { value } = e.target;
    setMessage(value);
  };

  const sendMessage = async () => {
    if (!message) {
      return;
    }

    const emptyArray = [];
    if (selectedFile.length !== 0) {
      for (let i = 0; i < selectedFile.length; i++) {
        const formData = new FormData();

        const getTypeFile: string = selectedFile[i].type;

        const extName = getExtName(selectedFile[i].name);

        const name = getName(selectedFile[i].name);

        const fileUploaded = new File([selectedFile[i]], `${name}.${extName}`, {
          type: getTypeFile,
        });

        formData.append("file", fileUploaded);

        const path = "communique";

        const resultUpload = await axios
          .post(`${config.baseURL}/upload/${path}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .catch((err: any) => {
            console.log("errorrrr :", err);
          });
        setSelectedFile([]);

        emptyArray.push({
          id: `${Date.now()}`,
          name: `${name}.${extName}`,
          path: `${path}/${resultUpload?.data?.filename}`,
        });
      }
    }
    socket.emit("send_message_communique", {
      message: message,
      user: "Rakoto",
      date: `${moment().format("DD/MM/YYYY")}`,
      piecejoin: emptyArray,
    });
    setMessage("");
  };

  const getExtName = (FileName: string) => {
    const fileName = FileName.split(".");

    const size = fileName.length;

    return fileName[size - 1];
  };

  const getName = (FileName: string) => {
    const fileName = FileName.split(".");

    const size = fileName.length;

    return fileName[0];
  };

  const handleFileChange = async (e: any) => {
    e.preventDefault();
    setSelectedFile([...selectedFile, e.target.files[0]]);
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const [document, setDocument] = useState<any>([]);
  const getFile = (id: string) => async () => {
    await communiqueStore.getOneFile(id);

    const docs = [
      {
        uri: `${communiqueStore.oneFile.path}`,
      },
    ];
    setDocument(docs);
  };

  const handleClose = () => {
    setDocument([]);
  };

  console.log("communiqueStore.oneFile :", communiqueStore.oneFile);
  return (
    <div>
      <Grid container style={{ alignItems: "center" }}>
        <Grid xs={6} sm={6} md={6} lg={6}>
          <TextField
            label="Entrez le message ..."
            variant="standard"
            value={message}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <div>
          <button
            onClick={handleClick}
            style={{
              borderRadius: "3rem",
              backgroundColor: "#d8d4d4",
              border: "none",
            }}
          >
            <AttachFileIcon />
          </button>
          <input
            type="file"
            onChange={handleFileChange}
            ref={hiddenFileInput}
            style={{ display: "none" }}
          />
        </div>
        <Button onClick={sendMessage} title="Envoyer">
          <SendIcon />
        </Button>
      </Grid>
      {selectedFile.length !== 0 && (
        <Grid className={classes.gridStyled}>
          {selectedFile.map((k: any) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              <LinearProgress
                variant="buffer"
                value={100}
                valueBuffer={100}
                style={{ width: "5rem", marginRight: "2rem" }}
              />{" "}
              {k.name}
            </div>
          ))}
        </Grid>
      )}

      {document.length !== 0 && (
        <div style={{ width: "100%0", height: "200px" }}>
          <FileViewer
            fileType={`${communiqueStore.oneFile.type}`}
            filePath={`${config.baseGetFile}/${communiqueStore.oneFile.path}`}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClose}
            className={classes.closeBtn}
            style={{ textTransform: "none" }}
          >
            Fermer
          </Button>
          <br />
          <br />
        </div>
      )}
      {communiqueStore.listCommunique.map((k: any) => (
        <div className={classes.gridCommunique}>
          <Typography className={classes.typoCommunique}>
            {k.date} &nbsp; {k.user}
          </Typography>
          <Card sx={{ minWidth: 275 }}>
            <CardContent className={classes.communique}>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {k.message} <br />
                {k.piecejoin.map((piece: any) => (
                  <div
                    onClick={getFile(piece.id)}
                    className={classes.clickDownload}
                  >
                    <u>{piece.name}</u>
                  </div>
                ))}
                {/* {communiqueStore.oneFile.path && (
                <a href={`${communiqueStore.oneFile.path}`} download>
                  Click to download
                </a>
              )} */}
              </Typography>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default inject("communiqueStore")(observer(Communique));
