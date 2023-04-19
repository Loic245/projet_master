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
import useStyles from "./style";

const Communique = () => {
  const hiddenFileInput = useRef<any>({});
  const classes = useStyles();

  useEffect(() => {
    socket.on("receive_message_communique", async (data: any) => {
      setIntoArray(data);
    });
  }, [socket]);

  const [arrayMessage, setArrayMessage] = useState<string[]>([]);
  const [showMessage, setShowMessage] = useState<any>([]);

  useEffect(() => {
    setShowMessage(arrayMessage);
  }, [arrayMessage]);

  const [message, setMessage] = useState("");

  const [selectedFile, setSelectedFile] = useState<any>([]);

  const setIntoArray = async (data: any) => {
    console.log("mandalo ato :", data);
    await arrayMessage.push(data);
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    setMessage(value);
  };

  const sendMessage = async () => {
    if (!message) {
      console.log("tsisy data");
      return;
    }
    console.log("tsy tonga ato izy izany");
    socket.emit("send_message_communique", {
      message: message,
      user: "Rakoto",
      date: "20/03/2023",
    });

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

        await axios
          .post(`${config.baseURL}/upload/${path}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .catch((err: any) => {
            console.log("errorrrr :", err);
          });
        setSelectedFile([]);
      }
    }
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

  console.log("arrayMessage :", arrayMessage);
  console.log("showMessage :", showMessage);

  return (
    <div>
      <Grid container style={{ alignItems: "center" }}>
        <Grid xs={6} sm={6} md={6} lg={6}>
          <TextField
            label="Entrez le message ..."
            variant="standard"
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
      {arrayMessage.map((message: any) => (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {message}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Communique;
