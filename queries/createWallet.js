const { makeRequest } = require("../utilities");

const getPayments = async () => {
  const res = await makeRequest("get", "/v1/payments?limit=2");
  return res;
};

const createWallet = async (wallet_details) => {
  const res = await makeRequest("post", "/v1/user", wallet_details);
  return res;
};

module.exports = { getPayments, createWallet };
