import React from 'react'

export default function Card(props) {
    return (
        <div style={{width: '17vw', height: '17vw', backgroundColor: props.bgColor, backdropFilter: `blur(${props.blur}px)`, color: props.color}}>
            <div className="textContainer" style={{width: '100%', height: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', paddingLeft: 15}}>
                <h6 style={{fontWeight: 'bolder'}}>{props.title}</h6>
                <p style={{fontSize: 13}}>{props.desc}</p>
            </div>
            <p style={{paddingLeft: 15, fontSize: 10}}>More -></p>
        </div>
    )
}
