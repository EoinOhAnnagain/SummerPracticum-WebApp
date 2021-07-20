import React from 'react'
import { useState } from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import Button from './Button'
import DateTimePicker from 'react-datetime-picker'
import JourneySelect from './JourneySelect'



const RouteSelect = () => {

}


const SidebarInputFields = ({stopData}) => {
    const [date, setDate] = useState(new Date());
    return (
        <div>
            {console.log("In sidebar", stopData)}
            <h2>Select Origin</h2><br/>
            <JourneySelect className={"origin"} stopData={stopData}/><br/>
            <h2>Select Destination</h2><br/>
            <JourneySelect className={"destination"} stopData={stopData}/><br/>
            <h2>Select Day</h2><br/>
            <DateTimePicker/><br/>
            <Button text="Find Route" onClick={RouteSelect}/><br/>
        </div>
    )
}

export default SidebarInputFields
