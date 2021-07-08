import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import NavMenuInv from "../components/NavMenuInv";
import CardWithIcon from "../components/CardWithIcon";
import Transaction from "../components/Transaction";
import CreditCardForm from "../components/CreditCardForm";
import InvestmentModal from "../components/InvestmentModal";

import { Icon } from "react-icons-kit";
import { stack } from "react-icons-kit/icomoon/stack";
import { bullseye } from "react-icons-kit/fa/bullseye";
import { dollar } from "react-icons-kit/fa/dollar";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Modal from "react-modal";

import "./css/Crowdfunder.css";
import { InvestorContext } from "../utils/utils";

export default function Investor(props) {
  const { investor, setInvestor } = useContext(InvestorContext);
  const [walletBalance, setWalletBalance] = useState("");

  const [name, setname] = useState("Loading...")
  const [description, setdescription] = useState("Loading...")
  const [goal, setgoal] = useState("Loading...")
  const [donated, setdonated] = useState("Loading...")
  const [goalmet, setgoalmet] = useState(false)

  const [loading, setloading] = useState(true)

  const [transactions, settransactions] = useState([])

  const [percentage, setpercentage] = useState(0)

  const getWalletBalance = async (ewallet = "ewallet_d61a2f1d9d90a42ec396c5a4a38d32b6") => {
    const response = await axios.get("http://localhost:5000/getWallet/", {
      params: {
        ewallet,
        crowdfunder: true,
        goal
      },
    });

    if(response.data.goalMet) {
      setgoalmet(true)
    }

    if(ewallet === "ewallet_d61a2f1d9d90a42ec396c5a4a38d32b6"){
      setWalletBalance(response.data.balance);
      return
    }

    return response.data.balance
  };

  var campaignWallet

  const getCampaignInfo = async () => {
    const response = await axios.get("http://localhost:5000/getCampaign/");

    campaignWallet = response.data.ewallet
    
    setname(response.data.campaign.name);
    setdescription(response.data.campaign.description);
    setgoal(response.data.campaign.goal);
    setdonated(await getWalletBalance(campaignWallet))
  };

  const getBlockchain = async () => {
    if(props.gettransactionfrom)
        settransactions(await props.gettransactionfrom("Abia Ebola Control").call())
  }

  useEffect(() => {
    getWalletBalance();
    getCampaignInfo();
  }, []);

  useEffect(() => {
    setpercentage(Math.round((donated / goal) *  100), 2)
  }, [goal, donated])

  useEffect(() => {
    getBlockchain()
  }, [props])

  useEffect(() => {
    console.log(transactions);
    setloading(false)
  }, [transactions])

  const [isModalOpen, setIsModal] = useState(false);
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  const creditCardModal = () => {
    return (
      <Modal style={modalStyles} isOpen={isModalOpen}>
        <CreditCardForm
          name="Mark Cuban"
          closeModal={() => {
            setIsModal(false);
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }}
        />
      </Modal>
    );
  };

  const investmentModal = () => {
    return (
      <InvestmentModal
        show={isInvestmentModalOpen}
        campaign={name}
        description={description}
        source_ewallet="ewallet_d61a2f1d9d90a42ec396c5a4a38d32b6"
        closeModal={() => {
          setIsInvestmentModalOpen(false);
        }}
      />
    );
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        fontFamily: "Montserrat",
        backgroundColor: "rgba(188, 169, 212, 0.3)",
      }}
      className="wrapper"
    >
      <div
        className="container"
        style={{
          width: "90%",
          height: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 30,
          paddingLeft: 30,
          boxShadow: "2px -1px 38px -1px rgba(0,0,0,0.4)",
        }}
      >
        {creditCardModal()}
        {investmentModal()}
        <NavMenuInv />
        <div
          className="dashboard-container"
          style={{ width: "80%", height: "80%" }}
        >
          <div
            className="inner-dashboard"
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <div
              className="heading"
              style={{
                width: "90%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="overviewText">
                <p>Dashboard</p>
                <p style={{ color: "rgba(0,0,0,0.4)", fontSize: 13 }}>
                  Home / Dashboard
                </p>
              </div>
              <div
                className="walletfund"
                style={{
                  marginRight: 35,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                {walletBalance
                  ? `Wallet: $${walletBalance}`
                  : "Loading Wallet..."}
                <button
                  style={{
                    backgroundColor: "rgba(188, 169, 212, 0.3)",
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "white",
                    width: 150,
                    fontSize: 13,
                    height: 30,
                    marginTop: 10,
                  }}
                  onClick={() => {
                    setIsModal(true);
                  }}
                >
                  Fund Wallet
                </button>
              </div>
            </div>
            <div className="cards" style={{ width: "90%" }}>
              <CardWithIcon
                headerColor="white"
                textColor="white"
                text="Campaign"
                number={name}
                icon={
                  <Icon icon={stack} size={25} style={{ color: "white" }} />
                }
                bgColor="rgba(188, 169, 212, 1)"
              />
              <CardWithIcon
                headerColor="white"
                textColor="white"
                text="Goal"
                number={goal}
                icon={
                  <Icon icon={bullseye} size={25} style={{ color: "white" }} />
                }
                bgColor="rgba(188, 169, 212, 1)"
              />
              <CardWithIcon
                onClick={() => {
                  setIsInvestmentModalOpen(true);
                }}
                headerColor="white"
                textColor="white"
                text="Investment"
                number={goalmet ? goal : donated}
                icon={
                  <Icon icon={dollar} size={25} style={{ color: "white" }} />
                }
                bgColor="rgba(188, 169, 212, 1)"
              />
            </div>

            <div
              className="transactionHistory"
              style={{ width: "90%", display: "flex" }}
            >
              <div style={{ width: "60%", height: "100%" }}>
                <p>Transaction History</p>
                <div className="transactions" style={{ height: '80%'}}>
                  {console.log(transactions)}
                  {transactions[0] != undefined ? 
                    <Transaction textColor="white" bgColor= 'rgba(188, 169, 212, 1)' source_ewallet={transactions[0].source_ewallet} destination_ewallet={transactions[0].destination_ewallet} amount = {transactions[0].amount.toString()} timestamp = {transactions[0].timestamp.toString()}/>
                    : null }

                </div>
              </div>

              <div
                className="chart"
                style={{
                  width: "36%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 30,
                }}
              >
                <div className="progressbar" style={{ width: "60%" }}>
                  <CircularProgressbar
                    value={goalmet ? 100 : percentage}
                    text={`${goalmet ? 100 : percentage}%`}
                    styles={{
                      path: {
                        // Path color
                        stroke: `rgba(188, 169, 212, ${percentage / 100})`,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "butt",
                        // Customize transition animation
                        transition: "stroke-dashoffset 0.5s ease 0s",
                        // Rotate the path
                      },
                      // Customize the circle behind the path, i.e. the "total progress"
                      trail: {
                        // Trail color
                        stroke: "#FFF1ED",
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "butt",
                        // Rotate the trail
                        transform: "rotate(0.25turn)",
                        transformOrigin: "center center",
                      },
                      // Customize the text
                      text: {
                        // Text color
                        fill: "rgba(188, 169, 212, 1)",
                        // Text size
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                      },
                      // Customize background - only used when the `background` prop is true
                      background: {
                        fill: "#3e98c7",
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
