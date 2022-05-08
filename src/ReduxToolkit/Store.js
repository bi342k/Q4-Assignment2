import { configureStore } from "@reduxjs/toolkit";
import {useDispatch, useSelector} from 'react-redux'
import parentReducer from './ParentReducers.js'
// import {web3Reducer} from './configBCReducer'

const store = configureStore({
    reducers: {
        parentReducer
    }
})

export const useAppDispatch = ()=> useDispatch();
export const useAppSelection = useSelector;
export default store;
