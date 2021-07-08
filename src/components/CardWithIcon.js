import React from "react";

export default function CardWithIcon(props) {
  return (
    <div
      {...props}
      style={{
        width: 220,
        height: 120,
        backgroundColor: props.bgColor,
        borderRadius: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="cardText"
        style={{
          width: "75%",
          height: "70%",
          justifyContent: "space-around",
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p style={{ fontWeight: 500, color: props.headerColor }}>
          {props.text}
        </p>
        <p style={{ color: props.textColor, fontWeight: 500 }}>
          {props.number}
        </p>
      </div>
      {props.icon}
    </div>
  );
}
