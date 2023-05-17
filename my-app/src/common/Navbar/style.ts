import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    
    menuList: {
        backgroundColor : '#fff',
        '&:hover' : {
            fontWeight : 'bold',
            backgroundColor : '#aeaeae',
            transform : 'scale(1.1)',
            transition : 'all .2s ease-in-out'
        }
    },
  
  });
  
  export default useStyles;