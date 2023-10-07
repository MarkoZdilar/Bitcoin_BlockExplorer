import React, { useState } from "react";
import "../CSS/Learning.css";

const bitcoinTerms = [
  {
    id: 1,
    term: "Block Height",
    definition:
      "Block Height is a numerical value that represents the position of a specific block within the blockchain's chronological order. It is essentially a count of the number of blocks preceding the block in question, starting from the genesis block, which is typically block 0. Block height serves as a crucial reference point for identifying blocks and tracking the blockchain's progression. Each new block added to the chain increments the block height by one.",
  },
  {
    id: 2,
    term: "Block Hash",
    definition:
      "Block Hash is a cryptographic hash value generated from all the data contained within a specific block in the blockchain. It functions as a unique digital fingerprint for that block, ensuring data integrity and security. Block hashes are used to link blocks together in the blockchain, forming a continuous and tamper-resistant chain of blocks.",
  },
  {
    id: 3,
    term: "Block Weight",
    definition:
      "Block Weight is a metric used to measure the overall size and complexity of a Bitcoin block. It accounts for the size of transaction data, witness data (for Segregated Witness transactions), and other block-related information. Block weight is an important factor in determining the priority of a block on the Bitcoin network and influences miner selection.",
  },
  {
    id: 4,
    term: "Block Size",
    definition:
      "Block Size refers to the amount of data that can be accommodated in a single block on the Bitcoin blockchain. It is usually measured in bytes. Block size is an important consideration for transaction processing, as larger blocks can hold more transactions. However, there are limits to block size to ensure network efficiency and decentralization.",
  },
  {
    id: 5,
    term: "Stripped Block Size",
    definition:
      "Stripped Block Size is a variant of the block size metric in Bitcoin. It excludes certain data, such as witness data in Segregated Witness transactions, from the block's size calculation. Stripped block size is used to determine the block's weight and plays a role in transaction fee calculations and block validation.",
  },
  {
    id: 6,
    term: "Merkle Root",
    definition:
      "Merkle Root is a cryptographic hash value that is computed from all the transaction hashes within a Bitcoin block. It is used to efficiently summarize and verify the integrity of all transactions in the block. Any change in a transaction would result in a completely different Merkle Root, making it a crucial component of the block's overall security.",
  },
  {
    id: 7,
    term: "Nonce",
    definition:
      "Nonce, short for 'number used once,' is a 32-bit (4-byte) field in a Bitcoin block header. Miners adjust the nonce value in a trial-and-error fashion while mining to find a hash value that meets the network's difficulty target. Changing the nonce alters the block's hash, allowing miners to create a valid block and earn rewards.",
  },
  {
    id: 8,
    term: "Confirmations",
    definition:
      "Confirmations refer to the number of blocks added to the blockchain after a particular block or transaction. A higher number of confirmations indicates a more secure and finalized state for the block or transaction. For added security, it is recommended to wait for multiple confirmations before considering a transaction as fully validated.",
  },
  {
    id: 9,
    term: "Time",
    definition:
      "Time in the context of Bitcoin refers to the timestamp associated with a block or transaction. It represents the approximate time when the block was mined or when a transaction was created. The accuracy of the timestamp is essential for maintaining the blockchain's chronological order and integrity.",
  },
  {
    id: 10,
    term: "Transaction ID",
    definition:
      "Transaction ID, also known as TxID, is a unique alphanumeric identifier assigned to each individual transaction on the Bitcoin blockchain. It serves as a reference point to locate and verify specific transactions within the blockchain. TxIDs are used for tracking payments, confirming transaction details, and ensuring data integrity.",
  },
  {
    id: 11,
    term: "Transaction Hash",
    definition:
      "Transaction Hash is a cryptographic hash value generated from the complete data of a specific Bitcoin transaction. It functions as a unique identifier for the transaction and ensures data integrity. Transaction hashes are used to link transactions together within a block and to verify the inclusion of transactions in the blockchain.",
  },
  {
    id: 12,
    term: "Transaction Size",
    definition:
      "Transaction Size is a measure of the amount of data occupied by a Bitcoin transaction. It includes the size of inputs, outputs, scripts, and other transaction-related information. Transaction size is a critical factor in determining transaction fees, as larger transactions typically require higher fees for processing.",
  },
  {
    id: 13,
    term: "Lock Time",
    definition:
      "Lock Time is a field included in Bitcoin transactions that specifies the earliest time or block height at which the transaction can be included in a valid block. It allows users to create time-locked transactions, enabling various use cases, such as escrow arrangements and conditional payments, based on specific time conditions.",
  },
  {
    id: 14,
    term: "Version",
    definition:
      "Version is a field present in Bitcoin transaction data and block headers. It indicates the format and rules followed by a specific transaction or block. Changes in the version number can signal updates, improvements, or protocol changes in the Bitcoin network.",
  },
  {
    id: 15,
    term: "Number of Inputs",
    definition:
      "Number of Inputs (often abbreviated as Number of INs) refers to the count of input sources or funds used in a Bitcoin transaction. Each input typically references a previous unspent transaction output (UTXO) and contributes to the transaction's overall value. The number of inputs affects transaction size and fees.",
  },
  {
    id: 16,
    term: "Number of Outputs",
    definition:
      "Number of Outputs (often abbreviated as Number of OUTs) denotes the count of destination addresses or recipients in a Bitcoin transaction. Each output designates a specific amount of cryptocurrency to be sent to a recipient's address. The number of outputs influences transaction size and structure.",
  },
  {
    id: 17,
    term: "Transaction Fee",
    definition:
      "Transaction Fee is the amount of Bitcoin paid to miners for processing and including a transaction in the blockchain. It incentivizes miners to prioritize transactions, as higher fees often lead to quicker confirmation. Transaction fees are a fundamental aspect of Bitcoin's economic model, and they help secure the network and compensate miners for their work.",
  },
];

function Learning() {
  const [searchText, setSearchText] = useState("");
  const [filteredBitcoinTerms, setFilteredBitcoinTerms] =
    useState(bitcoinTerms);
  const [showAll, setShowAll] = useState(false);
  const maxDisplayedTerms = 3;
  const displayedBitcoinTerms = showAll
    ? filteredBitcoinTerms
    : filteredBitcoinTerms.slice(0, maxDisplayedTerms);

  ///////////////////////////////////////////////////////////////////////////////////
  //
  // Handle term search function
  //
  ///////////////////////////////////////////////////////////////////////////////////
  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);

    const filteredTerms = bitcoinTerms.filter((term) =>
      term.term.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredBitcoinTerms(filteredTerms);
  };

  return (
    <>
      <div className="intro-container">
        <img src="/images/Learning-icon2.png" className="left-image" />
        <p className="intro-text">
          Welcome to the Learning Page. <br></br>Place where you can explore key
          Bitcoin concepts and terminology. Whether you're new to
          cryptocurrencies or looking to expand your knowledge, you'll find
          informative definitions below.
        </p>
        <img src="/images/Learning-icon2.png" className="right-image" />
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Bitcoin Terms"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <div className="learning-container">
        {displayedBitcoinTerms.map((term, index) => (
          <div
            className={`term-card ${index % 2 === 0 ? "even" : "odd"}`}
            key={term.id}
          >
            <div className="term-icon">
              <img src="/images/info-icon.png" alt="Bitcoin Icon" />
            </div>
            <h2 className="term-title">{term.term}</h2>
            <p className="term-definition">{term.definition}</p>

            {index === displayedBitcoinTerms.length - 1 &&
              !(displayedBitcoinTerms.length < 3) && (
                <button
                  className="show-all-button"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "Show Less terms" : "Show All terms"}
                </button>
              )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Learning;
