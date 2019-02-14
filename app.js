'use strict'

// Parameters
const consensusContractAddress = '0x98AAe7A078C6B586D9017009d5ff4F15Cd75a2F0';
const actionsContractAddress   = '0x1B1Ad4eD0Df764F13aD49dCF5cEb7D3eF0E2d564';
const nodeAddress              = '0x1278d23BE990fAc9da87a0766468e4a4722D459e';
const pathABIConsensus         = './truffle/build/contracts/ConsensusContract.json';
const pathABIActions           = './truffle/build/contracts/Actions.json';
const port                     = 7545;

// Import libraries
const lib3 = require('./lib3.js');

// lib3.Consensus.init(consensusContractAddress, nodeAddress, pathABIConsensus, port);

let patientId = 3;
let password = '7';
// lib3.Consensus.createConsensus(patientId, password);
// lib3.Consensus.getConsensus(patientId, password);
// lib3.Consensus.revokeConsensus(patientId, password);

// Parameters
lib3.Actions.init(actionsContractAddress, nodeAddress, pathABIActions, port);

let transactionId = 12;
let hash = '34';

// lib3.Actions.addAction(12, hash);
// lib3.Actions.addAction(15, hash);
// lib3.Actions.addAction(17, hash);
// lib3.Actions.getActionsCount();
// lib3.Actions.getVar();
// lib3.Actions.getHash(transactionId);
// lib3.Actions.getActions(2);
