import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import BlockDetailsPage from "./BlockDetailsPage";
import TransactionDetailsPage from "./TransactionDetailsPage";
import Learning from "./Learning";
import "../CSS/App.css";

function App() {
  return (
    <>
      <Router>
        <div className="topnav">
          <div className="column-center">
            <Link to="/">Home</Link>
            <Link to="/blockInformation">Block Information</Link>
            <Link to="/transactionInformation">Transaction details</Link>
            <Link to="/learning">Learning</Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blockInformation" element={<BlockDetailsPage />} />
          <Route
            path="/transactionInformation"
            element={<TransactionDetailsPage />}
          />
          <Route
            path="/transactionInformation/:transactionId"
            element={<TransactionDetailsPage />}
          />
          <Route path="/learning" element={<Learning />} />
        </Routes>
        <div className="bottom-div">
          <img
            src="/images/btc-bottom.png"
            alt="Left Logo"
            className="left-logo"
          />
          Marko Zdilar - OSS Bitcoin blockexplorer app
          <img
            src="/images/btc-bottom.png"
            alt="Right Logo"
            className="right-logo"
          />
        </div>
      </Router>
    </>
  );
}

export default App;
