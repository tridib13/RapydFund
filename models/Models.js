const mongoose = require("mongoose");

const CreateWalletSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  ewallet_ref: String,
  contact: {
    contact_type: { type: String, default: "person" },
  },
  ewallet: String,
  email: String,
  phone_number: String,
});

const Investor = new mongoose.model("Investor", CreateWalletSchema);
const Crowdfunder = new mongoose.model("Crowdfunder", CreateWalletSchema);
const Company = new mongoose.model("Company", CreateWalletSchema);

module.exports = { Investor, Crowdfunder, Company };
