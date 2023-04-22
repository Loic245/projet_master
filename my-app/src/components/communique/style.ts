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
      // boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
      padding: '1rem',
      width : '70%',
      background: 'rgba(60, 64, 67, 0.15)'
    },
    gridCommunique : {
      marginTop : "0.5rem",
      fontSize : "10"
    },
    communique : {
      background : "#fff",
      border : 'solid 0.1rem #dbd9d9',
      borderRadius : "0 0.5rem 0.5rem 0.5rem"
    },
    typoCommunique : {
      width : '30%',
      paddingLeft:'0.5rem',
      fontSize : '12px !important',
      background : "#f50057",
      color:'#fff',
      borderRadius : '0.2rem 0.2rem 0 0'
    },
    clickDownload : {
      cursor: 'pointer',
      color: 'blue'
    },
    closeBtn : {
      float : 'right',
      marginRight : '1rem',
      height: '1rem !important',
      fonstSize : '12px !important',
      width : '2rem !important'
    }
  
  });
  
  export default useStyles;