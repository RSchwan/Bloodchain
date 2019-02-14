exports.sayHello = function() {
    console.log('Hello');
}
exports.Consensus = {
    init: () => {
        let Web3                    = require('web3');
        let provider                = new Web3.providers.HttpProvider('http://localhost:7545');
        let MyContractJSON          = require('./SmartContract.json');
        let contract                = require('truffle-contract');
        this.Consensus.MyContract   = contract(MyContractJSON);
        this.Consensus.MyContract.setProvider(provider);
    },
    set: (patientId, consensusState) => {
    },
    get: () => {
        this.Consensus.MyContract.deployed()
        .then( function(instance) {
            return instance.get.call({from: '0x1278d23BE990fAc9da87a0766468e4a4722D459e'});
        })
        .then(function(result) {
            console.log(result);
        })
        .catch(function(error) {
            console.log('An error occured: ' + error);
        });
    }
}
