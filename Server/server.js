const express = require("express");
const app = express();
const bitcoinCore = require("bitcoin-core");
const cors = require("cors");
const { raw } = require("express");
const http = require("http");
const keepAliveAgent = new http.Agent({ keepAlive: true });

app.use(cors()); //Cross-Origin Resource Sharing politics - enable queries towards server

const client = new bitcoinCore({
  host: "blockchain.oss.unist.hr",
  agent: keepAliveAgent, // Use the Keep-Alive agent - Multiple TCP sessions
  username: "student",
  password: "IhIskjGukNz9bRpWJL0FBNXmlSBd1pS5AtJdG1zfavLaICBuP4VDPEPMu67ql7U3",
  port: 8332,
});

///////////////////////////////////////////////////////////////////////////////////
//
// Define /startPage HTTP route for this server
//
///////////////////////////////////////////////////////////////////////////////////
app.get("/startPage", async (req, res) => {
  try {
    const blockchainInfo = await getBlockchainInfo();
    res.json(blockchainInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

///////////////////////////////////////////////////////////////////////////////////
//
// Function to fetch blockchain informations from host
//
///////////////////////////////////////////////////////////////////////////////////
const getBlockchainInfo = async () => {
  try {
    const response = await client.getBlockchainInfo();
    return response;
  } catch (error) {
    throw error;
  }
};

///////////////////////////////////////////////////////////////////////////////////
//
// Function to fetch block informations from host with received block height
//
///////////////////////////////////////////////////////////////////////////////////
const getBlockInformation = async (size) => {
  try {
    const blockHash = await client.getBlockHash(parseInt(size));
    const block = await client.getBlock(blockHash);
    return block;
  } catch (error) {
    throw error;
  }
};

///////////////////////////////////////////////////////////////////////////////////
//
// Define /getBlockInformation HTTP route for this server
//
///////////////////////////////////////////////////////////////////////////////////
app.get("/getBlockInformation/:height", async (req, res) => {
  try {
    const height = parseInt(req.params.height);
    const block = await getBlockInformation(height);
    res.json(block);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

///////////////////////////////////////////////////////////////////////////////////
//
// Function to fetch blockc informations from host with received block hash
//
///////////////////////////////////////////////////////////////////////////////////
const getBlockByHash = async (hash) => {
  try {
    const block = await client.getBlock(hash);
    return block;
  } catch (error) {
    throw error;
  }
};

///////////////////////////////////////////////////////////////////////////////////
//
// Define /getBlockByHash HTTP route for this server
//
///////////////////////////////////////////////////////////////////////////////////
app.get("/getBlockByHash/:hash", async (req, res) => {
  try {
    const hash = req.params.hash;
    const block = await getBlockByHash(hash);
    res.json(block);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

///////////////////////////////////////////////////////////////////////////////////
//
// Define /getTransactionDetails HTTP route for this server
// Function used to get all transaction informations over transaction ID
//
///////////////////////////////////////////////////////////////////////////////////
app.get("/getTransactionDetails/:txId", async (req, res) => {
  try {
    const transaction = await client.getRawTransaction(req.params.txId);
    const decodedTransaction = await client.decodeRawTransaction(transaction);

    res.json(decodedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

///////////////////////////////////////////////////////////////////////////////////
//
// Function used to get transaction Fee with transaction fee calculation algorithm
//
///////////////////////////////////////////////////////////////////////////////////
const getFee = async (txId) => {
  try {
    var rawTransaction = await client.getRawTransaction(txId);
    var decodedRawTransaction = await client.decodeRawTransaction(
      rawTransaction
    );

    // Array for storing vout of all vIns
    var VOutsOfVIn = [];

    // Get all vOuts from vIns
    // Coinbase exception - doesn't have vOut
    for (var i = 0; i < decodedRawTransaction.vin.length; i++) {
      if (decodedRawTransaction.vin[i].coinbase != null) continue;
      VOutsOfVIn.push(decodedRawTransaction.vin[i].vout);
    }

    // Sum of vOuts
    var voutsOfVinTotal = 0;

    if (decodedRawTransaction.vin.length <= 0) {
      var tx2 = await client.getRawTransaction(
        // first vIn txId is enough to get transaction from which funds came from
        decodedRawTransaction.vin[0].txid
      );
      var tempDecoded = await client.decodeRawTransaction(tx2);

      // sum all amount of vOuts
      for (let i = 0; i < VOutsOfVIn.length; i++) {
        voutsOfVinTotal += tempDecoded.vout[VOutsOfVIn[i]].value;
      }
    }

    var voutCurrent = 0;
    // Count all vOuts but from current transaction
    for (var i = 0; i < decodedRawTransaction.vout.length; i++) {
      voutCurrent += decodedRawTransaction.vout[i].value;
    }

    // Convert BTC to Satoshi
    // 1 BTC = 100 000 000 Satoshi
    const feeInSatoshi = Math.floor(
      (voutsOfVinTotal === 0 ? voutCurrent : voutsOfVinTotal - voutCurrent) *
        1e8
    );

    return feeInSatoshi;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

///////////////////////////////////////////////////////////////////////////////////
//
// Define /findFee HTTP route for this server
//
///////////////////////////////////////////////////////////////////////////////////
app.get("/findFee/:txId", async (req, res) => {
  try {
    const fee = await getFee(req.params.txId);

    return res.json(fee);
  } catch (err) {
    console.log(err);
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000.");
});
