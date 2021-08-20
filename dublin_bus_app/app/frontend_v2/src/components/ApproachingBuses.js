import React from 'react'
import { useState, useEffect } from 'react'
import { css } from "@emotion/react";
import ClockLoader from "react-spinners/ClockLoader";
import { addSeconds, format } from 'date-fns';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';

const ApproachingBuses = ({stopNumber}) => {
    
    const [approachingBusData, setApproachingBusData] = useState([]);
    const [displayBuses, setDisplayBuses] = useState(false);

    useEffect(() => {
        setDisplayBuses(false);
    }, [])

    const override = css`
  display: block;
  margin: 0 auto;
  border-color: #349beb;
`;

useEffect(async ()=> {
    console.log("In approaching buses file at line 9");
    const res = await fetch(`http://localhost:8000/core/approach/${stopNumber}/`);
        const data = await res.json();
        console.log(data, "approaching bus data");
        setApproachingBusData(data);
        setDisplayBuses(true);
}, [])
    console.log(approachingBusData, "approaching bus data")
    
    const [arrivalDisplay, setArrivalDisplay] = useState(true);
    const [subArrivalDisplay, setSubArrivalDisplay] = useState(true);

    const now = new Date();

    const arrivalTime = (countdown) => {
        let arrival = addSeconds(now, countdown)
        let h = arrival.getHours()
        let m = arrival.getMinutes()
        return `${h}:${m<10 ? "0"+m : m}`
    }

    const toggleArrival = () => {
        setArrivalDisplay(!arrivalDisplay);
    }

const PopupBuses = () => {
    return(
    <Popup trigger={<button className="btn">See Next Hour</button>} modal>
        <div className="popup">{approachingBusData.map(item=>{
                    return <div key={item.trip_id} style={{color: 'black'}}><p>{item.route_number} | Arriving at {arrivalTime(item.countdown)} </p></div>
                }) }</div>
    </Popup>)
}

    console.log(approachingBusData, "approaching bus data")
    return (
        <div className="approachingBuses">
            {!displayBuses && (
            <div>
                <p>Fetching Approaching Bus Data</p>
                <ClockLoader color={"#349beb"} css={override} size={40}/>
            </div>
            )}
            <ul>
                { displayBuses && (arrivalDisplay ? 
                (approachingBusData.length==0 ? 
                    "No buses arriving within the next hour"
                : approachingBusData.length <=5 ? 
                approachingBusData.map(item=>{
                    return <li key={item.trip_id} style={{color: 'black'}}><p>{item.route_number} | Arriving in {Math.floor(item.countdown / 60)} minutes </p></li>
                }) 
                : approachingBusData.slice(0, 5).map(item=>{
                    return <li key={item.trip_id} style={{color: 'black'}}><p>{item.route_number} | Arriving in {Math.floor(item.countdown / 60)} minutes </p></li>
                }))
            : (approachingBusData.length==0 ? 
                "No buses arriving within the next hour"
                : approachingBusData.length<=5 ? approachingBusData.map(item=>{
                    return <li key={item.trip_id} style={{color: 'black'}}><p>{item.route_number} | Arriving at {arrivalTime(item.countdown)} </p></li>
                })  : approachingBusData.slice(0, 5).map(item=>{
                    return <li key={item.trip_id} style={{color: 'black'}}><p>{item.route_number} | Arriving at {arrivalTime(item.countdown)}</p></li>
                })))}
            </ul>
            {displayBuses && (<>
                {approachingBusData.length != 0 && (<><button className="btn" onClick={toggleArrival}>{arrivalDisplay ? "See Arrival Time" : "See Countdown"}</button>
                     <PopupBuses/></>)}
                </>)}
        </div>
    )
}

export default ApproachingBuses
