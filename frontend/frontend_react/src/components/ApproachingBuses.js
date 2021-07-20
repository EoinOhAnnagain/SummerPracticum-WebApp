import React from 'react'
import { useState } from 'react'

const ApproachingBuses = ({stopNumber}) => {
    
    const [approachingBusData, setApproachingBusData] = useState({})


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
            <ul>
                {approachingBusData.map(item=>{
                    return <li>{item.route_number} {item.arrival_time}</li>
                })}
            </ul>
        </div>
    )
}

export default ApproachingBuses
