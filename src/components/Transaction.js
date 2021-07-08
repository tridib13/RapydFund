import React, {useEffect, useState} from 'react'

export default function Transaction(props) {

    var date

    const [dateformatted, setdateformatted] = useState("")

    useEffect(() => {
        date = new Date(parseInt(props.timestamp) * 1000);

        setdateformatted(date.toUTCString());
    }, [props])

    return (
        <div style={{width: '100%', height: 150, backgroundColor: props.bgColor, borderRadius: 10, padding: 15, marginTop: 15}}>
            
            <div className="details" style={{width: '80%', fontSize: 12, color: props.textColor}}>

                <p>Source Wallet: {props.source_ewallet}</p>
                <p>Destination Wallet: {props.destination_ewallet}</p>
                <p>Amount: {props.amount}</p>
                <p>At: {dateformatted}
                </p>

            </div>
        </div>
    )
}
