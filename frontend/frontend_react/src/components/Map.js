import React from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsService,
  DirectionsRenderer,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState } from "react";
import mapStyles from "./mapStyles";
import Button from "./Button";
import ApproachingBuses from "./ApproachingBuses";
import eventBus from "./eventBus";
import { useSelector, useDispatch } from 'react-redux';
import { setDirectionsResponseBoolean } from '../redux/directionsResponseBool'

const libraries = ["places", "directions"];
const mapContainerStyle = {
    height: "100vh",
    width: "100%"
};

const options = {};

const MainMaps = ({stopData}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDMShWhoPlx171FYgvYn_nOroBgsf28oCk",
    libraries,
  });

  // const [destination, setDestination] = useState(null);
  // const [origin, setOrigin] = useState(null);

  const { directionsRenderBoolean } = useSelector((state) => state.directionsRenderBoolean);
  const {directionsResponseBoolean } = useSelector((state) => state.directionsResponseBoolean)
    console.log("render is currently set to ", directionsRenderBoolean);
    const { showAllStopsBoolean } = useSelector((state) => state.showAllStopsBoolean);
    const { origin } = useSelector((state) => state.origin);
    const { destination } = useSelector((state) => state.destination);
    const dispatch = useDispatch();

  const [showAllMarkers, setShowAllMarkers] = useState(true);
  const [ selected, setSelected ] = useState({});
  const [center, setCenter] = useState({
    lat: 53.349804, lng: -6.260310 
  });
  const [renderState, setRenderState] = useState(false)

  // const [origin2, setOrigin2] = React.useState("dublin");
  // const [destination2, setDestination2] = React.useState("cork");
  const [response, setResponse] = React.useState(null);
  const toggleMarkers = () => {
      setShowAllMarkers(!showAllMarkers)
  }

  let count = React.useRef(0);
  const directionsCallback = (response) => {
    console.log(response);

    if (response !== null && directionsResponseBoolean) {
      if (response.status === "OK") {
          dispatch(setDirectionsResponseBoolean(false));
        setResponse(response);
      } else {
        count.current = 0;
        console.log("response: ", response);
      }
    }
  };

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "loading maps";

  console.log(stopData, "is in Map.js")
  const locations = stopData

  const onSelect = stop => {
    setSelected(stop);
}

const onCloseInfoWindow = (position) => {
  setSelected({});
//   setCenter(position);
    onMapLoad();
} 
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
  }

  const DirectionsServiceOption = {
    destination: destination,
    origin: origin,
    travelMode: "TRANSIT",
    transitOptions: {
        modes: ['BUS'],
        routingPreference: 'FEWER_TRANSFERS'
      }
  };

  // const setJourney = () =>{
  //   setOrigin({lat: 53.39187739, lng: -6.259719573})
  //   setDestination({lat: 53.22102148, lng: -6.225605532})
  //   setShowAllMarkers(false)
  //   setRenderState(true)
  // }

  return (
    <div>
      {/* <Button text={"Calculate Route"} onClick={setJourney}></Button> */}
      <Button text={"Show All Stops"} onClick={toggleMarkers}></Button>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
          {
                  showAllStopsBoolean && ( locations.map(stop=>{
                    const location = { lat: parseFloat(stop.Latitude), lng: parseFloat(stop.Longitude) }
                      return(
                          <Marker key={stop.AtcoCode} position = {location} onClick={() => onSelect(stop)}/>
                      )
                  })
                  )
              }
              {
        
        selected.AtcoCode && (
            <InfoWindow 
            position={ { lat: parseFloat(selected.Latitude), lng: parseFloat(selected.Longitude) }}
            clickable = {true}
            onCloseClick={() => onCloseInfoWindow({ lat: parseFloat(selected.Latitude), lng: parseFloat(selected.Longitude)})}>
                <div>
                <p> {selected.ShortCommonName_en} | {selected.PlateCode}</p>
                <p>Serving Routes {selected.RouteData}</p>
                {console.log(selected.AtcoCode)}
                <ApproachingBuses stopNumber={selected.AtcoCode} />
      
                </div>
            </InfoWindow>
        )
    }
        {response !== null && directionsRenderBoolean && (
          <DirectionsRenderer
            options={{
              directions: response,
            }}
          />
        )}

        <DirectionsService
          options={DirectionsServiceOption}
          callback={directionsCallback}
        />
      </GoogleMap>
    </div>
  );
};

export default MainMaps;