import { combineReducers } from "redux";
import {web3Reducer} from './configBCReducer'

const parentReducer = combineReducers({
    web3Reducer
})

export default parentReducer;