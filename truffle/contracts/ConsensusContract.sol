pragma solidity ^0.5.0;

contract ConsensusContract {

  struct Consensus {
        bool consensus_status; //1 for consensus, 0 for no consensus
        uint timestamp;
        uint keyhash;
    }
  address owner;
  constructor() public{
    owner=msg.sender;
  }
  modifier onlyOwner{
    require(msg.sender == owner);
    _;
  }
  mapping(uint => Consensus) patients; //maps a patient_id to a consensus struct that represent the evolution of their consensus.
  function createconsensus(uint _patient_id, uint _keyhash ) onlyOwner public {// create a new consensus linked to a patient on the chain.
    Consensus storage newconsensus=patients[_patient_id];                     //only the deployer of the contract can create a new consensus.
    newconsensus.consensus_status=true;
    newconsensus.timestamp=now;
    newconsensus.keyhash=_keyhash;
  }
  function getconsensus(uint _patient_id) view public returns(bool, uint){
    return (patients[_patient_id].consensus_status,patients[_patient_id].timestamp); //returns the consensus of a patient at  a given time.
  }
  function revokeconsensus(uint _patient_id, uint _key) public {
    require(uint(keccak256(abi.encodePacked(_key)))==patients[_patient_id].keyhash);
    patients[_patient_id].consensus_status=false;
  }
}
