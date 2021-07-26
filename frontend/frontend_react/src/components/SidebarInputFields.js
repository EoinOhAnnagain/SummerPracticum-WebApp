import React from 'react'
import { useState } from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import Button from './Button'
import DateTimePicker from 'react-datetime-picker'
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { useSelector, useDispatch } from 'react-redux';
import { setOrigin } from '../redux/origin'
import { setDestination } from '../redux/destination'
import { setDirectionsRenderBoolean } from '../redux/directionsRenderBool'
import { setDirectionsResponseBoolean } from '../redux/directionsResponseBool'
import { setShowAllStopsBoolean } from '../redux/showAllStopsBool'



const SidebarInputFields = ({stopData}) => {
    const [date, setDate] = useState(new Date());
    const [beginSelected, setBeginSelected] = useState();
    const [endSelected, setEndSelected] = useState();
    const options = stopData.map(stop => {
        return {value: stop.Latitude + ", " + stop.Longitude, 
                label: stop.ShortCommonName_en + " | " + stop.PlateCode}
    })

    const { directionsRenderBoolean } = useSelector((state) => state.directionsRenderBoolean)
    console.log("render is currently set to ", directionsRenderBoolean)
    const { showAllStopsBoolean } = useSelector((state) => state.showAllStopsBoolean)
    const { origin } = useSelector((state) => state.origin)
    const { destination } = useSelector((state) => state.destination)
    const dispatch = useDispatch();
    console.log(origin, "is journey variable from redux")
    
     console.log(stopData, "in journey")

    const changeBegin = (selected) => {
        setBeginSelected(selected.value);
        console.log(beginSelected, "is new origin");
    };

    const changeEnd = (selected) => {
        setEndSelected(selected.value);
        console.log(endSelected, "is new origin");
    };

    const setJourney = () => {
        dispatch(setOrigin(beginSelected));
        dispatch(setDestination(endSelected));
        dispatch(setDirectionsRenderBoolean(true));
        dispatch(setShowAllStopsBoolean(false));
        dispatch(setDirectionsResponseBoolean(true));
    };

    return (
        <div>
            {console.log("In sidebar", stopData)}
            <h2>Select Origin</h2><br/>
            <Select options = {options} onChange={changeBegin}/><br/>
            <h2>Select Destination</h2><br/>
            <Select options = {options} onChange={changeEnd}/><br/>
            <h2>Select Day</h2><br/>
            <DateTimePicker/><br/>
            <Button text="Find Route" onClick={setJourney}/>
                    <br/>
            <h2>{console.log(origin, "<-origin after change\n", destination, "<-destination after change")} is the origin</h2>
        </div>
    )
}

export default SidebarInputFields
