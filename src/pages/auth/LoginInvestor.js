import React, { Component, useContext, useState } from "react";

import "font-awesome/css/font-awesome.min.css";
import "../css/Login.css";
import image from "../loginLogo.png";
import { Link } from "react-router-dom";

import axios from "axios";

import { InvestorContext } from "../../utils/utils";

const LoginInvestor = (props) => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });

  const { investor, setInvestor } = useContext(InvestorContext);

  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:5000/investor", {
      data: {
        user,
      },
    });

    setInvestor(response.data);
  };

  return (
    <div style={{ height: '100vh', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
      <header className="header">
        <nav className="navbar navbar-expand-lg navbar-light py-3">
          <div className="container">
            {/* <!-- Navbar Brand --> */}
            <a href="#" className="navbar-brand">
              {/* <img src={} alt="logo" width="150" /> */}
            </a>
          </div>
        </nav>
      </header>

      <div style={{ width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{}}>
          {/* <!-- For Demo Purpose --> */}
          <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
            <img
              src={image}
              alt=""
              style={{ width: 330 }}
            />
            <h1>Create an Account</h1>
            <p className="font-italic text-muted mb-0" style={{textAlign: 'center'}}>
              Create an account as an investor or crowdfunder and go on a crowdfunding journey
              with RapydFund
            </p>
          </div>

          {/* <!-- Registeration Form --> */}
          <div>
            <form action="#">
              <div className="row">

                {/* <!-- Submit Button --> */}
                <div
                  className="form-group col-lg-12 mx-auto mb-0"
                  onClick={async () => await handleSubmit()}
                >
                  <Link
                    to="/investor/explore"
                    className="button-primary"
                    style={{width: '100%', textDecoration: 'none', color: 'white'}}
                  >
                    <span className="font-weight-bold" style={{color: 'white'}}>
                      Continue as an Investor
                    </span>
                  </Link>
                </div>

                {/* <!-- Divider Text --> */}
                <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                  <div className="border-bottom w-100 ml-5"></div>
                  <span className="px-2 small text-muted font-weight-bold text-muted">
                    OR
                  </span>
                  <div className="border-bottom w-100 mr-5"></div>
                </div>

                {/* <!-- Social Login --> */}
                <div className="form-group col-lg-12 mx-auto">
                  <Link
                    to="/crowdfunder"
                    className="button-secondary"
                    style={{width: '100%', textDecoration: 'none'}}
                  >
                    <span className="font-weight-bold" style={{color: 'white'}}>
                      Continue as a Crowdfunder
                    </span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginInvestor;
