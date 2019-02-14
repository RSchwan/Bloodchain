'use strict'

// Parameters
const consensusContractAddress = '0xA366108e9544F3F6C398Da0353DC4B066ae95CEE';
const nodeAddress = '0xcfDb7F01f13AD31e9F1738DCEAb4f063251048D7';
const pathABI = './abi/ConsensusContract.json';
const port = 7545;

// Import libraries
const lib = require('./lib3.js');

lib.Consensus.init(consensusContractAddress, nodeAddress, pathABI, port);

let patientId = 3;
let password = '7';
// lib.Consensus.createConsensus(patientId, password);
// lib.Consensus.getConsensus(patientId, password);
// lib.Consensus.revokeConsensus(patientId, password);

