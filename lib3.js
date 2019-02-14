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

exports.Actions = {
    init: (contractAddress, nodeAddress, pathABI, port) => {
        // Temporarily import libraries
        let fs = require('fs');
        let Web3     = require('web3');
        let Contract = require('web3-eth-contract');

        // Read ABI from file
        let json = JSON.parse(fs.readFileSync(pathABI, 'utf8'));
        let abi = json.abi;

        // Create link to actions contract
        let provider = new Web3.providers.HttpProvider(`http://localhost:${port}`);
        Contract.setProvider(provider);
        this.Actions.contract = new Contract(abi, contractAddress, {from: nodeAddress});

        // Create web3 instance
        this.web3 = new Web3(provider);

        // Create web3-utils instance
        this.web3Utils = require('web3-utils');
    },

    getVar: () => {
        this.Actions.contract.methods.getVar()
        .call()
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    },

    addAction: (transactionId, hash) => {
        console.log(this.Actions.contract.methods);
        this.Actions.contract.methods.addAction(transactionId, hash)
        .send({gas: 250000})
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    },

    getHash: (transactionId) => {
        this.Actions.contract.methods.getHash(transactionId)
        .call()
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    },

    getActionsCount: () => {
        this.Actions.contract.methods.getActionsCount()
        .call()
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    },

    getActions: (internal) => {
        this.Actions.contract.methods.getActions(internal)
        .call()
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

}
