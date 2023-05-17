import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    
    imageLogo: {
      height : '150px',
      width : '150px',
      borderRadius : '50%'
    },
    info : {
        display: 'flex',
        gap : '10px',
        alignItems: 'center'
    },
    container : {
        padding : '1rem 2rem'
    },
    image : {
        height : '250px',
        width : '100%',
        borderRadius : '2rem'
    }
  
  });
  
  export default useStyles;