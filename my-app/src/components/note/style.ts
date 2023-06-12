import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    
    BoxContainer : {
        padding : '2rem'
    },
    boxFlexContainer : {
        display : 'flex',
        aligntItems : 'center',
        gap : '2rem'
    },
    boxJustify : {
        display : 'flex',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    styleText : {
        textAlign: 'right'
    },
    listeComponent : {
        height : '70vh',
        overflowY : 'scroll'
    },
    p : {
        fontWeight : "bold"
    }
  
  });
  
  export default useStyles;