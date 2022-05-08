import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ethers } from 'ethers';
import '../../Components.css'

export const DisplayData = () => {
    const contract = useSelector(state=>state.blockchainReducer.contract);
    const accounts = useSelector(state=>state.blockchainReducer.accounts);
    const loaded = useSelector(state=>state.blockchainReducer.loaded);
    const [tName, setTName] = useState();
	const [tSymbol, setTSymbol] = useState();
	const [tSupply, setTSupply] = useState();
	const [tBalance, setTBalance] = useState();
	const [tDecimals, setTDecimials] = useState();
	// const [tAllowance, setTAllowance] = useState();
    
    const contractData = async () => {
		try {
		
			const tokenName = await contract.name();
			console.log("Token Name : ", tokenName);
			setTName(tokenName);

			const tokenSymbol = await contract.symbol();
			console.log("Token Symbol : ", tokenSymbol);
			setTSymbol(tokenSymbol);

			const totalSupply = await contract.totalSupply();
			console.log("Total Supply : ", ethers.utils.formatEther(totalSupply));
			setTSupply(ethers.utils.formatEther(totalSupply));

			const tokenDecimals = await contract.decimals();
			console.log("Your token decimals : ", ethers.utils.formatEther(tokenDecimals));
			setTDecimials(ethers.utils.formatEther(tokenDecimals));

			const tokenBalance = await contract.balanceOf(accounts[0]);
			console.log("Your token balance : ", ethers.utils.formatEther(tokenBalance));
			setTBalance(ethers.utils.formatEther(tokenBalance));

			// const tokenAllowance = await contract.allowance(contractOwner, currentAccount);
			// console.log("Your token Allowance : ", ethers.utils.formatEther(tokenAllowance));
			// setTAllowance(ethers.utils.formatEther(tokenAllowance))
			// setLoadContract("Contract Loaded");

		} catch (error) {
			console.log("Error : ", error);
		}

	}
 
    useEffect(()=>{
        if(loaded){
            contractData()
        }
    },[loaded])
    return (
        <>
            <h1 style={{color:'blue'}}>DISPLAY CONTRACT DATA</h1>
 
            <div className='div-align-left'>
				<table className="table">
					<tbody>
						<tr>
							<td><b>Token Name: </b></td>
							<td><span>{tName}</span></td>
						</tr>
						<tr>
							<td><b>Token Symbol:</b> </td>
							<td><span>{tSymbol}</span></td>
						</tr>
						<tr>
							<td><b>Total Supply: </b></td>
							<td><span>{tSupply}</span></td>
						</tr>
						<tr>
							<td><b>Decimals: </b></td>
							<td><span>{tDecimals}</span></td>
						</tr>
						
						<tr>
							<td><b>Your Token Balance :</b> </td>
							<td><span>{tBalance}</span></td>
						</tr>
						{/* <tr>
							<td><b>Your Token Allowance :</b> </td>
							<td><span>{tAllowance}</span></td>
						</tr> */}
					</tbody>
				</table>
			</div>
            {/* <button onClick={()=>isLoaded()}>Display</button> */}
        </>
    )
}
