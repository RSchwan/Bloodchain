const fs = require('fs');
const Web3 = require('web3');

exports.Consensus = {
  init: (contractAddress, nodeAddress, pathABI, providerAddress) => {
      this.consensusNodeAddress = nodeAddress;

      // Read ABI from file
      const json = JSON.parse(fs.readFileSync(pathABI, 'utf8'));
      const abi = json.abi;

      // Create provider
      const provider = new Web3.providers.HttpProvider(providerAddress);

      // Create web3 instance
      this.web3 = new Web3(provider);

      // Create contract
      this.consensusContract = new this.web3.eth.Contract(abi, contractAddress, {from: nodeAddress});
  },

  createConsensus: (patientId, password) => {
      const passwordHash = this.web3.utils.soliditySha3(password);
      return this.consensusContract.methods.createconsensus(patientId, passwordHash)
                .send({ from: this.consensusNodeAddress });
  },

  getConsensus: (patientId) => {
      return this.consensusContract.methods.getconsensus(patientId)
                .call();
  },

  revokeConsensus: (patientId, password) => {
      return this.consensusContract.methods.revokeconsensus(patientId, password)
                .send({ from: this.consensusNodeAddress });
  }
}

exports.Transactions = {
    init: (contractAddress, nodeAddress, pathABI, providerAddress) => {
        this.transactionsNodeAddress = nodeAddress;

        // Read ABI from file
        const json = JSON.parse(fs.readFileSync(pathABI, 'utf8'));
        const abi = json.abi;

        // Create provider
        const provider = new Web3.providers.HttpProvider(providerAddress);

        // Create web3 instance
        this.web3 = new Web3(provider);

        // Create contract
        this.transactionsContract = new this.web3.eth.Contract(abi, contractAddress, {from: nodeAddress});
    },

    addTransaction: (transactionId, hash) => {
        return this.transactionsContract.methods.addTransaction(transactionId, hash)
                .send({ from: this.transactionsNodeAddress, gas: 250000 });
    },

    getHash: (transactionId) => {
        return this.transactionsContract.methods.getHash(transactionId)
                .call();
    },

    getTransactionCount: () => {
        return this.transactionsContract.methods.getTransactionCount()
                .call();
    },

    getTransaction: (internal) => {
        return this.transactionsContract.methods.getTransaction(internal)
                .call();
    }
}
