'use strict'

// Parameters
const consensusContractAddress = '0xF1B1A47204AcA8A701c52Ce41F9626E2f5B05fF3';
const nodeAddress = '0xcfDb7F01f13AD31e9F1738DCEAb4f063251048D7';
const pathABI = './truffle/build/contracts/ConsensusContract.json';
const port = 7545;

// Import libraries
const lib = require('./lib3.js');

lib.Consensus.init(consensusContractAddress, nodeAddress, pathABI, port);

let patientId = 3;
let password = '7';
// lib.Consensus.createConsensus(patientId, password);
lib.Consensus.getConsensus(patientId, password);
// lib.Consensus.revokeConsensus(patientId, password);

