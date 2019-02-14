'use strict'

// Import libraries
const Web3     = require('web3');
const provider = new Web3.providers.HttpProvider('http://localhost:7545');
const contract = require('truffle-contract');
const path     = require('path');
const MyContractJSON = require('./SmartContract.json');

const MyContract = contract(MyContractJSON);
MyContract.setProvider(provider);

MyContract.deployed()
.then( function(instance) {
    return instance.get.call({from: '0x1278d23BE990fAc9da87a0766468e4a4722D459e'});
})
.then(function(result) {
    console.log(result);
})
.catch(function(error) {
    console.log('An error occured: ' + error);
});
// MyContract.deployed()
// .then( function(instance) {
//     console.log(instance.set);
//      return instance.set.sendTransaction(3, {from: '0x6Fa8b700c6526374ebd7f87C1863367301158Be9'});
// })
// .then(function(result) {
//     console.log(result);
// })
// .catch(function(error) {
//     console.log('An error occured: ' + error);
// });
// MyContract.deployed()
// .then( function(instance) {
//     console.log(instance.set);
//     return instance.get.call({from: '0x6Fa8b700c6526374ebd7f87C1863367301158Be9'});
// })
// .then(function(result) {
//     console.log(result);
// })
// .catch(function(error) {
//     console.log('An error occured: ' + error);
// });

MyContract.deployed()
 .then( function(instance) {
     console.log(instance.set);
     return instance.set.sendTransaction(9, {from: '0x6Fa8b700c6526374ebd7f87C1863367301158Be9'});
})
.then(function(result) {
    console.log(result);
})
.catch(function(error) {
    console.log('An error occured: ' + error);
});
MyContract.deployed()
.then( function(instance) {
    return instance.get.call({from: '0x1278d23BE990fAc9da87a0766468e4a4722D459e'});
})
.then(function(result) {
    console.log(result);
})
.catch(function(error) {
    console.log('An error occured: ' + error);
});

// var MyContract = contract({
//   abi: ...,
//   unlinked_binary: ...,
//   address: ..., // optional
//   // many more
// })
// MyContract.setProvider(provider);
