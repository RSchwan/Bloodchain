'use strict'

// -----------------------------------------------
// const Personal = require('web3-eth-personal');
// const personal = new Personal(new Personal.providers.HttpProvider("http://localhost:7545"));
//
// personal.newAccount('!@superpassword')
// .then(console.log);
// -----------------------------------------------

// // Connect to ganache
// let address = "0xF1B1A47204AcA8A701c52Ce41F9626E2f5B05fF3";


// const Web3 = require('web3');
// const contract = require('truffle-contract');
//
// console.log('Hello world');



//    contract        = require("truffle-contract"),
//    path            = require('path')
//    MyContractJSON  = require(path.join(__dirname, 'build/contracts/MyContract.json'));
//
//// Setup RPC connection
//
//
//// Read JSON and attach RPC connection (Provider)
//var MyContract = contract(MyContractJSON);
//MyContract.setProvider(provider);
//
//// Use Truffle as usual
//MyContract.deployed().then(function(instance) {
//    return instance.myFunction.call(arg1, arg2, {from: '0x************************'})
//
//}).then(function(result) {
//    console.log(result);
//
//}, function(error) {
//    console.log(error);
//});


// // Import libraries
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
// // console.log(web3.eth.accounts.create());
// //console.log(web3.eth.accounts);
//
// const Accounts = require('web3-eth-accounts');
// const accounts = new Accounts(provider);
//console.log(Accounts);
// console.log(web3.eth);
// console.log(accounts);
// web3.eth.personal.newAccount('superpassword').then(console.log);
// console.log(web3.eth.accounts);


const Web3     = require('web3');
const provider = new Web3.providers.HttpProvider('http://localhost:7545');
const contract = require('truffle-contract');
const path     = require('path');
const MyContractJSON = require('./SmartContract.json');

const MyContract = contract(MyContractJSON);
MyContract.setProvider(provider);

MyContract.deployed()
.then( function(instance) {
    console.log(instance.set);
    return instance.get.call({from: '0x6Fa8b700c6526374ebd7f87C1863367301158Be9'});
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
//     return instance.set.sendTransaction(3, {from: '0x6Fa8b700c6526374ebd7f87C1863367301158Be9'});
// })
// .then(function(result) {
//     console.log(result);
// })
// .catch(function(error) {
//     console.log('An error occured: ' + error);
// });

// var MyContract = contract({
//   abi: ...,
//   unlinked_binary: ...,
//   address: ..., // optional
//   // many more
// })
// MyContract.setProvider(provider);
