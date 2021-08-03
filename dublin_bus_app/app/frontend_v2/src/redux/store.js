import { configureStore } from "@reduxjs/toolkit";
import originReducer from "./origin";
import destinationReducer from "./destination";
import directionsRenderBooleanReducer from "./directionsRenderBool";
import directionsResponseBooleanReducer from "./directionsResponseBool"
import showAllStopsBooleanReducer from "./showAllStopsBool";
import journeyDateReducer from "./journeyDate"

export default configureStore({
    reducer: {
        origin: originReducer,
        destination : destinationReducer,
        directionsRenderBoolean : directionsRenderBooleanReducer,
        directionsResponseBoolean: directionsResponseBooleanReducer,
        showAllStopsBoolean : showAllStopsBooleanReducer,
        journeyDate : journeyDateReducer,
    }
});