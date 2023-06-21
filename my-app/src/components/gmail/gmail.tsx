import React, { useRef, useState } from "react";
import { Button, TextField, Grid } from "@material-ui/core";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const Gmail = () => {
  const hiddenFileInput = useRef<any>({});

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const [selectedFile, setSelectedFile] = useState<any>([]);

  const handleFileChange = async (e: any) => {
    e.preventDefault();
    setSelectedFile([...selectedFile, e.target.files[0]]);
  };

  return (
    <div>
      <h1>
        &nbsp; &nbsp; Nouveau message &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <span>
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
        </span>{" "}
        &nbsp; &nbsp;
        <Button variant="contained" size="small">
          Envoyer
        </Button>
      </h1>
      <Grid xs={12} sm={12} md={6} style={{ padding: "0 2rem" }}>
        <label>
          {" "}
          <b>De :</b> Plateformescolaire@gmail.com{" "}
        </label>
        <br />
        <br />
        <TextField
          variant="standard"
          placeholder="A"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />{" "}
        <br />
        <br />
        <TextField
          variant="standard"
          placeholder="Objet"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />{" "}
        <br />
        <br />
        <TextField
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          placeholder="Rédigez votre message"
          multiline
          rows={15}
          maxRows={20}
          fullWidth
        />
      </Grid>
    </div>
  );
};

export default Gmail;
