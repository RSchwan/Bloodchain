exports.sayHello = function() {
    console.log('Hello');
}
exports.Consensus = {
    init: (address) => {
        let Web3                    = require('web3');
        let provider                = new Web3.providers.HttpProvider('http://localhost:7545');
        let MyContractJSON          = require('./SmartContract.json');
        let contract                = require('truffle-contract');
        this.Consensus.MyContract   = contract(MyContractJSON);
        this.Consensus.MyContract.setProvider(provider);
        this.Client                 = {};
        this.Client.address         = address;
    },
    set: (patientId, consensusState) => {           // Fix this function
        this.Consensus.MyContract.deployed()
        .then( (instance) => {
            return instance.set.sendTransaction(7, {from: this.Client.address});
            // return instance.set(3,4).call({from: this.Client.address});
        })
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log('An error occured: ' + error);
        });



 MyContract.deployed()
 .then( function(instance) {
     console.log(instance.set);
     return instance.set.sendTransaction(5, {from: '0x6Fa8b700c6526374ebd7f87C1863367301158Be9'});
})
.then(function(result) {
    console.log(result);
})
.catch(function(error) {
    console.log('An error occured: ' + error);
});










    },
    get: (patientId) => {
        this.Consensus.MyContract.deployed()
        .then( (instance) => {
            return instance.get.call({from: this.Client.address});
        })
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log('An error occured: ' + error);
        });
    }
}
