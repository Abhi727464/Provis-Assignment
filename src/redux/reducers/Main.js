import { combineReducers } from "redux";
import { cartreducer } from "./Reducer";



const rootRed = combineReducers({
    cartreducer
});

export default rootRed;