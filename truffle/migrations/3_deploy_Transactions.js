// The name specified in require should match the name of the contract definition within the source
// file. Do not pass the name of the source file, as files can contain more than one contract.
var TransactionsContract = artifacts.require("./Transactions.sol");

module.exports = function(deployer) {
  deployer.deploy(TransactionsContract)
  .then(() => console.log(`TransactionsContract address is: ${TransactionsContract.address}`));
};
