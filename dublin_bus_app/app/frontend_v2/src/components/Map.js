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
import { useSelector, useDispatch } from 'react-redux';
import { setDirectionsResponseBoolean } from '../redux/directionsResponseBool'
import { setShowAllStopsBoolean } from "../redux/showAllStopsBool";
import directionsRenderBool, { setDirectionsRenderBoolean } from "../redux/directionsRenderBool";

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
    const { journeyDate } = useSelector((state) => state.journeyDate);
    const dispatch = useDispatch();

  const [predictedTime, setPredictedTime] = useState([]);
  const [fare, setFare] = useState([]);

  const [showAllMarkers, setShowAllMarkers] = useState(true);
  const [ selected, setSelected ] = useState({});
  const [center, setCenter] = useState({
    lat: 53.349804, lng: -6.260310 
  });
  const [postResults, setPostResults ] = useState(false);
  const [renderState, setRenderState] = useState(false);

  // const [origin2, setOrigin2] = React.useState("dublin");
  // const [destination2, setDestination2] = React.useState("cork");
  const [response, setResponse] = React.useState(null);
  const toggleMarkers = () => {
      dispatch(setShowAllStopsBoolean(!showAllStopsBoolean));
      dispatch(setDirectionsRenderBoolean(!directionsRenderBoolean));
  }

  const postData_fare = async (stops_number, route_number) => {
    setFare(["Calculating Fare"]);
    console.log(stops_number, route_number, "in postData_fare");
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type' : 'application/json' },
      body: JSON.stringify({
        param_1: stops_number,
        param_2: route_number}),
      };
      const fareResponse = await fetch('http://localhost:8000/core/Fare', requestOptions);
      const data = await fareResponse.json();
      console.log(data, "fare django response")
      setFare(data);
    }

    const secondsToHours = (seconds) => {
      const d = Number(seconds);
      const h = Math.floor(d / 3600);
      const m = Math.floor(d % 3600 / 60);
      const s = Math.floor(d % 3600 % 60);
      console.log(h, m, s, "individual hour components");
      const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
      const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
      const sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
      console.log(hDisplay, mDisplay, sDisplay, "formatted hour components");
      setPredictedTime([hDisplay + mDisplay + sDisplay]); 
      console.log(predictedTime, "in seconds to hours function");
  }

  const postData_traveltime = async (stops_number,route_number,start_stop, journeyDate) => {
    setPredictedTime(["Calculating Journey Time Using Weather Data"]);
    console.log(stops_number, route_number, start_stop, "in postData_fare")
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type' : 'application/json' },
      body: JSON.stringify({
        param_1: stops_number,
        param_2: route_number,
        param_3: start_stop,
        param_4: journeyDate}),
      };
      const MLResponse = await fetch('http://localhost:8000/core/Travel', requestOptions);
      const data = await MLResponse.json();
      console.log(data, "ML django response");
      secondsToHours(data);
  }


  const directionsCallback = (response) => {
    console.log(response);
    if (response !== null && directionsResponseBoolean) {
      if (response.status === "OK") {
        console.log("response from directions API is ", response);  
        dispatch(setDirectionsResponseBoolean(false));
        setResponse(response);
        let fare_info = response["routes"][0]["legs"][0]["steps"];
        console.log("FARE INFO", fare_info);
        for (let i in fare_info){
          if (fare_info[i]["travel_mode"] == "TRANSIT") {
            let stops_number = fare_info[i]["transit"]["num_stops"];
            console.log(stops_number);
            let route_number = fare_info[i]["transit"]["line"]["short_name"];
            let start_stop = fare_info[i]["transit"]["departure_stop"]["name"];
            postData_traveltime(stops_number,route_number,start_stop, journeyDate);
            postData_fare(stops_number,route_number);
          }
        }
        
      } else {
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

  console.log("Stop Data is in Map.js", stopData);
  // const setJourney = () =>{
  //   setOrigin({lat: 53.39187739, lng: -6.259719573})
  //   setDestination({lat: 53.22102148, lng: -6.225605532})
  //   setShowAllMarkers(false)
  //   setRenderState(true)
  // }

  return (
    <div>
      {directionsRenderBoolean && (
        <div>Predicted Time: {predictedTime} <br/>
        Fare: {fare}</div>
      )}
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
                <p style={{color: "darkblue"}}>{selected.ShortCommonName_en} | {selected.PlateCode}</p>
                <p style={{color: "lightblue"}}>Serving Routes {selected.RouteData}</p>
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