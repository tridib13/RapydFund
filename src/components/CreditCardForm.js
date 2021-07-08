import axios from "axios";
import React from "react";
import Cards from "react-credit-cards";

import "react-credit-cards/es/styles-compiled.css";
import "../pages/css/CreditCard.css";

export default class PaymentForm extends React.Component {
  state = {
    cvc: "",
    expiry: "",
    focus: "",
    name: "Mark Cuban",
    number: "4111111111111111",
    amount: "",
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div
        id="PaymentForm"
        style={{
          height: "100%",
          width: "70%",

          fontFamily: "Montserrat",
          fontSize: 13,
        }}
      >
        <div className="cardDetails">
          <Cards
            cvc={this.state.cvc}
            expiry={this.state.expiry}
            focused={this.state.focus}
            name={this.state.name}
            number={this.state.number}
          />
          <form style={{ marginTop: 50 }}>
            <input
              autocomplete="off"
              name="amount"
              value={this.state.amount}
              placeholder="Amount"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />{" "}
            <span>Cardholder's name:</span>
            <input
              autocomplete="off"
              type="text"
              value={this.state.name}
              name="name"
              placeholder="Linda Williams"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />{" "}
            <span>Card Number:</span>
            <input
              autocomplete="off"
              type="tel"
              value={this.state.number}
              name="number"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
              placeholder="0125 6780 4567 9909"
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "45%" }}>
                <span>Expiry date:</span>{" "}
                <input
                  autoComplete="off"
                  type="text"
                  value={this.state.expiry}
                  name="expiry"
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                  placeholder="YY/MM"
                />
              </div>
              <div style={{ width: "45%" }}>
                <span>CVV:</span>{" "}
                <input
                  autoComplete="off"
                  type="tel"
                  value={this.state.cvc}
                  name="cvc"
                  placeholder="786"
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                  id="cvv"
                />{" "}
              </div>
            </div>{" "}
          </form>
        </div>
        <button
          type="button"
          class="btn btn-success"
          onClick={() => {
            axios.post("http://localhost:5000/cardTowallet", {
              data: {
                amount: this.state.amount,

                payment_method: {
                  type: "us_visa_card",
                  fields: {
                    number: this.state.number,
                    expiration_month: "12",
                    expiration_year: "23",
                    name: this.state.name,
                    cvv: this.state.cvc,
                  },
                },
              },
            });
            this.props.closeModal();
          }}
        >
          Success
        </button>
      </div>
    );
  }
}
