import axios from "axios";
import React, { useState } from "react";

import { Modal } from "react-bootstrap";

export default function InvestmentModal(props) {
  const [amount, setAmount] = useState(0);
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
        <h4>Fund {props.campaign}?</h4>
        <p style={{ marginTop: 40 }}>
          {props.description}. Please input how much you would like to fund this
          compaign.
        </p>
        <div className="input">
          <input
            autocomplete="off"
            style={{ fontFamily: "Montserrat" }}
            placeholder="2000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
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
                amount,
                currency: "USD",
                source_ewallet: props.source_ewallet,
                destination_ewallet: "ewallet_8c2afe72ec5d7d4909eb4101935abf42",
              },
            });
            setTimeout(() => {
              window.location.reload();
            }, 1500);
            props.closeModal();
          }}
        >
          Fund!
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
  );
}
