//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

struct NameInfo {
    string name;
    string publicKey;
    string privateKey;
    address owner;
    bool updated;
}

contract FilenameSpace is KeeperCompatibleInterface, ReentrancyGuard, ERC721Enumerable, ERC721URIStorage {
    using Counters for Counters.Counter;

    address private _owner;

    Counters.Counter private _nameId;

    uint256 private _baseFee = 10000000000000000;

    mapping (uint256 => NameInfo) private _nameInfos;
    mapping (string => uint256) private _nameRecords;
    mapping (uint256 => uint256) private _feeRecords;

    constructor() ERC721("Filename Space", "FilSpace") {
        _owner = msg.sender;
    } 

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override (ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override (ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }  

    function supportsInterface(bytes4 interfaceId) public view override (ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }    

    function tokenURI(uint256 tokenId) public view override (ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }  

    //check up keep for chainlink
    function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory) {
       uint total = totalSupply();

       for(uint i = 0; i < total; i++){
           uint256 nameId = tokenByIndex(i);
           if(ownerOf(nameId) != _nameInfos[nameId].owner){
               return (true, abi.encode(nameId));
           }
       }
       return (false, abi.encode(0));
    }

    //perform up keep for chainlink
    function performUpkeep(bytes calldata performData) external override {
        uint nameId = abi.decode(performData, (uint));

        if(ownerOf(nameId) != _nameInfos[nameId].owner){
            _nameInfos[nameId].updated = false;
        }
    }

    //transfer contract owner
    function transferOwnerShip(address owner) public {
        require(msg.sender == _owner, "not owner!");

        _owner = owner;
    }

    //set min and max name length and the stack fee for mint 
    function updateFees(uint256 fee) public {
        require(msg.sender == _owner, "not owner!");

        require(fee > 0);

        _baseFee = fee;
    }

    //mint a name as a nft
    function mint(string memory name, string memory url, string memory publicKey, string memory privateKey) public nonReentrant payable returns (uint256){
        require(_nameRecords[name] == 0, "name exists!");
        require(balanceOf(msg.sender) == 0, "address minted!");

        uint nameLength = bytes(name).length;
        require(nameLength > 4 && bytes(name)[0] != '.' && bytes(name)[nameLength-4] == '.' && bytes(name)[nameLength-3] == 'f' && bytes(name)[nameLength-2] == 'i' && bytes(name)[nameLength-1] == 'l', "invalid name!");

        //stack token to mint
        uint256 nameFee = nameLength*_baseFee;

        require(msg.value >= nameFee, "invalid stack fee!");
        
        //mint a new nft as the name service token
        _nameId.increment();

        uint256 newId = _nameId.current();

        _mint(msg.sender, newId);

        _setTokenURI(newId, url);

        _nameInfos[newId] = NameInfo({
            name: name,
            publicKey: publicKey,
            privateKey: privateKey,
            owner: msg.sender,
            updated: true
        });

        _nameRecords[name] = newId;
        _feeRecords[newId] = nameFee;

        return newId;
    }

    //burn the name nft and pay back the fees
    function burn(uint256 nameId) nonReentrant public {
        require(ownerOf(nameId) == msg.sender, "not owner!");

        uint256 nameFee = _feeRecords[nameId];

        delete _feeRecords[nameId];
        delete _nameRecords[_nameInfos[nameId].name];
        delete _nameInfos[nameId];

        _burn(nameId);

        payable(msg.sender).transfer(nameFee);
    } 

    //update avatar url
    function updateAvatar (uint256 nameId, string memory url) public {
        require(ownerOf(nameId) == msg.sender, "not owner!");

        _setTokenURI(nameId, url);
    }

    //update keys for get external infos
    function updateKeys(uint256 nameId, string memory publicKey, string memory privateKey) public {
        require(ownerOf(nameId) == msg.sender, "not owner!");

        _nameInfos[nameId].publicKey = publicKey;

        _nameInfos[nameId].privateKey = privateKey;

        _nameInfos[nameId].owner = msg.sender;

        _nameInfos[nameId].updated = true;
    }

    //get name total count
    function getNameTotalCount(bool onlyOwner) public view returns (uint){
        if(onlyOwner){
            return balanceOf(msg.sender);
        }else{
            return totalSupply();
        }
    }    

    //get name id list by page size and page count
    function getNameIndexsByPageCount(uint pageSize, uint pageCount, bool onlyOwner) public view returns(uint256[] memory){
        uint total = getNameTotalCount(onlyOwner);
        uint256[] memory indexList;
        uint count;

        if(pageSize > 100){
            pageSize = 100;
        }

        uint start = pageSize*pageCount;
        uint end = start+pageSize;

        uint256[] memory tmpList = new uint256[](pageSize);

        for(uint i = start; i < total; i++){
            if(i >= end){
                break;
            }

            if(onlyOwner){
                tmpList[count++] = tokenOfOwnerByIndex(msg.sender, i);
            }else{
                tmpList[count++] = tokenByIndex(i);
            }
        }

        if(count > 0){
            indexList = new uint256[](count);
            for(uint i = 0; i < count; i++){
                indexList[i] = tmpList[i];
            }
        }

        return indexList;
    }    

    //get name infos by id
    function getNameInfoById (uint256 nameId) public view returns (string memory, string memory, string memory, string memory, address, address, bool){
        return (
            _nameInfos[nameId].name,
            tokenURI(nameId),
            _nameInfos[nameId].publicKey,
            _nameInfos[nameId].privateKey,
            ownerOf(nameId),
            _nameInfos[nameId].owner,
            _nameInfos[nameId].updated
        );
    }

    //get name infos by name
    function getNameInfoByName(string memory name) public view returns (uint256, string memory, string memory, string memory, address, address, bool){
        uint256 nameId = _nameRecords[name];
        
        return (
            nameId,
            tokenURI(nameId),
            _nameInfos[nameId].publicKey,
            _nameInfos[nameId].privateKey,
            ownerOf(nameId),
            _nameInfos[nameId].owner,
            _nameInfos[nameId].updated
        );
    }

    //caculate stack fees
    function caculateFees(string memory name) public view returns (uint256) {
        return bytes(name).length*_baseFee;
    }

    //resolve address by given a name
    function resolveByName (string memory name) public view returns (address){
        return ownerOf(_nameRecords[name]);
    }

    //resolve a name by given address
    function resolveByAddress (address addr) public view returns (string[] memory){
        string[] memory names;

        uint count = balanceOf(addr);
        if(count == 0){
            return names;
        }

        names = new string[](count);
        for(uint i = 0; i < count; i++){
            uint256 nameId = tokenOfOwnerByIndex(addr, i);
            names[i] = _nameInfos[nameId].name;
        }

        return names;
    }
}