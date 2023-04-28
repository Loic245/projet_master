import { Dialog, DialogActions, Button, DialogContent } from "@mui/material";
import FileViewer from "react-file-viewer";

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
      </DialogActions>
    </Dialog>
  );
};

export default CommuniqueDialog;
