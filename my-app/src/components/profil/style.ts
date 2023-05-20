import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    
    image: {
      height : '150px',
      width : '150px',
      borderRadius : '50%'
    },
    conteneur : {
        padding : '2rem'
    },
    list : {
        width : '300px'
    },
    btnSubmit : {
      textTransform : "none",
      background : "#000",
      color: "#fff",
      '&:hover' : {
        background : "blue",
      }
    },
    imageBtn : {
      alignItems : "center",
      justifyContent : "space-between"
    },
    listContainer : {
      display : "flex",
      gap : "1.5rem"
    },
    uploadCountour : {
      padding : "2rem",
      border : "dotted 2px black",
      borderRadius : "50%"
  },
  btnUpload : {
      backgroundColor: "transparent",
      border: "none",
      '&:hover' : {
          cursor : "pointer"
      },
  },
  viewImage : {
      width : '100px',
      height : '100px',
  },
  
  });
  
  export default useStyles;