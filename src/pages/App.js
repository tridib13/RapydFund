import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import LoginInvestor from "./auth/LoginInvestor";
import Explore from "./Explore.js";
import Crowdfunder from "./Crowdfunder.js";
import Investor from "./Investor";
import Blockchain from "../components/Blockchain";
import BlockchainInv from "../components/BlockchainInv"

import { InvestorContext } from "../utils/utils";

import Transaction from '../abis/Transaction.json'

import Web3 from 'web3'

function App() 
{
  const [investor, setInvestor] = useState(null);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  const loadBlockchainData = async () => 
  {
    const web3 = window.web3

    var accounts= await web3.eth.getAccounts();
    setaccount(accounts[0])

    const networkId = await web3.eth.net.getId()

    const TransactionData = Transaction.networks[networkId]

    if(TransactionData) 
    {
      const transaction = new web3.eth.Contract(Transaction.abi, TransactionData.address)

      const { recordTransaction, getTransactionFrom } = await transaction.methods

      setrecordtransaction(recordTransaction)
      setgettransaction(getTransactionFrom)

      // const res = await recordTransaction("ewallet_8c2afe72ec5d7d4909eb4101935abf42", "dest", 1, "USD", Date.now()).send({from: accounts[0]});
      // console.log("res: ", res)
      // console.log(await getTransactionFrom("ewallet_8c2afe72ec5d7d4909eb4101935abf42").call());
    }
  }

  useEffect(() => {
    loadWeb3()
    loadBlockchainData()
  }, [])

  const [recordtransaction, setrecordtransaction] = useState(null)
  const [gettransaction, setgettransaction] = useState(null)
  const [account, setaccount] = useState({})

  return (
    <Router>
      <InvestorContext.Provider value={{ investor, setInvestor }}>
        <Route path="/" exact component={LoginInvestor} />
        <Route path="/investor/explore" exact component={Explore} />
        <Route path="/crowdfunder" exact>
          <Crowdfunder gettransactionfrom={gettransaction} recordtransaction={recordtransaction} account={account}/>
        </Route>
        <Route path="/investor" exact>
          <Investor gettransactionfrom={gettransaction} recordtransaction={recordtransaction} account={account}/>
        </Route>
        <Route path="/crowdfunder/blockchain" exact>
          <Blockchain gettransactionfrom={gettransaction} recordtransaction={recordtransaction} account={account}/>
        </Route>
        <Route path="/investor/blockchain" exact>
          <BlockchainInv gettransactionfrom={gettransaction} recordtransaction={recordtransaction} account={account}/>
        </Route>
      </InvestorContext.Provider>
    </Router>
  );
}

export default App;
