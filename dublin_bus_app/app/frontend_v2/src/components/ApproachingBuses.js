import React from 'react'
import { useState, useEffect } from 'react'
import { css } from "@emotion/react";
import ClockLoader from "react-spinners/ClockLoader";

const ApproachingBuses = ({stopNumber}) => {
    
    const [approachingBusData, setApproachingBusData] = useState([]);
    const [displayBuses, setDisplayBuses] = useState(false);

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
    // const fetchStopSchedule = async () => {
    //     const res = await fetch(`http://localhost:8000/approach/${stopNumber}/`)
    //     const data = await res.json()
    //     console.log(data, "approaching bus data")
    //     setApproachingBusData(data)
    //     }
    // fetchStopSchedule();
    console.log(approachingBusData, "approaching bus data")
    return (
        <div>
            {!displayBuses && (
            <div>
                <p>Fetching Approaching Bus Data</p>
                <ClockLoader color={"#349beb"} css={override} size={100}/>
            </div>
            )}
            <ul>
                { displayBuses && (approachingBusData.length<=5 ? 
                approachingBusData.map(item=>{
                    return <li key={item.trip_id} style={{color: 'black'}}><p>{item.route_number} | Arriving in {Math.floor(item.countdown / 60)} minutes</p></li>
                }) 
                : approachingBusData.slice(0, 5).map(item=>{
                    return <li key={item.trip_id} style={{color: 'black'}}><p>{item.route_number} | Arriving in {Math.floor(item.countdown / 60)} minutes</p></li>
                }))}
            </ul>
        </div>
    )
}

export default ApproachingBuses
