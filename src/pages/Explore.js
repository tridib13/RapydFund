import React, {useEffect, useState} from 'react'
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom'


import './css/Explore.css'

import Card from '../components/Card'
import axios from 'axios';

export default function Explore(props) {

    const [crowdfunder, setCrowdfunder] = useState(null)

    const getCampaign = async () => {
        const response = await axios.get('http://localhost:5000/getCampaign')
        setCrowdfunder(response.data)
    }

    useEffect(() => {
        getCampaign()
    }, [])
    
    return (
        <div className="bg" style={{display: 'flex'}}>
            
            <div className="containerText" style={{width: '25vw', height: '50vh', display: 'flex', alignItems: 'center'}}>
                <div className="textContainer" style={{}}>
                <div className="text">
                    <div className="heading" style={{width: '75%', fontSize: 13}}>
                        <div className="header" style={{fontSize: 25}}>RapydFund<br/><br/></div>
                        <div className="desc">Crowdfunding made easy! <br/><br/>Choose a campaign and invest to kickstart your campaign now!</div>
                    </div>
                    <div className="iconContainer" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%'}}>
                        <Avatar src={require('../assets/me.jpeg')} round={true} size={60}/>
                        <p style={{fontSize: 13}}>By Random_Guy</p>
                    </div>
                </div>
            </div>
            </div>
            
            <div className="cardContainer" style={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div className="cards" style={{height: '80vh', width: '55vw',}}>
                    <Link to="/investor"><Card title={crowdfunder ? crowdfunder.campaign.name : "Loading..."} desc={crowdfunder ? crowdfunder.campaign.description : "Loading..."} bgColor="rgba(0, 0, 0, 0.68)" color="white" blur={8}/></Link>
                    <Card title="Go Green" desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, officia?" bgColor="rgba(14, 21, 38, 0.68)" color="white" blur={8}/>
                    <Card title="Go Green" desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, officia?" bgColor="rgba(36, 41, 52, 0.68)" color="white" blur={8}/>
                    <Card title="Go Green" desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, officia?" bgColor="rgba(242, 238, 241, 0.8)" color="black" blur={4}/>
                    <Card title="Go Green" desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, officia?" bgColor="rgba(248, 238, 241, 0.68)" color="black" blur={8}/>
                    <Card title="Go Green" desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, officia?" bgColor="rgba(242, 238, 241, 0.68)" color="black" blur={8}/>
                    <Card title="Go Green" desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, officia?" bgColor="rgba(117, 101, 160, 0.68)" color="white" blur={8}/>
                    <Card title="Go Green" desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, officia?" bgColor="rgba(108, 75, 199, 0.4)" color="white" blur={10}/>
                    <Card title="Go Green" desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, officia?" bgColor="rgba(100, 70, 160, 0.3)" color="white" blur={12}/>
                </div>
            </div>
        </div>
    )
}
