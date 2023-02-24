import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    
    container: {
        display:'flex',
        justifyContent: 'space-around'
    },
    inputClasses: {
        width: '90%'
    },
    boxContainer: {
        marginTop: '3rem'
    },
    button : {
        backgroundColor: "#f50057",
        color: "#ffffff",
        fontWeight: "lighter",
        margin: '2rem 0.5rem'
    },
    validation: {
        display: 'flex',
        justifyContent: 'center'
    }
  
  });
  
  export default useStyles;