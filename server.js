'use strict'

// Import fs
const fs = require('fs');

// Contract parameter
const contractAddress = '0xF1B1A47204AcA8A701c52Ce41F9626E2f5B05fF3';
const json = JSON.parse(fs.readFileSync('./SmartContract.json', 'utf8'));
const nodeAddress = '0x1278d23BE990fAc9da87a0766468e4a4722D459e';

// Import libraries
const Web3     = require('web3');
// const Personal = require('web2-eth-personal');
// const personal = new Personal(new Web3.providers.HttpProvider('http://localhost:7545'));
const provider = new Web3.providers.HttpProvider('http://localhost:7545');
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const web3 = new Web3(provider);
const Contract = require('web3-eth-contract');
Contract.setProvider(provider);
const contract = new Contract(json.abi, contractAddress, {from: nodeAddress});

// contract.methods.get()
// .send()
// .then(function(receipt) {
//     console.log(receipt);
// })
// .catch(function(error) {
//     console.log(error);
// });

// contract.methods.add(3,5)
// .send()
// .then(function(receipt) {
//     console.log(receipt);
// })
// .catch(function(error) {
//     console.log(error);
// });
// contract.methods.add(3,5).send()
// contract.methods.get().send()
// .then(console.log);
//
// contract.methods.set(3).send()
// .then(console.log);
//

// contract.methods.get()
// .call()
// .then(console.log);

contract.methods.set(11)
.send()
.then(() => {
return contract.methods.get().call()
})
.then(console.log);

// contract.methods.get()
// .call()
// .then(console.log);


// console.log(contract.methods);
//
// contract.methods.get()
// .send()
// .on('transactionHash', (hash) => {
//     console.log(hash);
// })
// .on('confirmation', (confirmationNumber, receipt) => {
//     console.log(receipt);
//     console.log(confirmationNumber);
// })
// .on('receipt', (receipt) => {
//     console.log(receipt);
// })
// .on('error', console.error);


// .send()
// .on('receipt', (receipt) => {
//     console.log(receipt);
//     console.log(arg2);
// })
// .on('error', (error) => {
//     console.log(error);
// });

// contract.methods.add(3,4)
// .call()
// .then(function(result) {
//     console.log(result);
// })
// .catch(function(error) {
//     console.log(error);
// });

