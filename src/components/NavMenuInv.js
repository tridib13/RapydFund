import React from 'react'

import { Link } from 'react-router-dom'


import '../pages/css/NavMenuInv.css'

export default function NavMenuInv() {
    return (
        <div style={{width: 270, height: '90%', borderRadius: 30, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'Montserrat'}} className="menu-container">
            <div className="inner" style={{width: '60%', height: '80%', display: 'flex', justifyContent: 'space-around', flexDirection: 'column'}}>
                <div className="heading">
                    <h4 style={{fontWeight: '800', color: 'white'}}>RapydFund.</h4>
                </div>
                <div className="menu" style={{color: 'white', fontWeight: 500, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '60%', fontSize: 14}}>
                    <p>Campaign</p>
                    <p>Goal</p>
                    <Link to="/investor/blockchain" style={{color: 'white', fontWeight: 500, textDecoration: 'none'}}><p>Blockchain</p></Link>
                    <p>Settings</p>
                </div>
                <div className="placeholder" style={{color: 'white', fontSize: 11}}>Crowdfunding done right.</div>
            </div>
        </div>
    )
}
