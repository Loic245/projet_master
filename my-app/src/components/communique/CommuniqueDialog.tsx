import { Dialog, DialogActions, Button, DialogContent } from "@mui/material";
import FileViewer from "react-file-viewer";
import config from "../../config";

interface ICommuniqueDialog {
  open: boolean;
  handleClose: () => void;
  type: string;
  path: string;
}

const CommuniqueDialog = (props: any) => {
  const { open, handleClose, type, path } = props as ICommuniqueDialog;
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogContent>
        <FileViewer fileType={type} filePath={path} />
      </DialogContent>
      <DialogActions style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="primary" onClick={handleClose}>
          Fermer
        </Button>
        <a
          href={`${path}`}
          download={path}
          // target="_blank"
          rel="noreferrer"
          // className={classes.aStyle}
        >
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Telecharger
          </Button>
        </a>
      </DialogActions>
    </Dialog>
  );
};

export default CommuniqueDialog;
