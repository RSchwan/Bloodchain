exports.Consensus = {
    init: (contractAddress, nodeAddress, pathABI, port) => {
        // Temporarily import libraries
        let fs = require('fs');
        let Web3     = require('web3');
        let Contract = require('web3-eth-contract');

        // Read ABI from file
        let json = JSON.parse(fs.readFileSync(pathABI, 'utf8'));
        let abi = json.abi;

        // Create link to consensus contract
        let provider = new Web3.providers.HttpProvider(`http://localhost:${port}`);
        Contract.setProvider(provider);
        this.Consensus.contract = new Contract(abi, contractAddress, {from: nodeAddress});

        // Create web3 instance
        this.web3 = new Web3(provider);

        // Create web3-utils instance
        this.web3Utils = require('web3-utils');
    },

    createConsensus: (patientId, password) => {
        let passwordHash = this.web3Utils.soliditySha3(password);
        this.Consensus.contract.methods.createconsensus(patientId, passwordHash)
        .send()
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    },

    getConsensus: (patientId) => {
        this.Consensus.contract.methods.getconsensus(patientId)
        .call()
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    },

    revokeConsensus: (patientId, password) => {
        this.Consensus.contract.methods.revokeconsensus(patientId, password)
        .send()
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

}

exports.Transactions = {
    init: (contractAddress, nodeAddress, pathABI, port) => {
        // Temporarily import libraries
        let fs = require('fs');
        let Web3     = require('web3');
        let Contract = require('web3-eth-contract');

        // Read ABI from file
        let json = JSON.parse(fs.readFileSync(pathABI, 'utf8'));
        let abi = json.abi;

        // Create link to transactions contract
        let provider = new Web3.providers.HttpProvider(`http://localhost:${port}`);
        Contract.setProvider(provider);
        this.Transactions.contract = new Contract(abi, contractAddress, {from: nodeAddress});

        // Create web3 instance
        this.web3 = new Web3(provider);

        // Create web3-utils instance
        this.web3Utils = require('web3-utils');
    },

    getVar: () => {
        this.Transactions.contract.methods.getVar()
        .call()
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    },

    addTransaction: (transactionId, hash) => {
        this.Transactions.contract.methods.addTransaction(transactionId, hash)
        .send({gas: 250000})
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    },

    getHash: (transactionId) => {
        this.Transactions.contract.methods.getHash(transactionId)
        .call()
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    },

    getTransactionsCount: () => {
        this.Transactions.contract.methods.getTransactionCount()
        .call()
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    },

    getTransactions: (internal) => {
        this.Transactions.contract.methods.getTransaction(internal)
        .call()
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

}
