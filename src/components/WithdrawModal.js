import axios from "axios";
import React, { useState, useEffect } from "react";

import { Modal } from "react-bootstrap";

export default function InvestmentModal(props) 
{ 
  const [withdrawamount, setwithdrawamount] = useState(0)
  const [accounts, setaccounts] = useState(props.accounts)
  const [accountSelected, setaccountSelected] = useState(null)

  const getCampaignInfo = async () => {
    const response = await axios.get("http://localhost:5000/getCampaign/");

    setaccounts(response.data.accounts);
  };

  useEffect(() => {
      getCampaignInfo()
  }, [])

  // useEffect(() => {
  //   console.log(accounts[accountSelected]);
  // }, [accountSelected])
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.campaign}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Withdraw? Send funds to your partners and let's do a whole lot of good together!</h4>
        <p style={{ marginTop: 40 }}>
          {props.description}. Please input how much you would like to withdraw from the fund.
        </p>

        <form style={{}}>
            {accounts != null ? accounts.map((account, i) => {
                return (
                    <CompanyBlock withdrawAmount = {(amount) => setwithdrawamount(amount)} account={i} name={account.name} setAccountSelected = {(account) => setaccountSelected(account)}/>
                )
            }) : null }
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button
          style={{
            backgroundColor: "#00B74A",
            color: "white",
            padding: "10px 60px",
            borderRadius: "5px",
            cursor: "pointer",
            borderWidth: 0,
          }}
          onClick={async () => {
            
            await axios.post("http://localhost:5000/walletTowallet", {
              data: {
                amount: withdrawamount,
                currency: "USD",
                source_ewallet: "ewallet_8c2afe72ec5d7d4909eb4101935abf42",
                destination_ewallet: accounts[accountSelected].ewallet,
              },
            });
            
            await props.recordtransaction("Abia Ebola Control", accounts[accountSelected].name, withdrawamount, "USD", Date.now()).send({from: props.account});
            
            setTimeout(() => {
              window.location.reload();
            }, 1500);
            props.closeModal();
          }}
        >
          Send!
        </button>
        <button
          style={{
            backgroundColor: "#F93154",
            color: "white",
            padding: "10px 60px",
            borderRadius: "5px",
            cursor: "pointer",
            borderWidth: 0,
          }}
          onClick={() => {
            props.closeModal();
          }}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  )
}

const CompanyBlock = (props) => {
    const [inputVisible, setinputVisible] = useState(0)
    return (
        <div style={{display: 'flex', width: '100%', height: '50px', borderWidth: 1, borderRadius: 5, marginBottom: 10, alignItems: 'center', borderColor: 'rgba(0,0,0,0.4)'}}>
            <div className="input" style={{width: '15%', textAlign: 'center',marginTop: '30px'}}>
                <input autocomplete="off" type="checkbox" onChange={() => {
                    props.setAccountSelected(props.account)
                    setinputVisible(inputVisible === 0 ? 1 : 0)
                }}/>
            </div>
            <div className="companyInfo" style={{ width: '50%'}}>
                {props.name}
            </div>
            <div className="input" style={{opacity: inputVisible, marginTop: '35px', marginLeft: '320px', fontFamily: 'Montserrat'}}>
                <input autocomplete="off" type="text" onChange={(e) => {props.withdrawAmount(e.target.value)}} placeholder="$"/>
            </div>
        </div>
    )
}
