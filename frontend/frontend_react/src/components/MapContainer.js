import { GoogleMap, LoadScript, Marker, MarkerClusterer, InfoWindow } from '@react-google-maps/api'
import { useState } from 'react';

const MapContainer = ({stopData}) => {
      
    console.log(stopData, "is in Map.js")
    // const locations = [
    //     {
    //       name: "Location 1",
    //       location: { 
    //         lat: 41.3954,
    //         lng: 2.162 
    //       },
    //     },
    //     {
    //       name: "Location 2",
    //       location: { 
    //         lat: 53.349804,
    //         lng: -6.260310 
    //       },
    //     }
    //   ];
  const locations = stopData
  let [first] = Object.keys(locations)
  console.log(first, "first")
    console.log(locations, "is registered as locations in map.js")
    const [ selected, setSelected ] = useState({});
    

    const onSelect = stop => {
        setSelected(stop);
    }

    const onCloseInfoWindow = (position) => {
      setSelected({});
      setDefaultCenter(position);
    } 

  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
  const [defaultCenter, setDefaultCenter] = useState({
    //lat: 41.3851, lng: 2.1734
    lat: 53.349804, lng: -6.260310 
  })
  // https://surveyor-equivalents-18060.netlify.app/#!/MarkerClusterer
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyDMShWhoPlx171FYgvYn_nOroBgsf28oCk'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}>
              {
                  locations.map(stop=>{
                    const location = { lat: parseFloat(stop.Latitude), lng: parseFloat(stop.Longitude) }
                      return(
                          <Marker key={stop.AtcoCode} position = {location} onClick={() => onSelect(stop)}/>
                      )
                  })
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
                          </div>
                      </InfoWindow>
                  )
              }
          </GoogleMap>
     </LoadScript>
  )
}
export default MapContainer;


