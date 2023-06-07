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
    },
    columnContainer : {
      display : 'flex',
      justifyContent : 'space-around',
      flexWrap : 'wrap',
      gap : '1rem',
      marginTop : '4rem',
    },
    cardStyle : {
      textAlign : 'center',
      fontWeight : 'bold',
      height : '8rem',
      "&:hover" : {
        color : "black",
        background : "#aeaeae",
        cursor : "pointer",
        transform : "scale(1.1)",
        transition : "all 0.4s ease-in-out"
      }
    },
    welcomeText : {
      margin : '2rem 0'
    }
  
  });
  
  export default useStyles;