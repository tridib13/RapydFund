import React, {useState, useEffect} from 'react'

import NavMenuInv from './NavMenuInv'
import Transaction from './Transaction'

export default function Blockchain(props) {

    const getBlockchain = async () => {
        if(props.gettransactionfrom)
            settransactions(await props.gettransactionfrom("Abia Ebola Control").call())
    }

    useEffect(() => {
        getBlockchain()
    }, [props])

    const [transactions, settransactions] = useState([])

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100%', fontFamily: 'Montserrat', backgroundColor: 'rgba(188, 169, 212, 0.3)'}} className="wrapper">
            <div className="container" style={{width: '90%', height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 30, paddingLeft: 30, boxShadow: '2px -1px 38px -1px rgba(0,0,0,0.4)'}}>
                <NavMenuInv/>
                <div className="transactions" style={{width: '80%', height: '80%', marginLeft: 50}}>
                    {console.log(transactions)}
                    {transactions != null ? transactions.map(transaction => {
                        return (
                            <div style={{width: '80%'}}>
                                <Transaction textColor="white" bgColor= 'rgba(188, 169, 212, 1)' source_ewallet={transaction.source_ewallet} destination_ewallet={transaction.destination_ewallet} amount = {transaction.amount.toString()} timestamp = {transaction.timestamp.toString()}/>
                            </div>
                        )
                    }) : null }

                </div>
            </div>
        </div>
    )
}
