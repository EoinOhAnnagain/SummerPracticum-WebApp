import React from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import eventBus from './eventBus';
import { useSelector, useDispatch } from 'react-redux';

const JourneySelect = ({stopData}) => {
   const { journey } = useSelector((state) => state.journey)
   const dispatch = useDispatch();

    console.log(stopData, "in journey")
    //const stops = stopData.stopData.stopData.stopData
    const options = stopData.map(stop => {
        return {value: stop.Latitude + "," + stop.Longitude, 
                label: stop.ShortCommonName_en + " | " + stop.PlateCode}
    })
    
    return (
        <Select options = {options}/>
    )
}

export default JourneySelect
