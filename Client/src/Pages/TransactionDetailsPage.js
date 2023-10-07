import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../CSS/TransactionDetails.css";

function TransactionDetailsPage() {
  const { transactionId } = useParams();
  const [transactionIdForm, setTransactionIdForm] = useState("");
  const [transactionData, setTransactionData] = useState({});
  const [transactionFee, setTransactionFee] = useState(undefined);
  const [showErrorModal, setShowErrorModal] = useState(false);

  ///////////////////////////////////////////////////////////////////////////////////
  //
  // Function for fetching transaction fee from the server.
  //
  ///////////////////////////////////////////////////////////////////////////////////
  const FindFee = (searchTxId) => {
    fetch(`http://localhost:5000/findFee/${searchTxId}`)
      .then((response) => response.json())
      .then((result) => {
        setTransactionFee(result);
      });
  };

  ///////////////////////////////////////////////////////////////////////////////////
  //
  // Function for fetching transaction data from the server.
  // Called when transaction ID is provided over URL
  //
  ///////////////////////////////////////////////////////////////////////////////////
  const fetchTransactionData = (txid) => {
    if (!transactionId && !transactionIdForm) {
      return;
    }
    FindFee(txid);
    fetch(`http://localhost:5000/getTransactionDetails/${txid}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Invalid response");
        }
      })
      .then((result) => {
        setTransactionData(result);
        setShowErrorModal(false);
      })
      .catch((error) => {
        setShowErrorModal(true); //
        console.error("Error:", error);
      });
  };

  ///////////////////////////////////////////////////////////////////////////////////
  //
  // Function for fetching transaction data from the server.
  // Called when transaction ID is provided over form
  //
  ///////////////////////////////////////////////////////////////////////////////////
  const SearchTransaction = (e, searchTxId) => {
    e.preventDefault();
    setTransactionIdForm(searchTxId);
    fetchTransactionData(searchTxId);
  };

  ///////////////////////////////////////////////////////////////////////////////////
  //
  // Function called when transactionId is changed, it can only be done over URL.
  //
  ///////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    fetchTransactionData(transactionId);
  }, [transactionId]);

  return (
    <div>
      <div className="transaction-details-form-container">
        <img
          src="/images/BlockchainAnimation.gif"
          alt="Left Animation"
          className="left-animation"
          autoPlay
        />
        <form onSubmit={(e) => SearchTransaction(e, transactionIdForm)}>
          <input
            type="text"
            placeholder="Enter transaction ID"
            value={transactionIdForm}
            onChange={(e) => setTransactionIdForm(e.target.value)}
            className="transaction-details-input"
          />
          <button type="submit" className="transaction-details-button">
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
      {Object.keys(transactionData).length > 0 ? (
        <div className="block-details-container">
          <table className="transaction-details-table">
            <tbody>
              <tr>
                <th
                  colSpan="2"
                  style={{
                    backgroundColor: "#f7931c",
                    textAlign: "center",
                    color: "black",
                  }}
                >
                  TRANSACTION DETAILS
                </th>
              </tr>
              <tr>
                <td>Transaction ID</td>
                <td>{transactionData.txid}</td>
              </tr>
              <tr>
                <td>Tx Hash</td>
                <td>{transactionData.hash}</td>
              </tr>
              <tr>
                <td>Tx size</td>
                <td>{transactionData.size}</td>
              </tr>
              <tr>
                <td>Lock time</td>
                <td>{transactionData.locktime}</td>
              </tr>
              <tr>
                <td>Version</td>
                <td>{transactionData.version}</td>
              </tr>
              <tr>
                <td>Number of INs</td>
                <td>{transactionData.vin?.length || "Loading INs.."}</td>
              </tr>
              <tr>
                <td>Number of OUTs</td>
                <td>{transactionData.vout?.length || "Loading OUTs.."}</td>
              </tr>
              <tr>
                <td>Size</td>
                <td>{transactionData.size} bytes</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>{transactionData.weight}</td>
              </tr>
              <tr>
                <td>Transaction Fee</td>
                <td>
                  {typeof transactionFee === "number"
                    ? transactionFee.toLocaleString("en-US")
                    : "Loading Fee.."}{" "}
                  Satoshi
                </td>
              </tr>
            </tbody>
          </table>
          <div class="centered-gif-container">
            <img
              src="/images/Transaction_Succesfull.gif"
              alt="Centrirani GIF"
              class="centered-gif"
            />
          </div>
        </div>
      ) : (
        <div className="centered-image-container">
          <img
            src="/images/Transaction-Animation.gif"
            alt="Centered Animation"
            className="centered-image"
          />
        </div>
      )}
      {showErrorModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowErrorModal(false)}>
              &times;
            </span>
            <h2>Wrong Input</h2>
            <p>Please enter a valid transaction ID.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionDetailsPage;
