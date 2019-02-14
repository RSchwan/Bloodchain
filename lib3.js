const fs = require('fs');
const Web3 = require('web3');

exports.Consensus = {
  init: (contractAddress, nodeAddress, pathABI, providerAddress) => {
      this.nodeAddress = nodeAddress;

      // Read ABI from file
      const json = JSON.parse(fs.readFileSync(pathABI, 'utf8'));
      const abi = json.abi;

      // Create provider
      const provider = new Web3.providers.HttpProvider(providerAddress);

      // Create web3 instance
      this.web3 = new Web3(provider);

      // Create contract
      this.contract = new this.web3.eth.Contract(abi, contractAddress, {from: nodeAddress});
  },

  createConsensus: (patientId, password) => {
      const passwordHash = this.web3.utils.soliditySha3(password);
      return this.contract.methods.createconsensus(patientId, passwordHash)
                .send({ from: this.nodeAddress });
  },

  getConsensus: (patientId) => {
      return this.contract.methods.getconsensus(patientId)
                .call();
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
  },

}
