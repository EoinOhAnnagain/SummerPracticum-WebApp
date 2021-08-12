import React from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsService,
  DirectionsRenderer,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState, useEffect, Fragment } from "react";
import mapStyles from "./mapStyles";
import Button from "./Button";
import ApproachingBuses from "./ApproachingBuses";
import { useSelector, useDispatch } from 'react-redux';
import { setDirectionsResponseBoolean } from '../redux/directionsResponseBool'
import { setShowAllStopsBoolean } from "../redux/showAllStopsBool";
import { setDirectionsRenderBoolean } from "../redux/directionsRenderBool";
import { setTotalPredictedSeconds } from "../redux/totalPredictedSeconds";

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
    const { totalPredictedSeconds } = useSelector((state)=> state.totalPredictedSeconds);
    const dispatch = useDispatch();

  const [googleTime, setGoogleTime] = useState([]);
  const [walkingTime, setWalkingTime] = useState([]);
  const [cumulativeSeconds, setCumulativeSeconds] = useState(0);
  const [predictedTime, setPredictedTime] = useState([]);
  const [fare, setFare] = useState([]);
  const [displayedRoute, setDisplayedRoute] = useState([]);

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
    setFare([[{category: "Calculating Fare", fare:""}]]);
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
      console.log(data, "fare django response");
      //setFare(data);
      return (data);
    }

    // For simplicity, used this secondstoHours function found online
    // https://www.codegrepper.com/code-examples/javascript/convert+seconds+to+hours+minutes+seconds+javascript
    const displaySecondsHMS = (seconds) => {
      const totSecs = Number(seconds);
      const hrs = Math.floor(totSecs / 3600);
      const mins = Math.floor(totSecs % 3600 / 60);
      const secs = Math.floor(totSecs % 3600 % 60);
      const hDisplay = hrs > 0 ? hrs + (hrs == 1 ? " hour, " : " hours ") : "";
      const mDisplay = mins > 0 ? mins + (mins == 1 ? " minute, " : " minutes ") : "";
      const sDisplay = secs > 0 ? secs + (secs == 1 ? " second" : " seconds") : "";
      console.log(hDisplay, mDisplay, sDisplay, "formatted hour components");
      return ([hDisplay + mDisplay + sDisplay]);
  }

  const postData_traveltime = async (stops_number,route_number,start_stop, journeyDate, response) => {
    setPredictedTime(["Calculating Journey Time Using Weather Data"]);
    console.log(totalPredictedSeconds, "the number of TOTAL PREDICTED SECONDS");
    console.log(stops_number, route_number, start_stop, "in postData_traveltime");
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
      return data
  }


  const directionsCallback = async (response) => {
    console.log(response);
    if (response !== null && directionsResponseBoolean) {
      if (response.status === "OK") {
        console.log("response from directions API is ", response);  
        dispatch(setDirectionsResponseBoolean(false));
        setResponse(response);
        setGoogleTime(response["routes"][0]["legs"][0]["duration"]["text"])
        //Set up variables to catch necessary products from functions here
        let seconds = 0;
        let timeTilBus = 0;
        let allFares = [];
        let routeNumbers = [];
        let count= 0;
        let arrival_time;
        let fare_info = response["routes"][0]["legs"][0]["steps"];
        console.log("FARE INFO", fare_info);
        for (let i in fare_info){
          if (fare_info[i]["travel_mode"] == "TRANSIT") {
            let stops_number = fare_info[i]["transit"]["num_stops"];
            console.log(stops_number);
            let route_number = fare_info[i]["transit"]["line"]["short_name"];
            routeNumbers.push(route_number);
            let start_stop = fare_info[i]["transit"]["departure_stop"]["name"];
            let departure_time = fare_info[i]["transit"]["departure_time"]["value"];
            if (count == 0){
              let query_time = new Date();
              let time_difference = departure_time.getTime() - query_time.getTime();
              let seconds_difference = Math.floor(time_difference/1000);
              console.log("TIME UNTIL BUS____________________________", seconds_difference);
              timeTilBus += seconds_difference;
              arrival_time = fare_info[i]["transit"]["arrival_time"]["value"];
              count +=1;
            } else {
              let time_difference = departure_time.getTime() - arrival_time.getTime();
              let seconds_difference = Math.floor(time_difference/1000);
              console.log("SECONDS DIFFERENCE BETWEEN TWO DATES____________________________", seconds_difference);
              seconds += seconds_difference;
            }
            const traveltime = await postData_traveltime(stops_number,route_number,start_stop, journeyDate, response);
            seconds += traveltime;
            const queriedFares = await postData_fare(stops_number,route_number);
            allFares.push(queriedFares);
          }
          if (fare_info[i]["travel_mode"] == "WALKING"){
            seconds += fare_info[i]["duration"]["value"];
          }
        }
        console.log("SECONDS AFTER LOOP ____________________________", seconds);
        console.log("THE COMBINED OUTPUT OF THE QUERIED FARES", allFares);
        const formattedSeconds = displaySecondsHMS(seconds);
        setPredictedTime(formattedSeconds);
        setDisplayedRoute(routeNumbers);
        console.log("ALL FARES_____________________", allFares);
        setFare(allFares);
        console.log("SHOULD BE SEEING THE LOGS IN THE DISPLAY SECONDS FUNCTION");
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
    setSelected({});
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
        <div>
          Route Number: {displayedRoute} <br/>
          Google Time: {googleTime} <br/>
          Predicted Time: {predictedTime} <br/>
        Fare: 
        {fare.map((subarray, index) => {
          return (
            <Fragment>
              <p>Bus {index+1}</p>
            {subarray.map((element) => {
              return(
                <li key={element.category}>{element.category}: {element.fare}</li>
              )
            })
          }
          </Fragment>
          );
        })}
        </div>
      )}
      {directionsRenderBoolean && <Button text={"Show All Stops"} onClick={toggleMarkers}></Button>}
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