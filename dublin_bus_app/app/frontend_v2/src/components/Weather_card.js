import React from 'react';
import "./weatherCard.css"
import moment from 'moment';
// import { Card } from 'semantic-ui-react'

function WeatherIcon(props){
    
    var img_url = 'https://i.imgur.com/yhlFgpS.png';
    console.log("[weatherIcon]:"+ typeof(props.id));

    if(props.id >= 200 && props.id <= 232){
        img_url = 'https://i.imgur.com/Fc0hTuR.png';
    } else if(props.id >= 300 && props.id <= 321){
        img_url = 'https://i.imgur.com/moXHRgD.png';
    } else if(props.id >= 500 && props.id <= 531){
        img_url = 'https://i.imgur.com/MMXM8y3.png';
    } else if(props.id >= 600 && props.id <= 622){
        img_url = 'https://i.imgur.com/nCtpMzx.png';
    } else if(props.id >= 701 && props.id <= 781){
        img_url = 'https://i.imgur.com/eGMKEE0.png';
    } else if(props.id >= 801 && props.id <= 804){
        img_url = 'https://i.imgur.com/yhlFgpS.png';
    } else if(props.id == 800){
        img_url = 'https://i.imgur.com/cQsGjSh.png';
    }
    // alert("[weather Icon]" + img_url);
    return (<img src={img_url} width="30px" className="rounded"/>); 
};
    


function CardExampleCard(props){
    
return (
<div className = "container-fluid">
    <div className = "row justify-content-center">
        <div className = "col-12 col-md-4 col-sm-12 col-xs-12">
            <div className = "card p-4">
                <div className = "d-flex">
                    <h6 class="flex-grow-1"> {props.weatherData.name}</h6>
                </div>
                <h6>{moment().format('LL')}</h6>
                <div className ="d-flex flex-column temp mt-5 mb-3">
                    <h1 class="mb-0 font-weight-bold" id="heading"> {Math.round(props.weatherData.main.temp)}°C </h1> <span class="small grey">{props.weatherData.weather[0].description}</span>
                </div>
                <div className = "d-flex">
                    <div className = "temp-details flex-grow-1">
                        {/* wind speed */}
                        <p className = "my-1"><img src="https://i.imgur.com/B9kqOzp.png" height="17px"/> <span> {props.weatherData.wind.speed} m/s </span></p>
                        {/* sunrise */}
                        <p className = "my-1"><img src="https://i.imgur.com/wGSJ8C5.png" height="17px"/> <span> 
                            {new Date(props.weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')} 
                        </span> </p>
                        {/* sunset */}
                        <p className = "my-1"><img src="https://i.imgur.com/0iMuVrt.png" height="17px"/> <span> 
                            {new Date(props.weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}
                        </span> </p>
                    </div>
                </div>
                <div className= "text-center" ><WeatherIcon id={(props.weatherData.weather[0].id)}/></div>
            </div>
        </div>
    </div>
</div>
);
}

export default CardExampleCard;