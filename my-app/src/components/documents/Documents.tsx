import folder from "../../assets/folder.png";
import {
  Grid,
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Alert,
  Snackbar,
} from "@mui/material";
import useStyles from "./style";
import { useEffect, useRef, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import axios from "axios";
import config from "../../config";
import moment from "moment";
import { inject, observer } from "mobx-react";
import { DocumentStoreInterface } from "../../store/documentStore";
import { UserStoreInterface } from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import { NiveauStoreInterface } from "../../store/niveauStore";
import { NoteStoreInterface } from "../../store/noteStore";

interface IDocument {
  documentStore: DocumentStoreInterface;
  userStore: UserStoreInterface;
  niveauStore: NiveauStoreInterface;
  noteStore: NoteStoreInterface;
}

const Documents = (props: any) => {
  const { documentStore, userStore, niveauStore, noteStore } =
    props as IDocument;
  const classes = useStyles();

  const hiddenFileInput = useRef<any>({});

  useEffect(() => {
    const awaitFunction = async () => {
      await documentStore.getAllDocument();
    };
    awaitFunction();
    setDocument(documentStore.allDocument);
    niveauStore.getNiveau();
    userStore.getOneUserData();
  }, []);

  useEffect(() => {
    setDocument(documentStore.allDocument);
  }, [documentStore.allDocument]);

  const [selectedFile, setSelectedFile] = useState<any>([]);
  const [fileNames, setFileNames] = useState("");
  const [document, setDocument] = useState<any>([]);
  const [openNote, setOpenNote] = useState(false);
  const [defaultNiveau, setDefaultNiveau] = useState(userStore.profil.niveau);
  const [niveau, setNiveau] = useState([]);

  useEffect(() => {
    setNiveau(niveauStore?.listNiveau);
    setDefaultNiveau(userStore.profil.niveau);
  }, [niveauStore?.listNiveau, userStore.profil]);

  const handleClick = () => {
    if (selectedFile.length !== 0) {
      return;
    }
    hiddenFileInput.current.click();
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    setFileNames(value);
  };

  const handleFileChange = async (e: any) => {
    e.preventDefault();
    setSelectedFile([...selectedFile, e.target.files[0]]);
  };

  const getExtName = (FileName: string) => {
    const fileName = FileName.split(".");

    const size = fileName.length;

    return fileName[size - 1];
  };

  const getName = (FileName: string) => {
    const fileName = FileName.split(".");

    return fileName[0];
  };

  const handleNewDocument = async (e: any) => {
    if (selectedFile.length === 0 || fileNames === "") {
      return;
    }

    const formData = new FormData();

    const getTypeFile: string = selectedFile[0].type;

    const extName = getExtName(selectedFile[0].name);

    const name = getName(selectedFile[0].name);

    const fileUploaded = new File([selectedFile[0]], `${name}.${extName}`, {
      type: getTypeFile,
    });

    formData.append("file", fileUploaded);

    const path = "documents";

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
    setFileNames("");

    await documentStore.saveDocument({
      date: moment().format("DD/MM/YYYY"),
      name: `${fileNames}`,
      url: `/${path}/${resultUpload?.data?.filename}`,
    });
  };

  const history = useNavigate();
  const seeNote = async () => {
    if (userStore.user.role === "PROF") {
      history("/note");
    }

    if (userStore.user.role === "ETUDIANT") {
      // await userStore.getOneUserData();
      openDownloadNote();
    }
  };

  const openDownloadNote = () => {
    setOpenNote(true);
  };

  const handleChangeNiveau = (e: any) => {
    setDefaultNiveau(e.target.value);
  };

  let niv;
  const downloadNote = async () => {
    // await userStore.getOneUserData();
    await noteStore.getOneNote(
      userStore.profil,
      (niv = defaultNiveau ? defaultNiveau : userStore.profil.niveau)
    );
    setDefaultNiveau(userStore.profil.niveau);
    setOpenNote(false);
  };

  return (
    <Box className={classes.padContainer}>
      {userStore.user.role === "ADMIN" && (
        <Grid container className={classes.addFileContainer}>
          <TextField
            placeholder="Entrez votre document ici . . ."
            variant="standard"
            value={fileNames}
            onChange={handleChange}
          />

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
          <Button
            variant="contained"
            className={classes.btn}
            onClick={handleNewDocument}
          >
            Ajouter
          </Button>
        </Grid>
      )}
      <Grid>
        {selectedFile &&
          selectedFile.map((k: any) => (
            <span className={classes.listFile}>
              <img src={folder} alt="folder_icon" width={30} height={30} />
              {k.name}
            </span>
          ))}
      </Grid>
      <Grid container className={classes.gridContainer}>
        {document.length > 0 ? (
          <>
            {document.map((k: any) => (
              <a
                href={`${config.baseGetFile}${k.url}`}
                download={k.name}
                // target="_blank"
                rel="noreferrer"
                className={classes.aStyle}
              >
                <Grid className={classes.gridContent}>
                  <center>
                    <img
                      src={folder}
                      alt="folder_icon"
                      width={100}
                      height={100}
                    />
                  </center>
                  <p className={classes.text}>{k.name}</p>
                </Grid>
              </a>
            ))}
            {userStore.user.role !== "ADMIN" && (
              <Grid className={classes.gridContent} onClick={seeNote}>
                <center>
                  <img
                    src={folder}
                    alt="folder_icon"
                    width={100}
                    height={100}
                  />
                </center>
                <p className={classes.text}>Note</p>
              </Grid>
            )}
          </>
        ) : (
          <></>
        )}
      </Grid>

      <Dialog open={openNote} onClose={() => setOpenNote(false)} maxWidth="xs">
        <DialogContent>
          {niveau && (
            <FormControl variant="standard" fullWidth={true}>
              <InputLabel shrink={true}>Séléctionnez un niveau</InputLabel>
              <Select
                name="niveau"
                value={defaultNiveau || userStore.profil.niveau}
                onChange={handleChangeNiveau}
              >
                {niveau.map((k: any) => (
                  <MenuItem value={`${k.code}`}>{k.niveau}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={downloadNote}>
            valider
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={noteStore.hasNote}
        autoHideDuration={4000}
        style={{ position: "absolute", left: "30%", right: "30%" }}
      >
        <Alert severity="error">il n'y a pas encore de note</Alert>
      </Snackbar>
    </Box>
  );
};

export default inject(
  "documentStore",
  "userStore",
  "niveauStore",
  "noteStore"
)(observer(Documents));
