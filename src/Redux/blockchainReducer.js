import * as actionType from './ActionType';

const initialState = {
    provider: null,
    contract: null,
    accounts: [],
    txnSigner: null,
    web3ErrMsg: null,
    loaded: false
}

const blockchainReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.LOAD_BLOCKCHAIN:
            return {
                ...state,
                provider: action.payload.provider,
                contract: action.payload.contract,
                accounts: action.payload.accounts,
                txnSigner: action.payload.txSigner,
                loaded: true
            }
        
        case actionType.ERROR: 
        return{
            ...state,
            web3ErrMsg: action.payload.web3ErrMsg
        }
        default: return state;
    }

}

export default blockchainReducer;