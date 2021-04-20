import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles((theme) => ({
    msg: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#F9CF00',
        marginLeft: '5%',
        marginRight: '5%',
    },
    fontSize: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '2rem',
        },
    },
    profile: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: '3%',
        fontSize: '1.5rem'
    },
    currentProfileDiv: {
        marginLeft: '3%',
    },
    currentProfile: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: '3%',
        paddingBottom: '3%',
    },
    editform: {
        marginTop: '2%',
        marginLeft: '3%',
    },
    editInput: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '3%',
    },
}));




function ShowProfile(props) {
    const classes = useStyles();

    

    const [currentZipcode, setCurrentZipcode] = React.useState('true')
    const[currentBtn, setCurrentBtn] = React.useState('EDIT')

    function handleClick(e) {
        console.log('im clicking current btn')
        setCurrentZipcode(!currentZipcode)
        setCurrentBtn('SUBMIT')
    }


    return (
        <div>
            <Box className={classes.profile}>
                {currentBtn === 'EDIT' ? 
                    (currentZipcode &&
                        <div className={classes.currentProfileDiv}>
                            <div className={classes.currentProfile}><label>username:</label>{props.currentUser.username}</div>
                            <div className={classes.currentProfile}><label>zipcode:</label>{props.currentUser.zipcode}</div>
                        </div>
                    )
                    :
                    <form className={classes.editform}>
                        {!currentZipcode && 
                        <div>
                            <TextField className={classes.editInput} id="standard-search" name="username" label="username" value={props.currentUser.username} onChange={props.handleChange} />
                            <TextField className={classes.editInput} id="standard-search" name="zipcode" label="zipcode" value={props.currentUser.zipcode} onChange={props.handleChange} />
                        </div>
                        }
                    </form>
                }
             </Box>
            <Button 
                className={classes.editform} 
                variant="contained" 
                color="primary" 
                onClick={currentBtn === 'EDIT' ? handleClick : props.updateUser}
            >{currentBtn}
            </Button>
            <Button className={classes.editform} variant="outlined" color="primary" onClick={props.deleteUser}>Delete Account</Button>
        </div>
    )
}

function Profile(props) {
    // console.log(props)
    const classes = useStyles();

    return (
        <div>
            <Box className={classes.msg} maxWidth="xl"><p className={classes.fontSize}>Profile</p></Box>
            <ShowProfile currentUser={props.currentUser} handleChange={props.handleChange} updateUser={props.updateUser} deleteUser={props.deleteUser} />
        </div>
    )
}


export default Profile;