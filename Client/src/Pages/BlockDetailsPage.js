import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/BlockDetails.css";

function BlockDetailsPage() {
  const [blockHeight, setBlockHeight] = useState("");
  const [blockData, setBlockData] = useState("");
  const [blockchainData, setblockchainData] = useState([{}]);
  const [selectedOption, setSelectedOption] = useState("Height");
  const [inputPlaceholder, setInputPlaceholder] =
    useState("Enter block height");
  const [showTransactions, setShowTransactions] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);

  ///////////////////////////////////////////////////////////////////////////////////
  //
  // Format UNIX Timestamp to human readable time
  //
  ///////////////////////////////////////////////////////////////////////////////////
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000); // Date expects miliseconds

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months starts from 0
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${day}.${month}.${year} - ${hours}:${minutes}:${seconds}`;
  };

  ///////////////////////////////////////////////////////////////////////////////////
  //
  // Get block data by provided block height or hash
  //
  ///////////////////////////////////////////////////////////////////////////////////
  const handleSearch = (e, searchData) => {
    e.preventDefault();

    if (selectedOption === "Height") {
      if (
        Number(searchData) > 0 &&
        Number(searchData) <= blockchainData.blocks
      ) {
        fetch("http://localhost:5000/getBlockInformation/" + searchData)
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else {
              throw new Error("Invalid response");
            }
          })
          .then((result) => {
            setBlockData(result);
          })
          .catch((error) => {
            console.error("Error:", error);
            setInvalidInput(true);
          });
      } else {
        console.error("Invalid input");
        setInvalidInput(true);
      }
    } else if (selectedOption === "Hash") {
      fetch("http://localhost:5000/getBlockByHash/" + searchData)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error("Invalid response");
          }
        })
        .then((result) => {
          setBlockData(result);
          console.log(result);
        })
        .catch((error) => {
          console.error("Error:", error);
          setInvalidInput(true);
        });
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////
  //
  // Function to get blockckain data
  // Needed only to check if input height is correct, otherwise overflow can happen
  //
  ///////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    fetch("/startPage")
      .then((response) => response.json())
      .then((data) => {
        setblockchainData(data);
      });
  }, []);

  ///////////////////////////////////////////////////////////////////////////////////
  //
  // Function to listen changes on selectedOption
  // Used to modify input field placeholder
  //
  ///////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (selectedOption === "Height") {
      setInputPlaceholder("Enter block height");
    } else if (selectedOption === "Hash") {
      setInputPlaceholder("Enter block hash");
    }
  }, [selectedOption]);

  ///////////////////////////////////////////////////////////////////////////////////
  //
  // Show table if there is blockData available
  //
  ///////////////////////////////////////////////////////////////////////////////////
  const blockInfoJSX = blockData ? (
    <div className="block-details-container">
      <table className="block-details-table">
        <tbody>
          <tr>
            <th colSpan="2">BLOCK DETAILS</th>
          </tr>
          <tr>
            <td>Block height</td>
            <td>{blockData.height}</td>
          </tr>
          <tr>
            <td>Block hash</td>
            <td>{blockData.hash}</td>
          </tr>
          <tr>
            <td>Block weight</td>
            <td>{blockData.weight}</td>
          </tr>
          <tr>
            <td>Size</td>
            <td>{blockData.size}</td>
          </tr>
          <tr>
            <td>Stripped block size</td>
            <td>{blockData.strippedsize}</td>
          </tr>
          <tr>
            <td>merkleroot</td>
            <td>{blockData.merkleroot}</td>
          </tr>
          <tr>
            <td>Next block hash</td>
            <td>{blockData.nextblockhash}</td>
          </tr>
          <tr>
            <td>Previous block hash</td>
            <td>{blockData.previousblockhash}</td>
          </tr>
          <tr>
            <td>Nonce</td>
            <td>{blockData.nonce}</td>
          </tr>
          <tr>
            <td>Confirmations</td>
            <td>{blockData.confirmations}</td>
          </tr>
          <tr>
            <td>Time</td>
            <td>{formatTimestamp(blockData.time)}</td>
          </tr>
          <tr>
            <td>Number of transactions</td>
            <td>{blockData.nTx}</td>
          </tr>
          <tr className="no-hover">
            <td colSpan="2">
              <button
                className="show-transactions-button"
                onClick={() => setShowTransactions(!showTransactions)}
              >
                {showTransactions
                  ? "Hide transactions"
                  : "Show all transactions"}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : null;

  ///////////////////////////////////////////////////////////////////////////////////
  //
  // Show Image only if there is nothing to show in BLOCK DETAILS table
  //
  ///////////////////////////////////////////////////////////////////////////////////
  const imageJSX = !blockData ? (
    <img
      src="/images/Bitcoin3.gif"
      alt="Centered Animation"
      className="centered-image"
    />
  ) : null;

  return (
    <div>
      <div className="block-details-form-container">
        <img
          src="/images/BlockchainAnimation.gif"
          alt="Left Animation"
          className="left-animation"
          autoPlay
        />
        <form onSubmit={(e) => handleSearch(e, blockHeight)}>
          <input
            type="text"
            placeholder={inputPlaceholder}
            value={blockHeight}
            onChange={(e) => setBlockHeight(e.target.value)}
            className="block-details-input" // Dodajte klasu za input
          />
          <select
            className="block-details-dropdown"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="Height">Height</option>
            <option value="Hash">Hash</option>
          </select>
          <button type="submit" className="block-details-button">
            Search
          </button>
        </form>
        <img
          src="/images/BlockchainAnimation.gif"
          alt="Right Animation"
          className="right-animation"
          autoPlay
        />
      </div>
      {imageJSX}
      {blockInfoJSX}
      {showTransactions && blockData.tx ? (
        <>
          <div className="centered-image-container2">
            <img
              src="/images/Transaction.gif"
              alt=""
              className="centered-image2"
            />
          </div>
          <h2 className="transaction-title2">Transactions</h2>
          <div className="transactions-container">
            {blockData.tx.map((tx, i) => (
              <div key={i} className="transaction-card">
                <img
                  src="/images/Right-Arrow.png"
                  alt="Transaction Icon"
                  className="first-image"
                />
                <div className="transaction-info">
                  <p className="transaction-title">Transaction {i + 1}</p>
                  <Link
                    to={`/transactionInformation/${tx}`}
                    key={i}
                    className="transaction-link"
                  >
                    <p>[{tx}]</p>
                  </Link>
                </div>
                <img
                  src="/images/Left-Arrow.png"
                  alt=""
                  className="second-image"
                />
              </div>
            ))}
          </div>
        </>
      ) : null}

      {invalidInput && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setInvalidInput(false)}>
              &times;
            </span>
            <p>Invalid input</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlockDetailsPage;
