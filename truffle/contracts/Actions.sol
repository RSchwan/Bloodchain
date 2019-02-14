pragma solidity ^0.5.0;

contract Actions {

    struct Action {
        uint action_id;
        uint dataHash;
    }

    mapping (uint => Action) actions;
    mapping (uint => bool) alreadyExisting;
    uint[] actionArray;

    // Creates a new action on the blockchain
    function addAction(uint _action_id, uint _dataHash) public {
        require(alreadyExisting[_action_id] == false);
        Action storage newAction = actions[_action_id];
        newAction.action_id = _action_id;
        newAction.dataHash = _dataHash;
        alreadyExisting[_action_id] = true;
        actionArray.push(_action_id);
    }

    uint myVar = 5;

    function getVar() public view returns (uint) {
        return myVar;
    }

    // Return the hash corresponding to a action_id.
    function getHash(uint _action_id) view public returns (uint) {
        return actions[_action_id].dataHash;
    }

    // Returns the total number of actions 
    function getActionsCount() public view returns (uint) {
        return actionArray.length;
    }

    // Returns the action_id and the dataHash of the index'th action that was added.
    function getActions(uint index) view public returns (uint, uint) {
        uint tempAction_id = actionArray[index - 1];
        return (tempAction_id, actions[tempAction_id].dataHash);
    }

}

