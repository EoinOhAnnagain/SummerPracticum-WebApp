import React from 'react';
import { GoogleMap, LoadScript, Marker, MarkerClusterer, InfoWindow, DirectionsService, DirectionsRenderer, useLoadScript } from '@react-google-maps/api'
import { useState } from 'react';
import {getGeocode, getLatLng} from "use-places-autocomplete"
import ApproachingBuses from './ApproachingBuses';
import mapStyles from './mapStyles';
import Button from './Button';
import {Helmet} from 'react-helmet'

const libraries = ["directions"];

const MapContainer = ({stopData}) => {
  const [response, setResponse] = useState(null); 
  const [destination, setDestination] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [showAllMarkers, setShowAllMarkers] = useState(false);
  const [ selected, setSelected ] = useState({});
  const [defaultCenter, setDefaultCenter] = useState({
    //lat: 41.3851, lng: 2.1734
    lat: 53.349804, lng: -6.260310 
  });
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: "AIzaSyDMShWhoPlx171FYgvYn_nOroBgsf28oCk",
    libraries,
  })
  
  if (loadError) return "Error loading maps"
  if (!isLoaded) return "Loading Maps";

const directionsCallback = (reponse) =>{
  console.log(response)
  console.log("Made it to directionsCallback function")
  if (response!== null){
    if (response.status === "OK"){
      setResponse(response)
    }else{
      console.log("directions callback:", response)
    }
  }
  console.log("directions callback:", response)
}

const getOrigin = (props) =>{
  //
}

const getDestination = (props) =>{
  //
}

    console.log(stopData, "is in Map.js")
  const locations = stopData
  let [first] = Object.keys(locations)
  console.log(first, "first")
    console.log(locations, "is registered as locations in map.js")
    
    

    const onSelect = stop => {
        setSelected(stop);
    }

    const onCloseInfoWindow = (position) => {
      setSelected({});
      setDefaultCenter(position);
    } 

    const DirectionsServiceOption = {
      origin: origin,
      destination: destination,
      travelMode: 'TRANSIT',
      transitOptions: {
        modes: ['BUS'],
        routingPreference: 'FEWER_TRANSFERS'
      }
    };

const setJourney = () =>{
  setOrigin({lat: 53.39187739, lng: -6.259719573})
  setDestination({lat: 53.22102148, lng: -6.225605532})
}

  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
    const options = {
      styles: mapStyles,
      disableDefaultUI: true,
    }
  // https://www.youtube.com/watch?v=WZcxJGmLbSo&t=8s <-- Alvaro Tutorial @ 14 mins
  // https://surveyor-equivalents-18060.netlify.app/#!/MarkerClusterer
  return (
     <>
     <Button text={"Calculate Route"} onClick={setJourney}></Button>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={15}
          center={defaultCenter}
          options ={options}
          onLoad={onMapLoad}>
           
              {
                  showAllMarkers && ( locations.map(stop=>{
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
              
              { response !== null && (
          <DirectionsRenderer
            options={{
              directions: response,
            }}
          />
        )}
        {
          (origin !== null && destination !== null) &&(
          <DirectionsService
          options={DirectionsServiceOption}
          callback={directionsCallback}
          onLoad = {directionsService => {console.log(directionsService, "is the directions service")}}
        />
        )};


          </GoogleMap>
          
     </>
  );
}
export default MapContainer;


