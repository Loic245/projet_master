import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    
    textfield : {
        color: "#fff",
        border: "solid 2px #fff",
        borderRadius: "4px",
        
    },
    interne : {
        '&:placeholder' : {
            color : "blue"
        }
    }
  
  });
  
  export default useStyles;