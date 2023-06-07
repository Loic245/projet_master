import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    
    gridContainer : {
        // justifyContent: "space-around",
        gap : '2rem',
        alignItems : 'center'       
    },
    gridContent : {
        gap : '2rem',
        alignContent : "center",
        padding : '0.5rem',
        width : '150px',
        "&:hover" : {
            cursor: "pointer",
            backgroundColor : "#94ced3",
            borderRadius : '0.5rem'
        }
    },
    text : {
        textAlign : 'center',
        fontWeight : 'bold',
    }
  
  });
  
  export default useStyles;