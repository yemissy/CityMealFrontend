import React from 'react';
import Filter from './Filter'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Rating from './Rating';
import {useStyles} from './listStyles';
import {get} from '../../api';




function constructStreetViewURL(location) {
  let url = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${location.latitude},${location.longitude}&key=${process.env.REACT_APP_API_KEY}`
  return url
}

function List(props) {
  const classes = useStyles();
  const [locations, setLocatons] = React.useState([])
 
   //GET ALL LOCATIONS & DISPLAY IN LIST
  React.useEffect(() => {
    const getAllLocation = async () => {
        const data = await get("/locations");
        setLocatons(data.locations)
    };
    getAllLocation();
  }, []);

  return (
    <div>
      <div className={classes.filterDiv}>
        <Filter />
      </div>
      <div className={classes.listWrap}>
        {locations.map(location => (
          <Box className={classes.list} maxWidth="xl" key={location.id} >
            <Box className={classes.pic} borderRadius={16} width={1 / 2}><img height="auto" width="100%" padding-left="3%" src={constructStreetViewURL(location)} alt="map" /></Box>
            <Box className={classes.info}>
              <Box style={{ marginBottom: '13%', color: '#325288' }}>{location.siteAddress}</Box>
              <Box style={{ marginBottom: '13%', color: '#325288' }}>{location.city}</Box>
              <Rating />
              <button className={classes.favBtn} onClick={props.addFav} name={location.id}>❤️</button>
              <Button variant="contained" color="primary" className={classes.directionBtn}><a style={{ textDecoration: "none", color: "white" }} href={`https://www.google.com/maps/place/` + location.siteAddress.split(" ").join("+")} target="_blank" rel="noreferrer">GET DIRECTION</a></Button>
            </Box>
          </Box>
        ))}
      </div>
    </div>
  )
}

export default List