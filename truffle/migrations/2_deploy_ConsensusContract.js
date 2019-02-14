// The name specified in require should match the name of the contract definition within the source
// file. Do not pass the name of the source file, as files can contain more than one contract.
var ConsensusContract = artifacts.require("./ConsensusContract.sol");

module.exports = function(deployer) {
  deployer.deploy(ConsensusContract)
  .then(() => console.log(`ConsensusContract address is: ${ConsensusContract.address}`));
};
