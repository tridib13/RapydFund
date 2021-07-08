import React, {useEffect, useState} from 'react'

import NavMenu from '../components/NavMenu'
import CardWithIcon from '../components/CardWithIcon'
import Transaction from '../components/Transaction'

import {Icon} from 'react-icons-kit'
import {stack} from 'react-icons-kit/icomoon/stack'
import {bullseye} from 'react-icons-kit/fa/bullseye'
import {dollar} from 'react-icons-kit/fa/dollar'

import { CircularProgressbar } from 'react-circular-progressbar';
import WithdrawModal from "../components/WithdrawModal";
import 'react-circular-progressbar/dist/styles.css';

import '../pages/css/Crowdfunder.css'
import axios from 'axios'

export default function Crowdfunder(props) {

    const [name, setname] = useState("Loading...")
    const [description, setdescription] = useState("Loading...")
    const [goal, setgoal] = useState("Loading...")
    const [donated, setdonated] = useState("Loading...")
    const [goalmet, setgoalmet] = useState(false)
    const [loading, setloading] = useState(true)

    const [percentage, setpercentage] = useState(0)
    const [transactions, settransactions] = useState([])

    const [withdrawModal, setwithdrawModal] = useState(false)

    const getWalletBalance = async (ewallet = "ewallet_8c2afe72ec5d7d4909eb4101935abf42") => {

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

        return response.data.balance
    };

    const getCampaignInfo = async () => {
        const response = await axios.get("http://localhost:5000/getCampaign/");
        
        setname(response.data.campaign.name);
        setdescription(response.data.campaign.description);
        setgoal(response.data.campaign.goal);
        setdonated(await getWalletBalance())
      };

    const getBlockchain = async () => {
        if(props.gettransactionfrom)
            settransactions(await props.gettransactionfrom("Abia Ebola Control").call())
    }

    useEffect(() => {
        getBlockchain()
    }, [props])

    useEffect(() => {
        console.log(transactions);
        setloading(false)
    }, [transactions])

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

    const showModal = () => {
        return (
            <WithdrawModal
              account = {props.account}
              gettransactionfrom = {props.gettransactionfrom}
              recordtransaction = {props.recordtransaction}
              show={withdrawModal}
              campaign={name}
              description={description}
              source_ewallet="ewallet_8c2afe72ec5d7d4909eb4101935abf42"
              closeModal={() => {
                setwithdrawModal(false);
              }}
            />
    )}
    
    useEffect(() => {
        getCampaignInfo();
    }, []);
    useEffect(() => {
        console.log(transactions);
    }, [transactions]);

    useEffect(() => {
        setpercentage(Math.round((donated / goal) *  100, 2))
    }, [goal, donated])

    useEffect(() => {
       getWalletBalance()
    }, [goal])

    const renderTransactions = () => {
        if(loading === false)
            return "Loading Transactions..."
        
            console.log(transactions);
        const transactionsList = transactions.map((transaction, idx) => (
                <Transaction bgColor= 'rgba(115, 149, 174, 0.5)' source_ewallet={transaction.source_ewallet} destination_ewallet={transaction.destination_ewallet} amount = {transaction.amount.toString()}/>
        ))
        
        settransactions(transactionsList)
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100%', fontFamily: 'Montserrat', backgroundColor: 'rgba(85, 122, 149, 0.3'}} className="wrapper">
            {showModal()}
            <div className="container" style={{width: '90%', height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 30, paddingLeft: 30, boxShadow: '2px -1px 38px -1px rgba(0,0,0,0.4)'}}>
                
                <NavMenu/>
                <div className="dashboard-container" style={{ width: '80%', height: '80%', }}>
                    <div className="inner-dashboard" style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column', height: '100%'}}>
                        <div className="heading" style={{width: '90%'}}>
                            <p>Dashboard</p>
                            <p style={{color: 'rgba(0,0,0,0.4)', fontSize: 13}}>Home / Dashboard</p>
                            <div
                                className="walletfund"
                                style={{
                                position: "absolute",
                                right: 250,
                                top: 190
                                }}
                            >
                                {donated != "Loading..." ? `Wallet: $${donated}` : "Loading Wallet..."}
                            </div>
                        </div>
                        <div className="cards" style={{width: '90%'}}>
                            <CardWithIcon bgColor= 'rgba(115, 149, 174, 0.5)' text="Campaign" number={name} icon={<Icon icon={stack} size={25}/>}/>
                            <CardWithIcon bgColor= 'rgba(115, 149, 174, 0.5)' text="Goal" number={goal} icon={<Icon icon={bullseye} size={25}/>}/>
                            <CardWithIcon onClick = {() => setwithdrawModal(true)} bgColor= 'rgba(115, 149, 174, 0.5)' text="Investment" number={goalmet ? goal : donated} icon={<Icon icon={dollar} size={25}/>}/>
                        </div>
                        
                        <div className="transactionHistory" style={{ width: '90%', display: 'flex'}}>
                            <div style={{width: '60%', height: '100%'}}>
                                <p>Transaction History</p>
                                <div className="transactions" style={{ height: '80%'}}>
                                    {transactions[0] != undefined ? <Transaction bgColor= 'rgba(115, 149, 174, 0.5)' source_ewallet={transactions[0].source_ewallet} destination_ewallet={transactions[0].destination_ewallet} amount = {transactions[0].amount.toString()} timestamp = {transactions[0].timestamp.toString()}/> 
                                    : 
                                    null }
                                </div>
                            </div>

                           <div className="chart" style={{width: '36%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',marginLeft: 30}}>
                               <div className="progressbar" style={{width: '60%'}}>
                                    <CircularProgressbar value={goalmet ? 100 : percentage} text={`${goalmet ? 100 : percentage}%`} 
                                    styles={{
                                        
                                        path: {
                                          // Path color
                                          stroke: `rgba(85, 122, 149, ${percentage / 100})`,
                                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                          strokeLinecap: 'butt',
                                          // Customize transition animation
                                          transition: 'stroke-dashoffset 0.5s ease 0s',
                                          // Rotate the path
                                        },
                                        // Customize the circle behind the path, i.e. the "total progress"
                                        trail: {
                                          // Trail color
                                          stroke: 'rgba(115, 149, 174, 0.2)',
                                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                          strokeLinecap: 'butt',
                                          // Rotate the trail
                                          transform: 'rotate(0.25turn)',
                                          transformOrigin: 'center center',
                                        },
                                        // Customize the text
                                        text: {
                                          // Text color
                                          fill: 'rgba(115, 149, 174, 1)',
                                          // Text size
                                          fontSize: '16px',
                                          fontFamily: 'Montserrat'
                                        },
                                        // Customize background - only used when the `background` prop is true
                                        background: {
                                          fill: '#3e98c7',
                                        },
                                      }}/>
                                </div>
                           </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
