import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    
    dataGrid: {
      height: "75vh",
      width: "100%",
      "& .MuiDataGrid-root": {
        border: "unset",
      },
    },
    container: {
        display: 'flex',
        height: "5rem",
        paddingLeft: '1rem',
        alignItems: 'center'
    },
    button : {
        backgroundColor: "#f50057",
        color: "#ffffff",
        fontWeight: "lighter",
        margin: '0 1rem'
    }
  
  });
  
  export default useStyles;