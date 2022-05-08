import { useEffect, useState } from 'react';
import '../Components.css';
import * as contInstance from '../Contract/Contract';
import { ethers } from 'ethers';
import { BigNumber } from 'bignumber.js'
import { Table, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

const contractAddress = contInstance.CONTRACT_ADDRESS;
const contractAbi = contInstance.ABI;
const contractOwner = contInstance.OWNER_ADDRESS;

function ConnectWallat() {
	//Load Blockchain Instences
	const { ethereum } = window;
	const [currentAccount, setCurrentAccount] = useState();
	const [contract, setContract] = useState();
	const [txSigner, setTxSigner] = useState();
	
	const loadBlockchain = async ()=>{
		if (!ethereum) {
			alert("Please install Metamask first");
			return;
		} 

		try {
			const provider = new ethers.providers.Web3Provider(ethereum);
			const contract = new ethers.Contract(contractAddress, contractAbi, provider);
			setContract(contract);
			const accounts = await provider.send("eth_requestAccounts", []);
			// const accounts = await ethereum.request({method: 'eth_requestAccounts'});
			setCurrentAccount(accounts[0]);
			const signer = provider.getSigner();
			const txSigner = contract.connect(signer);
			setTxSigner(txSigner);


			// const balance = await provider.getBalance("ethers.eth");
			const balance = await provider.getBalance(accounts[0]);
			// console.log("Current Balance : ", balance)
			setGetBalance(ethers.utils.formatEther(balance));
			setWallat("Connected");
		} catch (error) {
			console.log(error);
		}

	}
	//----------------
	const [wallat, setWallat] = useState("Connect Wallat");
	const [loadContract, setLoadContract] = useState("Load Contract");

	const [changeFlag, setChangeFlag] = useState(false);

	const [tName, setTName] = useState();
	const [tSymbol, setTSymbol] = useState();
	const [tSupply, setTSupply] = useState();
	const [tBalance, setTBalance] = useState();
	const [tDecimals, setTDecimials] = useState();
	const [tAllowance, setTAllowance] = useState();

	const [mintToken, setMintToken] = useState();
	const [burnToken, setBurnToken] = useState();

	const [tfrAdd, setTfrAdd] = useState();
	const [tfrTkn, setTfrTkn] = useState();

	const [aprAdd, setAprAdd] = useState();
	const [aprTkn, setAprTkn] = useState();

	const [tfrFromAdd, setTfrFromAdd] = useState();
	const [tfrToAdd, setTfrToAdd] = useState();
	const [tfrFromTkn, setTfrFromTkn] = useState();
	
	
	
	const [getBalance, setGetBalance] = useState();

	const Contract = async () => {
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

			const tokenBalance = await contract.balanceOf(currentAccount);
			console.log("Your token balance : ", ethers.utils.formatEther(tokenBalance));
			setTBalance(ethers.utils.formatEther(tokenBalance));

			const tokenAllowance = await contract.allowance(contractOwner, currentAccount);
			console.log("Your token Allowance : ", ethers.utils.formatEther(tokenAllowance));
			setTAllowance(ethers.utils.formatEther(tokenAllowance))
			setLoadContract("Contract Loaded");
		} catch (error) {
			console.log("Error : ", error);
		}

	}

	const mintTokens = async (tokens) => {
		try {
			
			const tokensToMint = BigNumber(tokens * 10 ** 18).toFixed();
			console.log("Number is : ", tokensToMint);
			const tx = await txSigner._mint(tokensToMint);
			console.log("Token Minted Receipt : ", tx);
			document.getElementById("mint").value = "";
			setChangeFlag(true);
			setMintToken("");
		} catch (error) {
			alert(error);
			document.getElementById("mint").value = "";
			setChangeFlag(true);
		}

	}

	const burnTokens = async (tokens) => {
		try {
			const tokensToBurn = BigNumber(tokens * 10 ** 18).toFixed();
			const tx = await txSigner._burn(tokensToBurn);
			console.log("Token Burned Receipt : ", tx);
			document.getElementById("burn").value = "";
			setChangeFlag(true);
			setBurnToken("")
		} catch (error) {
			console.log(error);
			document.getElementById("burn").value = "";
			setChangeFlag(true);
		}

	}

	const transferTokens = async(addressTo, tokens)=>{
		try {
			const tokensToTransfer = BigNumber(tokens * 10 ** 18).toFixed();
			const tx = await txSigner.transfer(addressTo, tokensToTransfer);
			console.log("Token transfer receipt", tx);
			setChangeFlag(true);
			setTfrAdd("");
			setTfrTkn("");
			document.getElementById("tfrAdd").value = "";
			document.getElementById("tfrTkn").value = "";

		} catch (error) {
			console.log(error);
		}
	}

	const approveTokens = async(addressTo, tokens)=>{
		try {
			const tokensToApprove = BigNumber(tokens * 10 ** 18).toFixed();
			const tx = await txSigner.approve(addressTo, tokensToApprove);
			console.log("Token approval receipt", tx);
			setChangeFlag(true);
			setAprAdd("");
			setAprTkn("");
			document.getElementById("aprAdd").value = "";
			document.getElementById("aprTkn").value = "";

		} catch (error) {
			console.log(error);
		}
	}
	const transferFromTokens = async(addressFrom, addressTo, tokens)=>{
		try {
			const tokensToTransfer = BigNumber(tokens * 10 ** 18).toFixed();
			const tx = await txSigner.transferFrom(addressFrom, addressTo, tokensToTransfer);
			console.log("Token transfer receipt", tx);
			setChangeFlag(true);
			setTfrFromAdd("");
			setTfrToAdd("");
			setTfrFromTkn("");
			document.getElementById("tfrFromAdd").value = "";
			document.getElementById("tfrToAdd").value = "";
			document.getElementById("tfrFromTkn").value = "";

		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		if (changeFlag) {
			loadBlockchain();
			Contract();
			setChangeFlag(false);
		};
	}, [changeFlag]);

	return (
		<>
			<div className='div-align-left'>
				<table className="table">
					<tbody>
						<tr>
							<td><b>Address: </b></td>
							<td><span>{currentAccount}</span></td>
						</tr>
						<tr>
							<td><b>Current Balance:</b> </td>
							<td><span>{getBalance}</span></td>
						</tr>
					</tbody>
				</table>
			</div>
			<button onClick={() => loadBlockchain()}> {wallat} </button>

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
						<tr>
							<td><b>Your Token Allowance :</b> </td>
							<td><span>{tAllowance}</span></td>
						</tr>
					</tbody>
				</table>
			</div>
			<button onClick={() => Contract()}> {loadContract} </button>
			<br /> <br />
			<div>
				<h3> MINT AND BURN TOKENS </h3>
				<table className="center">
					<tbody>
						<tr>
							<td><b>Enter Token Numbers to Mint: </b></td>
							<td><input type='text' id="mint" placeholder='Enter Address' onChange={e => setMintToken(e.target.value)} /></td>
							<td><button onClick={() => { mintTokens(mintToken) }}>Min Tokens</button></td>
						</tr>
						<tr>
							<td><b>Enter Token Numbers to Burn:</b> </td>
							<td><input type='text' id="burn" placeholder='Enter Address' onChange={e => setBurnToken(e.target.value)} /></td>
							<td><button onClick={() => { burnTokens(burnToken) }}>burn Tokens</button></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div>
				<h3>TRANSFER TOKENS </h3>
				<table className='center'>
					<tbody>
						<tr>
							<td><b>Enter Address:</b> </td>
							<td><input type='text' id="tfrAdd" placeholder='Enter Address' onChange={e => setTfrAdd(e.target.value)} /></td>
						</tr>
						<tr>
							<td><b>Enter Tokens:</b> </td>
							<td><input type='text' id="tfrTkn" placeholder='Enter Tokens' onChange={e => setTfrTkn(e.target.value)} /></td>
						</tr>
						<tr >
							<th colSpan="2" >
								<button onClick={()=> transferTokens(tfrAdd, tfrTkn)}>Transfer Tokens</button>
							</th>
							
						</tr>

					</tbody>
				</table>
			</div>
			<div>
				<h3>APPROVE TOKENS </h3>
				<table className='center'>
					<tbody>
						<tr>
							<td><b>Enter Address:</b> </td>
							<td><input type='text' id="aprAdd" placeholder='Enter Address' onChange={e => setAprAdd(e.target.value)} /></td>
						</tr>
						<tr>
							<td><b>Enter Tokens:</b> </td>
							<td><input type='text' id="aprTkn" placeholder='Enter Tokens' onChange={e => setAprTkn(e.target.value)} /></td>
						</tr>
						<tr >
							<th colSpan="2" >
								<button onClick={()=> approveTokens(aprAdd, aprTkn)}>Approve Tokens</button>
							</th>
							
						</tr>

					</tbody>
				</table>
			</div>
			<div>
				<h3>TRANSFER TOKENS FROM </h3>
				<table className='center'>
					<tbody>
						<tr>
							<td><b>Enter Address From:</b> </td>
							<td><input type='text' id="tfrFromAdd" placeholder='Enter Address' onChange={e => setTfrFromAdd(e.target.value)} /></td>
						</tr>
						<tr>
							<td><b>Enter Address To:</b> </td>
							<td><input type='text' id="tfrToAdd" placeholder='Enter Address' onChange={e => setTfrToAdd(e.target.value)} /></td>
						</tr>
						<tr>
							<td><b>Enter Tokens:</b> </td>
							<td><input type='text' id="tfrFromTkn" placeholder='Enter Tokens' onChange={e => setTfrFromTkn(e.target.value)} /></td>
						</tr>
						<tr >
							<th colSpan="2" >
								<button onClick={()=> transferFromTokens(tfrFromAdd, tfrToAdd, tfrFromTkn)}>Transfer From Tokens</button>
							</th>
							
						</tr>

					</tbody>
				</table>
			</div>
		</>
	)
}

export default ConnectWallat;
