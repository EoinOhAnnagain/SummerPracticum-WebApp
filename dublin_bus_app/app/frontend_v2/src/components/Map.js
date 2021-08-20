import React from "react";
import {Link} from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  DirectionsService,
  DirectionsRenderer,
  Marker,
  MarkerClusterer,
  InfoWindow,
} from "@react-google-maps/api";
import { useState, useEffect, Fragment, useCallback, useRef } from "react";
import { css } from "@emotion/react";
import ClockLoader from "react-spinners/ClockLoader";
import BeatLoader from "react-spinners/BeatLoader"
import mapStyles from "./mapStyles";
import Button from "./Button";
import ApproachingBuses from "./ApproachingBuses";
import { useSelector, useDispatch } from 'react-redux';
import { setDirectionsResponseBoolean } from '../redux/directionsResponseBool'
import { setShowAllStopsBoolean } from "../redux/showAllStopsBool";
import { setDirectionsRenderBoolean } from "../redux/directionsRenderBool";
import { setTotalPredictedSeconds } from "../redux/totalPredictedSeconds";
import { setLoading } from "../redux/loading";
import * as BiIcons from "react-icons/bi"


const libraries = ["places", "directions"];
const mapContainerStyle = {
    height: "100vh",
    width: "100%"
};

const MainMaps = ({stopData}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDMShWhoPlx171FYgvYn_nOroBgsf28oCk",
    libraries,
  });

    const { directionsRenderBoolean } = useSelector((state) => state.directionsRenderBoolean);
    const {directionsResponseBoolean } = useSelector((state) => state.directionsResponseBoolean)
    console.log("render is currently set to ", directionsRenderBoolean);
    const { showAllStopsBoolean } = useSelector((state) => state.showAllStopsBoolean);
    const { origin } = useSelector((state) => state.origin);
    const { destination } = useSelector((state) => state.destination);
    const { journeyDate } = useSelector((state) => state.journeyDate);
    const { totalPredictedSeconds } = useSelector((state)=> state.totalPredictedSeconds);
    const { journeyDateString } = useSelector((state) => state.journeyDateString);
    const {loading} = useSelector(state => state.loading)
    const dispatch = useDispatch();


  const [waitingTime, setWaitingTime] = useState(0);
  // Capture Google time
  const [googleTime, setGoogleTime] = useState([]);
  // Our predicted time
  const [predictedTime, setPredictedTime] = useState([]);
  // Our fare calculation
  const [fare, setFare] = useState([]);
  // Booleans that manage information display
  const [displayedRoute, setDisplayedRoute] = useState([]);
  const [predictionSuccess, setPredictionSuccess] = useState(true);
  const [help, setHelp] = useState(false);

  // For activating markers
  const [ selected, setSelected ] = useState({});
  const [center, setCenter] = useState({
    lat: 53.349804, lng: -6.260310 
  });

  // Directions returned from Google
  const [showDirectionsSteps, setShowDirectionsSteps] = useState(false);
  const [allDirections, setAllDirections] = useState(["Loading Directions"]);

// Used to house google response object
  const [response, setResponse] = React.useState(null);

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: #349beb;
`;

  
const toggleDirections = () => {
  setShowDirectionsSteps(!showDirectionsSteps);
}

  const toggleMarkers = () => {
      dispatch(setShowAllStopsBoolean(true));
      dispatch(setDirectionsRenderBoolean(false));
  }

  useEffect(()=> {
    toggleMarkers();
    }, []);

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
      console.log("REQUEST OPTIONS FARE__________________________", requestOptions);
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
      const sDisplay = secs >= 0 ? secs + (secs == 1 ? " second" : " seconds") : "";
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
      console.log("REQUEST OPTIONS TRAVELTIME__________________________", requestOptions);
      const MLResponse = await fetch('http://localhost:8000/core/Travel', requestOptions);
      const data = await MLResponse.json();
      console.log(data, "ML django response");
      return data
  }

// Callback function after Google returns a response.
// Strips useful information from Google response to use in our predictive modelling and 
// fare calculation funcitons in our Django back end. Also
// captures information from Google response for display on site
  const directionsCallback = async (response) => {
    console.log(response);
    if (response !== null && directionsResponseBoolean) {
      if (response.status === "OK") {
        console.log("response from directions API is ", response);  
        dispatch(setDirectionsResponseBoolean(false));
        setResponse(response);
        setGoogleTime(response["routes"][0]["legs"][0]["duration"]["text"])
        //Set up variables to catch necessary products from functions here
        let success = true;
        let seconds = 0;
        let timeTilBus = 0;
        let allFares = [];
        let routeNumbers = [];
        let count= 0;
        let arrival_time;
        let directionsSteps = [];
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
              let query_time = new Date(journeyDateString);
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
            try {
              const traveltime = await postData_traveltime(stops_number,route_number,start_stop, journeyDate, response);
              seconds += traveltime;
            }catch{
                console.log("ERROR IN TRAVELTIME______________________");
                success = false;
              }
            const queriedFares = await postData_fare(stops_number,route_number);
            allFares.push(queriedFares);
          }
          if (fare_info[i]["travel_mode"] == "WALKING"){
            seconds += fare_info[i]["duration"]["value"];
          }
          directionsSteps.push(fare_info[i]["instructions"]);
        }
        setPredictionSuccess(success);
        console.log("SECONDS AFTER LOOP ____________________________", seconds);
        console.log("THE COMBINED OUTPUT OF THE QUERIED FARES", allFares);
        const timeTil = displaySecondsHMS(timeTilBus);
        setWaitingTime(timeTil);
        const formattedSeconds = displaySecondsHMS(seconds);
        setPredictedTime(formattedSeconds);
        setDisplayedRoute(routeNumbers);
        setAllDirections(directionsSteps);
        console.log("ALL FARES_____________________", allFares);
        setFare(allFares);
        console.log("SHOULD BE SEEING THE LOGS IN THE DISPLAY SECONDS FUNCTION");
        dispatch(setLoading(false));
      } else {
        console.log("response: ", response);
      }
    }
  };

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

const panTo = useCallback(({lat, lng}) => {
  mapRef.current.panTo({lat, lng});
  mapRef.current.setZoom(18);
})

const Locate = ({panTo}) => {
  return (<button className="btn" title="Show Stops Near Me" onClick={() => {
    navigator.geolocation.getCurrentPosition((position) => {
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
    }, ()=> alert("Geolocation is not possible when hosted on insecure server. If hosted securely, refresh the page and try again."));
  }}>
      <BiIcons.BiCurrentLocation/>
    </button>);
}

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
        departureTime: new Date(journeyDateString),
        modes: ['BUS'],
        routingPreference: 'FEWER_TRANSFERS'
      }
  };

  console.log("Stop Data is in Map.js", stopData);
  
  const clustererOptions = {
    // imagePath: `${clusterMakers}/m`
  }

  

  return (
    <div className="container">
      {showAllStopsBoolean && <Locate panTo={panTo}/>}
      <button className="btn" title="Show Map Info" onClick={()=> setHelp(!help)}>{help ? "Hide Map Info": "Show Map Info"}</button>
      {help && (<div><p>Click the target above to zoom to your location</p>
      <p>Scroll in to reveal bus stops</p>
      <p>Click on a stop to get arrival information</p></div>)}
      {directionsRenderBoolean && (
        <div className="predictionResults">
          <p>Your bus will arrive: <div className="predictionStyler"> {loading ? <div><BeatLoader color={"#349beb"} css={override} size={20}/>Calculating</div> : `${waitingTime} after your selected departure time`}</div> </p>
          <p>Google says the journey will take:<div className="predictionStyler">{googleTime} </div> </p><br/>
          <p>Based on weather patterns, we think it will take: <div className="predictionStyler"> {loading ? 
            <div> <BeatLoader color={"#349beb"} css={override} size={20}/>Calculating</div> : predictionSuccess ? 
            predictedTime : "Woops, our predictor failed for this stop, sorry! This sometimes happens when new stops are added"}</div> </p><br/>
          <p>And you can expect to pay:</p> 
          <div className="predictionStyler">
          <ul>
        {loading ? <div> <BeatLoader color={"#349beb"} css={override} size={20}/>Calculating</div> :
         fare.map((subarray, index) => {
          return (
            <Fragment>
              <p>{displayedRoute[index]}</p>
            {subarray.map((element) => {
              return(
                <li key={element.category}>{element.category}: {element.fare}</li>
              )
            })
          }
          </Fragment>
          );
        })}
        <div className="predictionStyler"><Link className={"nav-link"} to={"/webChat/"}>Find your Route in our Chat</Link></div>
        </ul>
        </div>
          <Button text={"Show Bus Directions"} onClick={toggleDirections}/>
          {showDirectionsSteps && ( loading ? 
            <div><BeatLoader color={"#349beb"} css={override} size={30}/>Loading</div> 
            : <div>{allDirections.map(step => { return (<><p>{step}</p><br/></>)})}</div>)}
          </div>
      )}
      {directionsRenderBoolean && <Button text={"Back to Stops"} onClick={toggleMarkers}></Button>}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
          {
                  showAllStopsBoolean && ( 
                    <MarkerClusterer options={clustererOptions}>
                    {(clusterer) =>
                    locations.map(stop=>{
                      const location = { lat: parseFloat(stop.Latitude), lng: parseFloat(stop.Longitude) }
                        return(
                            <Marker key={stop.AtcoCode} position = {location} clusterer={clusterer} onClick={() => onSelect(stop)}/>
                        )
                    }
                  )}
                  </MarkerClusterer>
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