const { makeRequest } = require("../utilities");

// {
// 	"amount": 100,
// "currency": "USD",
// "source_ewallet": "ewallet_9de3eabd299a5530b80dca9ae91d1df4",
// "destination_ewallet": "ewallet_487764df9610d450021b4c3fb274a4fb"
// }

const walletToWallet = async (
  amount,
  currency,
  source_ewallet,
  destination_ewallet
) => {
  try {
    const res = await makeRequest("post", "/v1/account/transfer", {
      amount,
      currency,
      source_ewallet,
      destination_ewallet,
    });

    if (res.body.data.status == "PEN") await confirmPayment(res.body.data.id);
    res.body.data.status = "CLO";
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

const confirmPayment = async (paymentId) => {
  await makeRequest("post", "/v1/account/transfer/response", {
    id: paymentId,
    metadata: {
      merchant_defined: "accepted",
    },
    status: "accept",
  });
};

module.exports = { walletToWallet };
