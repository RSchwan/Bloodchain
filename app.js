'use strict'

// Parameters
const consensusContractAddress     = '0x98AAe7A078C6B586D9017009d5ff4F15Cd75a2F0';
const transactionContractAddress   = '0x64Ff00fD620A6Cb15926685032D19A4214e530F4';
const nodeAddress                  = '0x1278d23BE990fAc9da87a0766468e4a4722D459e';
const pathABIConsensus             = './truffle/build/contracts/ConsensusContract.json';
const pathABITransactions          = './truffle/build/contracts/Transactions.json';
const port                         = 7545;

// Import libraries
const lib3 = require('./lib3.js');

// lib3.Consensus.init(consensusContractAddress, nodeAddress, pathABIConsensus, port);

let patientId = 3;
let password = '7';
// lib3.Consensus.createConsensus(patientId, password);
// lib3.Consensus.getConsensus(patientId, password);
// lib3.Consensus.revokeConsensus(patientId, password);

// Parameters
lib3.Transactions.init(transactionContractAddress, nodeAddress, pathABITransactions, port);

let transactionId = 25;
let hash = '34';

// lib3.Transactions.addTransaction(22, hash);
// lib3.Transactions.addTransaction(25, hash);
// lib3.Transactions.addTransaction(27, hash);
// lib3.Transactions.getTransactionsCount();
// lib3.Transactions.getHash(transactionId);
// lib3.Transactions.getTransactions(4);
