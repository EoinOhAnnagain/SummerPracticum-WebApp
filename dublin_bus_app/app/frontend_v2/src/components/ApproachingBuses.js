import React from 'react'
import { useState, useEffect } from 'react'
import { css } from "@emotion/react";
import ClockLoader from "react-spinners/ClockLoader";
import { addSeconds, format } from 'date-fns';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';

const ApproachingBuses = ({stopNumber}) => {
    
    // Capture result from upcoming fetch call
    const [approachingBusData, setApproachingBusData] = useState([]);
    //Boolean to display
    const [displayBuses, setDisplayBuses] = useState(false);

    useEffect(() => {
        setDisplayBuses(false);
    }, [])

    const override = css`
  display: block;
  margin: 0 auto;
  border-color: #349beb;
`;
// Fetch Live bus data from our Django back end
useEffect(async ()=> {
    const res = await fetch(`http://localhost:8000/core/approach/${stopNumber}/`);
        const data = await res.json();
        setApproachingBusData(data);
        setDisplayBuses(true);
}, [])
    
    // Boolean that toggles the format of the timestring displayed
    const [arrivalDisplay, setArrivalDisplay] = useState(true);

    // Used to construct the expected arrival time, given the countdown value returned from fetch request above
    const now = new Date();
    const arrivalTime = (countdown) => {
        let arrival = addSeconds(now, countdown)
        let h = arrival.getHours()
        let m = arrival.getMinutes()
        return `${h}:${m<10 ? "0"+m : m}`
    }

    // Toggle function that changes format of timestring displayed
    const toggleArrival = () => {
        setArrivalDisplay(!arrivalDisplay);
    }

    // Secondary popup view to see all buses arriving in the next hour, instead of just the first 3 as is default
const PopupBuses = () => {
    return(
    <Popup trigger={<button className="btn">See Next Hour</button>} modal>
        <div className="popup">{approachingBusData.map(item=>{
                    return <div key={item.trip_id} style={{color: 'black'}}><p>{item.route_number} | Arriving at {arrivalTime(item.countdown)} </p></div>
                }) }</div>
    </Popup>)
}

// The first 3 buses will be displayed, unless there is 3 or fewer, in which case all buses will be displayed
// A special message is displayed if no buses are due within the next hour
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
                : approachingBusData.length <=3 ? 
                approachingBusData.map(item=>{
                    return <li key={item.trip_id} style={{color: 'black'}}><p>{item.route_number} | Arriving in {Math.floor(item.countdown / 60)} minutes </p></li>
                }) 
                : approachingBusData.slice(0, 3).map(item=>{
                    return <li key={item.trip_id} style={{color: 'black'}}><p>{item.route_number} | Arriving in {Math.floor(item.countdown / 60)} minutes </p></li>
                }))
            : (approachingBusData.length==0 ? 
                "No buses arriving within the next hour"
                : approachingBusData.length<=3 ? approachingBusData.map(item=>{
                    return <li key={item.trip_id} style={{color: 'black'}}><p>{item.route_number} | Arriving at {arrivalTime(item.countdown)} </p></li>
                })  : approachingBusData.slice(0, 3).map(item=>{
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
