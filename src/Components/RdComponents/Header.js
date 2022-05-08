import React from 'react'
import { useSelector } from 'react-redux'
import LoadBlockchain from './loadBlockchain'

const Header = () => {
  const accounts = useSelector(state=>state.blockchainReducer.accounts);
  return (
    <>
      <h1 style={{color:'blue'}}>LOAD BLOCKCHAIN</h1>
      <h5>Connected Account Address : {accounts[0]}</h5>
      <LoadBlockchain/>
    </>
  )
}

export default Header