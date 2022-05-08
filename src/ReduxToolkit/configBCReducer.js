import {CONTRACT_ADDRESS, ABI} from '../Contract/Contract';
import { ethers } from 'ethers';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
    provider: null,
    contract: null,
    accounts: [],
    txnSigner:null,
    web3ErrMsg:null
}

export const loadBlockchain = createAsyncThunk('loadBlockchain', 
async(_, thunkAPT)=>{
try {
    const {ethereum} = window;
    if(!ethereum){
        return{
            web3ErrMsg: "Error connecting to your wallat"
        } 
    } else {
        const provider = new ethers.providers.Web3Provider(ethereum);
		const contract = new ethers.Contract(CONTRACT_ADDRESS , ABI, provider);
		const accounts = await provider.send("eth_requestAccounts", []);
		const signer = provider.getSigner();
		const txSigner = contract.connect(signer);
        return{
            provider,
            accounts,
            contract,
            txSigner
        }
		
    }
} catch (error) {
    console.log("Error : ", error);
}
})

const web3ConnectSlice = createSlice({
    name: "Web3Connect",
    initialState,
    reducer: {},
    extraReducers: {
        [loadBlockchain.fulfilled.toString()]: 
        (state, {payload})=>{
            state.provider = payload.provider;
            state.contract = payload.connect;
            state.accounts = payload.accounts;
            state.txnSigner = payload.txSigner;
        }
    }
})

export const web3Reducer = web3ConnectSlice.reducer;