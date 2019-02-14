pragma solidity ^0.5.0;

contract Transactions {

    struct Transaction {
        uint transaction_id;
        uint dataHash;
    }

    mapping (uint => Transaction) transactions;
    mapping (uint => bool) alreadyExisting;
    uint[] transactionArray;

    // Creates a new transaction on the blockchain
    function addTransaction(uint _transaction_id, uint _dataHash) public {
        require(alreadyExisting[_transaction_id] == false);
        Transaction storage newTransaction = transactions[_transaction_id];
        newTransaction.transaction_id = _transaction_id;
        newTransaction.dataHash = _dataHash;
        alreadyExisting[_transaction_id] = true;
        transactionArray.push(_transaction_id);
    }

    // Return the hash corresponding to a transaction_id.
    function getHash(uint _transaction_id) view public returns (uint) {
        return transactions[_transaction_id].dataHash;
    }

    // Returns the total number of transactions 
    function getTransactionCount() public view returns (uint) {
        return transactionArray.length;
    }

    // Returns the transaction_id and the dataHash of the index'th transaction that was added.
    function getTransaction(uint index) view public returns (uint, uint) {
        uint tempTranstransaction_id = transactionArray[index - 1];
        return (tempTranstransaction_id, transactions[tempTranstransaction_id].dataHash);
    }

}
