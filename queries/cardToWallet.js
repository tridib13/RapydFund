const { makeRequest } = require("../utilities");

// {
// 	"amount": 200,
// 	"currency": "USD",
// 	"payment_method": {
// 		"type": "us_visa_card",
// 		"fields": {
// 			"number": "4111111111111111",
// 			"expiration_month": "12",
// 			"expiration_year": "23",
// 			"name": "John Doe",
// 			"cvv": "345"
// 		},
// 	},
//     "ewallet": "ewallet_b5627f0875a492ed0ea566e2f584cb6e",
// 	"capture": true
// }

const cardToWallet = async (card_details) => {
  const res = await makeRequest("post", "/v1/payments", card_details);
  console.log("Payment ID: ", res.body.data.id);
  if (!res.body.data.paid)
    await makeRequest("post", "/v1/payments/completePayment", {
      token: res.body.data.id,
    });

  return res;
};

module.exports = { cardToWallet };
