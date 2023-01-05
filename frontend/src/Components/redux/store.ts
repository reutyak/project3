import { combineReducers} from "redux";
import { configureStore} from "@reduxjs/toolkit"
import { vacationReducer } from "./vacationState";


//Union of all the reducers
const reducers = combineReducers({vacationState : vacationReducer});
//retention and externalization all the reducers in store variable.
export const store = configureStore({reducer : reducers});

//export const store = createStore(vacationReducer);