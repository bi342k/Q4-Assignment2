import { ethers } from "ethers";
import { CONTRACT_ADDRESS, ABI, OWNER_ADDRESS } from '../../Contract/Contract';
import { useDispatch } from "react-redux";
import { actionLoadBlockchain, actionError } from '../../Redux/Actions'
import { useState } from "react";

const LoadBlockchain = () => {
    const [chainMsg, setChainMsg] = useState("Load BlockChain");
    const dispatch = useDispatch();
    const { ethereum } = window;
    const loadChain = async () => {
        if (!ethereum) {
            alert("Please install Metamask first");
            return dispatch(actionError("Please install Metamask/wallat first"));
        }

        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
            const accounts = await provider.send("eth_requestAccounts", []);
            // const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            const signer = provider.getSigner();
            const txSigner = contract.connect(signer);
            // const balance = await provider.getBalance("ethers.eth");
            console.log("Account Address : ", accounts[0]);
            const balance = await provider.getBalance(accounts[0]);
            console.log("Current Balance : ", ethers.utils.formatEther(balance))
            dispatch(actionLoadBlockchain(provider, contract, accounts, txSigner));
            setChainMsg("Blockchain Loaded");
        } catch (error) {
            dispatch(actionError(error));
        }

    }
    return (
        <>
            <button onClick={() => loadChain()}>{chainMsg}</button>
        </>
    )

}

export default LoadBlockchain;