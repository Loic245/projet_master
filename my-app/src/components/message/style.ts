import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    
    boxContainer : {
        padding: '2rem',
        backgroundColor: "#e8e3e3",
        height : '100%'
    },
    nowrapContainer : {
        display : 'flex',
        flexWrap : 'nowrap',
        marginBottom : '1rem',
        gap : 5
    },
    userContainer : {
        width : '5rem',
        overflow : 'hidden',
        textAlign : 'center',
        fontSize : '10px',
        paddingBottom : '0.5rem',
        "&:hover" : {
            cursor : "pointer"
        }
    },
    listContainer : {
        display : "flex",
        // alignItems: 'center',
        width : '90%',
        gap : 5,
        borderRadius : '0.2rem',
        padding : '0.5rem',
        backgroundColor : "#fff",
        marginBottom : '0.5rem',
        "&:hover" : {
            cursor : "pointer",
            backgroundColor : "#e8e3e3",
            border: 'dotted 2px #fff',
        }
    },
    userListContainer : {
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        textALign : "center",
        fontSize : '10px'
    },
    cardContainer : {
        height : '75vh'
    },
    messageCardHeader : {
        display : 'flex',
        alignItems : 'center',
        gap : '2rem'
    },
    messageTextInComing : {
        padding : '0.5rem',
        borderRadius : '8px 8px 8px 0',
        backgroundColor : '#e8e3e3',
        width : '80%',
    },
    localMessage : {
        padding : '0.5rem',
        borderRadius : '8px 8px 0 8px',
        backgroundColor : '#8dc3e0',
        width : '80%',
        position : 'relative',
        right : '0 !important',
        marginLeft : 0
    },
    messageContainer : {
        height : '50vh',
        overflowY: 'scroll',
    },
    sendBtn : {
        display : 'flex',
        alignItems : 'center',
        padding : '0.5rem 0',
        gap : '1rem'
    },
    textMessage : {
        width : '85%',
    },
    scrollComponent : {
        height : '75vh',
        overflowY : 'scroll'
    }
  
  });
  
  export default useStyles;