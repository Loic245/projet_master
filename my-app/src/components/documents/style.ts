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
    },
    padContainer : {
        padding : '2rem'
    },
    btn : {
        textDecoration : 'none',
        textTransform : 'none',
        backgroundColor : "#f50057 !important",
    },
    addFileContainer : {
        display : 'flex',
        gap : '2rem'
    },
    listFile : {
        backgroundColor : '#e8e3e3',
        display : "flex",
        alignItems : 'center',
        gap : '3rem',
        padding : '0 1rem',
        width : '50%'
    },
    aStyle : {
        textDecoration : 'none',
        color: "#000"
    }
  
  });
  
  export default useStyles;