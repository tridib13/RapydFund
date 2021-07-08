// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract Transaction {
    
    struct transaction {
        string source_ewallet;
        string destination_ewallet;
        uint amount;
        string currency;
        uint timestamp;
    }

    mapping(string => transaction[]) public transactions;

    function recordTransaction(string memory _source_ewallet, string memory _destination_ewallet, uint _amount, string memory _currency, uint _timestamp) public returns(transaction[] memory)
    {
        transactions[_source_ewallet].push(transaction({
            source_ewallet: _source_ewallet, 
            destination_ewallet: _destination_ewallet, 
            amount: _amount, 
            currency: _currency, 
            timestamp: _timestamp
        }));

        return transactions[_source_ewallet];
    }

    function getTransactionFrom(string memory source_ewallet) view public returns(transaction[] memory)
    {
        return transactions[source_ewallet];
    }
}