import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    
    dataGrid: {
      height: "75vh",
      width: "100%",
      "& .MuiDataGrid-root": {
        border: "unset",
      },
    },
    resultatVide: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '10rem'
    }
  
  });
  
  export default useStyles;