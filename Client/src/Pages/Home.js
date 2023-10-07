import React, { useEffect, useState } from "react";
import "../CSS/Home.css";

function Home() {
  const [blockchainData, setblockchainData] = useState([{}]);

  ///////////////////////////////////////////////////////////////////////////////////
  //
  // Function to get blockckain data, called immediately
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

  return (
    <div className="container">
      {typeof blockchainData.blocks === "undefined" ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="blockchain-data">
            <div className="blockchain-heading">blockchain.oss.unist.hr</div>
            <table className="blockchain-table">
              <thead>
                <tr>
                  <th>Blockchain field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Chain name</td>
                  <td>{blockchainData.chain}</td>
                </tr>
                <tr>
                  <td>Number of blocks (height)</td>
                  <td>{blockchainData.blocks}</td>
                </tr>
                <tr>
                  <td>Blockchain difficulty</td>
                  <td>{blockchainData.difficulty}</td>
                </tr>
                <tr>
                  <td>Median time</td>
                  <td>{formatTimestamp(blockchainData.mediantime)}</td>
                </tr>
                <tr>
                  <td>Size on disk</td>
                  <td>{blockchainData.size_on_disk}</td>
                </tr>
              </tbody>
            </table>
            <a
              href="https://bitcoin.org/en/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/bitcoin-logo.png"
                alt="Bitcoin"
                className="blockchain-image"
              />
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
