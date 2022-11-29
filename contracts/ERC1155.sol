// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ERC1155{

    mapping(uint256 => mapping(address => uint256))  internal _balances;
    mapping(address=>mapping(address=> bool)) private _operatorApprovals;

    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
    event TransferSingle(address indexed _operator, address indexed _from, address indexed _to, uint256 _id, uint256 _value);
    event TransferBatch(address indexed _operator, address indexed _from, address indexed _to, uint256[] _ids, uint256[] _values);

    function balanceOf(address account ,uint256 id) public view returns(uint256){
        require(account != address(0), "Address is zero");
        return _balances[id][account];
    }

    function balanceOfBatch(address[] memory accounts, uint256[] memory ids) public view returns(uint256[]  memory){
        require(accounts.length == ids.length, "Account  and ids are not same length" );
        uint256[] memory batchBalances = new uint256[] (accounts.length);

        for(uint256 i=0;i<accounts.length;i++){
            batchBalances[i] = balanceOf(accounts[i], ids[i]);
        }

        return batchBalances;
    }


     function setApprovalForAll(address operator, bool approved) external{
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function isApprovedForAll(address owner, address operator) public view returns (bool){
        return  _operatorApprovals[owner][operator];
    }

    function _transfer(address from, address to, uint256 id, uint256 amount) private{
        uint256 fromBalance = _balances[id][from];
        require(fromBalance >= amount ,"Insufficient Balance");
        _balances[id][from] = fromBalance -amount;
        _balances[id][to] +=amount;
    }


    function safeTransferFrom(address from,address to,uint256 id, uint256 amount, bytes calldata _data ) external{
        require(msg.sender==from || isApprovedForAll(from, msg.sender), "msg.snder is not operator or owner");
        require(to != address(0), "Address is zero");
        _transfer(from, to, id, amount);
        emit TransferSingle(msg.sender, from,to,id,amount);

        require(_checkOnERC1155Received(), "Receiver is not implemented");
    }


    function _checkOnERC1155Received() private pure  returns(bool){
        return true;
    }


    function safeBatchTransferFrom(address from, address to, uint256[]  memory ids, uint256[] memory  amounts, bytes calldata _data) external{
        require(msg.sender==from || isApprovedForAll(from, msg.sender), "msg.snder is not operator or owner");
        require(to != address(0), "Address is zero");
        require(ids.length ==amounts.length, "Ids and  amount should be of same length ");

        for(uint256 i =0 ;i<ids.length;i++){
            uint256 id = ids[i];
            uint256 amount  = amounts[i];

            _transfer(from, to, id, amount);
        }

        emit TransferBatch(msg.sender,from, to, ids, amounts);

        require(_checkOnBatchERC1155Received(), "Receiver is not implemented");
    }

      function _checkOnBatchERC1155Received() private pure  returns(bool){
        return true;
    }

    function supportsInterface(bytes4 interfaceId) public pure virtual returns(bool){
        return interfaceId == 0xd9b67a26;
    }

}