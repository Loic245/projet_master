import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    
    navbar : {
        display: "flex",
        justifyContent : "space-between",
        gap : "2rem"
    },
    boxContainer : {
        padding: '2rem',
        backgroundColor: "#e8e3e3",
        height : '100%'
    },
    cardContent : {
        width : "230px"
    },
    listContainer : {
        display : "flex",
        justifyContent : 'space-around',
        borderRight : 'solid 2px #000'
    },
    listNote : {
        display : "flex",
        justifyContent : 'space-between'
    },
    listMasterContainer : {
        display : "flex",
        justifyContent : "flex-start",
        gap : '1rem',
        // borderRight : 'solid 2px #000'
    },
    generalMaster : {
        borderLeft : 'solid 2px #000'
    }
  
  });
  
  export default useStyles;