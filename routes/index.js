const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const { Investor } = require("../models/Models");

const { createWallet } = require("../queries/createWallet");
const { cardToWallet } = require("../queries/cardToWallet");
const { walletToWallet } = require("../queries/walletToWallet");
const { getWallet } = require("../queries/getWallet");

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/investor", async (req, res) => {
  const { first_name, last_name, email } = req.body.data.user;

  const ewallet_ref = first_name + last_name;

  const wallet_details = {
    first_name,
    last_name,
    email,
    ewallet_ref,
  };

  const response = await createWallet(wallet_details);
  console.log(response);
  const ewallet = response.body.data.id;

  const investor = await Investor.create({
    first_name: first_name,
    last_name: last_name,
    ewallet_ref: ewallet_ref,
    email: email,
    ewallet: ewallet,
  });

  res.send(investor);
});

router.get("/investor", async (req, res) => {
  res.send(await Investor.findById(req.body.id));
});

router.post("/cardToWallet", async (req, res) => {
  const currency = "USD";
  const capture = true;
  const { amount, payment_method } = req.body.data;
  console.log(amount);
  console.log(payment_method);
  mongoose.connection.db.collection("investors", (err, collection) => {
    if (err) console.log(err);
    else {
      collection.find({}).toArray(async function(err, data) {
        const ewallet = data[0].ewallet;

        const cardDetails = {
          amount,
          currency,
          payment_method,
          ewallet,
          capture,
        };

        await cardToWallet(cardDetails);
      });
    }
  });

  res.sendStatus(200);
});

router.post("/walletTowallet", async (req, res) => {
  const {
    amount,
    currency,
    source_ewallet,
    destination_ewallet,
  } = req.body.data;

  const response = await walletToWallet(
    amount,
    currency,
    source_ewallet,
    destination_ewallet
  );
  console.log(response.body);
  res.send(response.body);
});

router.get("/getWallet", async (req, res) => {
  const response = await getWallet(req.query.ewallet);
  
  if (req.query.crowdfunder)
  {
    mongoose.connection.db.collection('crowdfunders', (err, collection) => {
      if (err) console.log(err);
      else 
      {
        collection.find({}).toArray(async function(err, data) 
        {
          if(data[0].goalMet)
            return res.send({ balance: response.body.data.accounts[0].balance, goalMet: true })
          else
            res.send({ balance: response.body.data.accounts[0].balance, goalMet: false });
        })}
    })
  }
  else
    res.send({ balance: response.body.data.accounts[0].balance, goalMet: false });
});

router.post('/createCrowdfunder', async (req, res) => {
  const { campaign, accounts } = req.body.data;

  const wallet_details = {
    first_name,
    last_name,
    email,
    ewallet_ref,
  };

  const response = await createWallet(wallet_details);
  console.log(response);
  const ewallet = response.body.data.id;

  const investor = await Investor.create({
    first_name: first_name,
    last_name: last_name,
    ewallet_ref: ewallet_ref,
    email: email,
    ewallet: ewallet,
  });

  res.send(investor);
})

router.get('/getCampaign', async (req, res) => {
  mongoose.connection.db.collection('crowdfunders', (err, collection) => {
    if (err) console.log(err);
    else {
      collection.find({}).toArray(async function(err, data) {
        res.send(data[0])
      })}
  })
})

module.exports = router;
