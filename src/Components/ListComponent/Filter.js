import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { get } from "../../api";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        margin: '0 5% 0 3%',
        padding: '0.3%',
    },
    zipcodeInputForm: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: '5%',
    },
    zipcodeInput: {
        marginRight: '3%',
    },
}));




function Filter(props) {
    const classes = useStyles();

    const [zipcode, setZipcode] = React.useState("00000")

    const [param, setParam] = React.useState({
        parameter: '',
        returnedSites: []
    })

    const handleChange = (e) => {
        const value = e.target.value;
        console.log("value:", value)
        setZipcode(value);
    }



    //FILTER LOCATIONS BY EITHER ZIP CODE OR BOROUGH
    const filterLocation = async () => {
        const paramEntered = param.parameter
        console.log("paramentered",paramEntered)
        try {
            const data = await get(`/getLocations/${paramEntered}`)
            setParam(prevState => ({
                ...prevState,
                returnedSites:data
            }))
            props.onResult(data.getLocations);
        } catch (err) {
            //do something with err
            console.log(err)
        }
    }


    React.useEffect(() => {
        setParam(prevState => ({
            ...prevState,
            parameter: zipcode
        }))
    }, [zipcode])


    return (
        <div className={classes.root}>
            <form className={classes.zipcodeInputForm}>
                <TextField className={classes.zipcodeInput} id="standard-search" label="zip code" type="search" value={zipcode} onChange={handleChange} />
                <Button className={classes.zipcodeBtn} variant="outlined" color="primary" onClick={filterLocation}>ENTER</Button>
            </form>
        </div>
    );
}

export default Filter;
