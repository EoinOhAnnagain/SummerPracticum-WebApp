import React from 'react'
import { useState } from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import Button from './Button'
// import DateTimePicker from "react-datetime-picker"
import { MuiPickersUtilsProvider, TimePicker, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { addDays, format } from 'date-fns';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { useSelector, useDispatch } from 'react-redux';
import { setOrigin } from '../redux/origin';
import { setDestination } from '../redux/destination';
import { setDirectionsRenderBoolean } from '../redux/directionsRenderBool'
import { setDirectionsResponseBoolean } from '../redux/directionsResponseBool'
import { setShowAllStopsBoolean } from '../redux/showAllStopsBool';
import { setJourneyDate } from '../redux/journeyDate';
import { setTotalPredictedSeconds } from "../redux/totalPredictedSeconds";
import { setJourneyDateString } from '../redux/journeyDateString';



const SidebarInputFields = ({stopData}) => {
    const [date, setDate] = useState(new Date());
    const [beginSelected, setBeginSelected] = useState();
    const [endSelected, setEndSelected] = useState();
    const [chosenDate, setChosenDate] = useState(new Date())
    const today = new Date()
    const [chosenTime, setChosenTime] = useState(today.getHours() + ':' + today.getMinutes());
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
        console.log("DATE AS STRING_________________________", selected.toString())
        setFormattedDate(format(selected, 'yyyy-MM-dd'))
        dispatch(setJourneyDateString(selected.toString()))
        console.log(chosenDate, "is the chosen date")
    }

    const changeTime = (value) => {
        setChosenTime(value);
        console.log("CHOSEN TIME________________________", value);
    }

    const setJourney = () => {
        dispatch(setOrigin(beginSelected));
        dispatch(setDestination(endSelected));
        dispatch(setDirectionsRenderBoolean(true));
        dispatch(setShowAllStopsBoolean(false));
        dispatch(setDirectionsResponseBoolean(true));
        dispatch(setJourneyDate(formattedDate));
        dispatch(setTotalPredictedSeconds(0));
        
        console.log(formattedDate, "is THE date WE should ALL see");
    };

    return (
        <div>
            {console.log("In sidebar", stopData)}
            <h2>Select Origin</h2><br/>
            <Select options = {options} onChange={changeBegin}/><br/>
            <h2>Select Destination</h2><br/>
            <Select options = {options} onChange={changeEnd}/><br/>
            <h2>Select Date and Time</h2>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker format={"y-MM-dd HH:mm"} minDate={new Date()} maxDate={addDays(new Date(), 13)} onChange={changeDate} value={chosenDate}/>
            </MuiPickersUtilsProvider>
            <Button text="Find Route" onClick={setJourney} />
                    <br/>
        </div>
    )
}

export default SidebarInputFields
