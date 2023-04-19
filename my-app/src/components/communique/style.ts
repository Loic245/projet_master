import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    
    test : {
        width : "50%",
        backgroundColor: "#000 !important",
        display: 'none',
        
        '& .MuiPapre-root .MuiPaper-elevation .MuiPaper-rounded .MuiPaper-elevation0 .css-1lebi60-MuiPaper-root':{
            backgroundColor: "#000 !important"
          },
    },
    gridStyled: {
      marginTop: '1rem',
      boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
      padding: '1rem',
      width : '70%',
      background: 'rgba(60, 64, 67, 0.15)'
    }
  
  });
  
  export default useStyles;