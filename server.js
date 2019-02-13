'use strict'

// Import fs
const fs = require('fs');

// Contract parameter
const contractAddress = '0xcfDb7F01f13AD31e9F1738DCEAb4f063251048D7';
const json = JSON.parse(fs.readFileSync('./SmartContract.json', 'utf8'));
const nodeAddress = '0xF1CEE9e340b874Fabb54Ab2F01125e9396884f26';

// Import libraries
const Web3     = require('web3');
// const Personal = require('web3-eth-personal');
// const personal = new Personal(new Web3.providers.HttpProvider('http://localhost:7545'));
const provider = new Web3.providers.HttpProvider('http://localhost:7545');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const Contract = require('web3-eth-contract');
Contract.setProvider(provider);
// const contract = new Contract(json.abi, contractAddress, {from: nodeAddress, gasPrice: '20000000000', gas: 400000});
const contract = new Contract(json.abi, contractAddress, {from: nodeAddress});

// contract.methods.get()
// .call()
// .then(function(receipt) {
//     console.log(receipt);
// })
// .catch(function(error) {
//     console.log(error);
// });

contract.methods.add(3,4)
.call()
.then(function(result) {
    console.log(result);
})
.catch(function(error) {
    console.log(error);
});

