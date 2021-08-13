import React, { useEffect, useState } from "react";
import CardExampleCard from "./Weather_card";



const Weather = ()=>{
    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [data, setData] = useState([]);

    const getPosition = () => {
        return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
      };
    
    const getWeather = async (latitude, longitude) => {
        setLat(latitude);
        setLong(longitude);
        const api_call = await
        fetch(`${process.env.REACT_APP_OW_API_URL}/weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=${process.env.REACT_APP_OW_API_KEY}`);
        const data = await api_call.json();
        setData(data)
        console.log('data is: ', data);  
      };

    useEffect(() => {
        const fetchData = () => {
            getPosition()
            .then((position) => {
               getWeather(position.coords.latitude,     
               position.coords.longitude)
             })
             .catch((err) => console.log(err.message));
        }

        fetchData();
      }, []);

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

