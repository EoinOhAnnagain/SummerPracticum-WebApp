import React from 'react'
import { useState } from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import Button from './Button'
import DateTimePicker from "react-datetime-picker"
import { addDays, format } from 'date-fns'
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { useSelector, useDispatch } from 'react-redux';
import { setOrigin } from '../redux/origin'
import { setDestination } from '../redux/destination'
import { setDirectionsRenderBoolean } from '../redux/directionsRenderBool'
import { setDirectionsResponseBoolean } from '../redux/directionsResponseBool'
import { setShowAllStopsBoolean } from '../redux/showAllStopsBool'
import { setJourneyDate } from '../redux/journeyDate'



const SidebarInputFields = ({stopData}) => {
    const [date, setDate] = useState(new Date());
    const [beginSelected, setBeginSelected] = useState();
    const [endSelected, setEndSelected] = useState();
    const [chosenDate, setChosenDate] = useState(new Date())
    const [formattedDate, setFormattedDate] = useState()
    const options = stopData.map(stop => {
        return {value: stop.Latitude + ", " + stop.Longitude, 
                label: stop.ShortCommonName_en + " | " + stop.PlateCode}
    })

    const { directionsRenderBoolean } = useSelector((state) => state.directionsRenderBoolean)
    console.log("render is currently set to ", directionsRenderBoolean)
    const { showAllStopsBoolean } = useSelector((state) => state.showAllStopsBoolean)
    const { origin } = useSelector((state) => state.origin)
    const { destination } = useSelector((state) => state.destination)
    const { journeyDate } = useSelector((state) => state.journeyDate)
    const dispatch = useDispatch();
    dispatch(setJourneyDate(format(date, 'yyyy-MM-dd')));
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

    const changeDate = (selected) => {
        setChosenDate(selected);
        setFormattedDate(format(selected, 'yyyy-MM-dd'))
        console.log(chosenDate, "is the chosen date")
    }

    const setJourney = () => {
        dispatch(setOrigin(beginSelected));
        dispatch(setDestination(endSelected));
        dispatch(setDirectionsRenderBoolean(true));
        dispatch(setShowAllStopsBoolean(false));
        dispatch(setDirectionsResponseBoolean(true));
        dispatch(setJourneyDate(formattedDate))
        console.log(formattedDate, "is THE date WE should ALL see");
    };

    return (
        <div>
            {console.log("In sidebar", stopData)}
            <h2>Select Origin</h2><br/>
            <Select options = {options} onChange={changeBegin}/><br/>
            <h2>Select Destination</h2><br/>
            <Select options = {options} onChange={changeEnd}/><br/>
            <h2>Select Day</h2><br/>
            <DateTimePicker format={"y-MM-dd"} minDate={new Date()} maxDate={addDays(new Date(), 13)} onChange={changeDate} value={chosenDate}/><br/>
            <Button text="Find Route" onClick={setJourney}/>
                    <br/>
        </div>
    )
}

export default SidebarInputFields
