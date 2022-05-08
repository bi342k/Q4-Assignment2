import * as actionType from './ActionType';

export const actionLoadBlockchain = (pl_provider, pl_contract, pl_accounts, pl_txSigner)=>{
    return {
        type: actionType.LOAD_BLOCKCHAIN,
        payload: {
            provider: pl_provider,
            contract: pl_contract,
            accounts: pl_accounts,
            txSigner: pl_txSigner
        }
    }
}

export const actionError =(error)=>{
    return{
        type: actionType.ERROR,
        payload: {
            web3ErrMsg: error
        }
    }
}
