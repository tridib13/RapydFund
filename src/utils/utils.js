import React, { createContext } from "react";
import axios from "axios";

export const InvestorContext = createContext(null);

export const getWalletBalance = async (ewallet) => {
  const response = await axios.get("http://localhost:5000/getWallet/", {
    params: {
      ewallet,
    },
  });

  return response.data.balance;
};
