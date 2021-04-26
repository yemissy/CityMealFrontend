import React from "react";
import Announcement from "../Others/announce";
import Filter from "../ListComponent/Filter";
import { get } from "../../api";
import { determineCenter } from "../Others/determineCenterLocation";

import {
    makeStyles,
} from "@material-ui/core";

import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";


const key = process.env.REACT_APP_API_KEY;//I need to hide this

const mapDiv = {
    width: '80vw',
    height: '75vh',
    position: 'relative',
    margin: '3% 5% 5% 10%'
}

const homeStyles = makeStyles((theme) => ({
    filterMapDiv: {
        width: "100%",
        position: "relative",
        margin: "auto",
        popOver: {
            width: '20em',
            height: '20em',
            borderRadius: '5px',
            border: '2px solid black'
        },
    }
}))

function HomePage(props) {

    const classes = homeStyles();

    //SET USER POSITION
    const [usersLocation, setUsersLocation] = React.useState({});

    const [siteSelected, setSiteSelected] = React.useState({});

    //SET SITE COORDINATES
    const [siteCoords, setSiteCoords] = React.useState([]);

    const [filteredCoords, setFiltered] = React.useState([]);

    const handleFilteredCoords = () => {
        if (filteredCoords.data) {
          if (filteredCoords.data.length > 0) {
          let coords = determineCenter(filteredCoords)
          return coords
          }
        } else {
          if (usersLocation) {
            return usersLocation
          }
          return { lat:40.7128,lng:-74.0060};
        }
    }

    //SET USERS LOCATION STATE ONECE LOADED FROM USEEFFECT
    const success = (position) => {
        const userposition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };
        setUsersLocation(userposition);
        localStorage.setItem("userPosition", JSON.stringify(userposition));
    };

    const handleSeclect = (site) => {
        setSiteSelected(site);
    };

    React.useEffect(() => {
        //GET FIRST LOCATION OF USER ON PAGE LOAD
        navigator.geolocation.getCurrentPosition(success);
        //Look up navigator.watchPosition
    });

    React.useEffect(() => {
        const userPosition = localStorage.getItem("userPosition");
        if (userPosition) {
            const located = JSON.parse(userPosition);
            setUsersLocation(located);
        }
    }, [usersLocation]);

    //GET ALL LOCATIONS AND CREATE SITE POSITION COORDINATES FOR MAP VIEW
    React.useEffect(() => {
        const getAllLocation = async () => {
            const data = await get("/locations");
            const sites = data.locations.map((site) => {
                return {
                    name: site.name,
                    zip: site.zip,
                    address: site.siteAddress,
                    position: {
                        lat: parseFloat(site.latitude),
                        lng: parseFloat(site.longitude),
                    },
                };
            }, []);

            setSiteCoords(sites);
        };
        getAllLocation();
    }, []);

    //RETURN FUNCTIONx 
    return (
        <div className={classes.mainDiv}>
        <Announcement />
        <div className={classes.filterMapDiv}>
        <Filter
            onResult={data => {
                console.log("data",data)
                setFiltered({ data });
            }}
        />
            {/* <LoadScript googleMapsApiKey={key}>
            <GoogleMap
                mapContainerStyle={mapDiv}
                zoom={15}
                center={handleFilteredCoords()}
            >
                {siteCoords.map((site) => {
                return (
                    <Marker
                    key={site.name}
                    position={site.position}
                    onClick={() => handleSeclect(site)}
                    />
                );
                })}
                {siteSelected.position && (
                <InfoWindow
                    position={siteSelected.position}
                    clickable={true}
                    onCloseClick={() => setSiteSelected({})}
                >
                    <div>
                    <p>Food Center: {siteSelected.name}</p>
                    <p>Address: {siteSelected.address}</p>
                    <p>Zip Code: {siteSelected.zip}</p>
                    <button
                        onClick={() =>
                        window.alert("Please Sign In To Save Locations")
                        }
                    >
                        :heart:
                    </button>
                    </div>
                </InfoWindow>
                )}
            </GoogleMap>
            </LoadScript> */}
        </div>
        </div>
    );
}

export default HomePage;
