// The name specified in require should match the name of the contract definition within the source
// file. Do not pass the name of the source file, as files can contain more than one contract.
var ActionsContract = artifacts.require("./Actions.sol");

module.exports = function(deployer) {
  deployer.deploy(ActionsContract)
  .then(() => console.log(`ActionsContract address is: ${ActionsContract.address}`));
};
