import React, { useEffect, useState } from "react";
import CardExampleCard from "./Weather_card";


const Weather = ()=>{
    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            navigator.geolocation.getCurrentPosition(function(position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
            });

            await fetch(`${process.env.REACT_APP_OW_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_OW_API_KEY}`)
            .then(res => res.json())
            .then(result => {
            setData(result)
            console.log(result);
            });
        }
        fetchData();
      }, [lat, long]);

    return (
        <div className="Weather">
        {(typeof data.main != 'undefined') ? (
            <CardExampleCard weatherData={data}/>
        ): (
            <p>Loading...</p>
        )}
        </div>
    );
}

export default Weather;

