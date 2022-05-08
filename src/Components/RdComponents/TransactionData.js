import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../Components.css'
import { BigNumber } from 'bignumber.js'

const TransactionData = () => {

    const txSigner = useSelector(state => state.blockchainReducer.txnSigner);


    // const [changeFlag, setChangeFlag] = useState(false);

    const [mintToken, setMintToken] = useState();
    const [burnToken, setBurnToken] = useState();

    const [tfrAdd, setTfrAdd] = useState();
    const [tfrTkn, setTfrTkn] = useState();

    const [aprAdd, setAprAdd] = useState();
    const [aprTkn, setAprTkn] = useState();

    const [tfrFromAdd, setTfrFromAdd] = useState();
    const [tfrToAdd, setTfrToAdd] = useState();
    const [tfrFromTkn, setTfrFromTkn] = useState();

    const mintTokens = async (tokens) => {
        try {

            const tokensToMint = BigNumber(tokens * 10 ** 18).toFixed();
            console.log("Number is : ", tokensToMint);
            const tx = await txSigner._mint(tokensToMint);
            console.log("Token Minted Receipt : ", tx);
            document.getElementById("mint").value = "";
            // setChangeFlag(true);
            setMintToken("");
        } catch (error) {
            alert(error);
            document.getElementById("mint").value = "";
            // setChangeFlag(true);
        }

    }

    const burnTokens = async (tokens) => {
        try {
            const tokensToBurn = BigNumber(tokens * 10 ** 18).toFixed();
            const tx = await txSigner._burn(tokensToBurn);
            console.log("Token Burned Receipt : ", tx);
            document.getElementById("burn").value = "";
            // setChangeFlag(true);
            setBurnToken("")
        } catch (error) {
            console.log(error);
            document.getElementById("burn").value = "";
            // setChangeFlag(true);
        }

    }

    const transferTokens = async (addressTo, tokens) => {
        try {
            const tokensToTransfer = BigNumber(tokens * 10 ** 18).toFixed();
            const tx = await txSigner.transfer(addressTo, tokensToTransfer);
            console.log("Token transfer receipt", tx);
            // setChangeFlag(true);
            setTfrAdd("");
            setTfrTkn("");
            document.getElementById("tfrAdd").value = "";
            document.getElementById("tfrTkn").value = "";

        } catch (error) {
            console.log(error);
        }
    }

    const approveTokens = async (addressTo, tokens) => {
        try {
            const tokensToApprove = BigNumber(tokens * 10 ** 18).toFixed();
            const tx = await txSigner.approve(addressTo, tokensToApprove);
            console.log("Token approval receipt", tx);
            // setChangeFlag(true);
            setAprAdd("");
            setAprTkn("");
            document.getElementById("aprAdd").value = "";
            document.getElementById("aprTkn").value = "";

        } catch (error) {
            console.log(error);
        }
    }
    const transferFromTokens = async (addressFrom, addressTo, tokens) => {
        try {
            const tokensToTransfer = BigNumber(tokens * 10 ** 18).toFixed();
            const tx = await txSigner.transferFrom(addressFrom, addressTo, tokensToTransfer);
            console.log("Token transfer receipt", tx);
            // setChangeFlag(true);
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

    // useEffect(() => {
    // 	if (changeFlag) {
    // 		loadBlockchain();
    // 		Contract();
    // 		setChangeFlag(false);
    // 	};
    // }, [changeFlag]);

    return (
        <>
            <h1 style={{ color: 'blue' }}>BLOCKCHAIN TRANSACTIONS</h1>
            <div>
                <h3> MINT AND BURN TOKENS </h3>
                <table className="center">
                    <tbody>
                        <tr className='bc1'>
                            <td><b>Enter Token Numbers to Mint: </b></td>
                            <td><input type='text' id="mint" placeholder='Enter Address' onChange={e => setMintToken(e.target.value)} /></td>
                            <td><button onClick={() => { mintTokens(mintToken) }}>Min Tokens</button></td>
                        </tr>
                        <tr className='bc2'>
                            <td><b>Enter Token Numbers to Burn:</b> </td>
                            <td><input type='text' id="burn" placeholder='Enter Address' onChange={e => setBurnToken(e.target.value)} /></td>
                            <td><button onClick={() => { burnTokens(burnToken) }}>Burn Tokens</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br/>
            <div>
                <table className='center bc1'>
                    <tbody>
                        <tr>
                            <td>
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
                                                <button onClick={() => transferTokens(tfrAdd, tfrTkn)}>Transfer Tokens</button>
                                            </th>

                                        </tr>

                                    </tbody>
                                </table>
                            </td>
                            <td>
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
                                                <button onClick={() => approveTokens(aprAdd, aprTkn)}>Approve Tokens</button>
                                            </th>

                                        </tr>

                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* <div>
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
                                <button onClick={() => transferTokens(tfrAdd, tfrTkn)}>Transfer Tokens</button>
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
                                <button onClick={() => approveTokens(aprAdd, aprTkn)}>Approve Tokens</button>
                            </th>

                        </tr>

                    </tbody>
                </table>
            </div> */}
            <div>
                <h3>TRANSFER TOKENS FROM </h3>
                <table className='center bc1'>
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
                                <button onClick={() => transferFromTokens(tfrFromAdd, tfrToAdd, tfrFromTkn)}>Transfer From Tokens</button>
                            </th>

                        </tr>

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TransactionData