import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    
    container: {
      height : '22vh',
      width : '100%',
    },
    dataGrid: {
      height : '20vh',
      width : '98%',
      borderRadius : '0.5rem',
      backgroundColor: "#ddd2d2",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '&:hover' : {
        cursor: 'pointer'
      },
      margin: 5
    }
  
  });
  
  export default useStyles;