const { makeRequest } = require("../utilities");

const getWallet = async (ewallet) => {
  const res = await makeRequest("get", `/v1/user/${ewallet}`);
  return res;
};

module.exports = { getWallet };
