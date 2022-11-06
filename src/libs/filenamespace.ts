// example imports 
import { providers, utils, Contract } from "ethers"

import { fileNameSpaceContractAddress } from "../constant"

import {networkConnect, connectState} from "./connect"

import { ERC20 } from "./erc20"

const abi = [
	"function isApprovedForAll(address owner, address operator) public view returns (bool)",
	"function name() public view returns (string)",
	"function symbol() public view returns (string)",
	"function ownerOf(uint256 tokenId) public view returns (address)",
	"function tokenByIndex(uint256 index) public view returns (uint256)",
	"function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)",
	"function tokenURI(uint256 tokenId) public view returns (string)",
	"function totalSupply() public view returns (uint256)",
	"function balanceOf(address owner) public view returns (uint256)",
	"function approve(address to, uint256 tokenId) public returns (bool)",
	"function getApproved(uint256 tokenId) public view returns (address)",
	"function safeTransferFrom(address from, address to, uint256 tokenId) public returns (bool)",
	"function transferFrom(address from, address to, uint256 tokenId) public returns (bool)",
	"function setApprovalForAll(address operator, bool approved) public returns (bool)",
	"function mint(string name, string url, string publicKey, string privateKey) public payable returns (uint256)",
	"function burn(uint256 nameId) public",
	"function updateAvatar (uint256 nameId, string url) public",
	"function updateKeys(uint256 nameId, string publicKey, string privateKey) public",
	"function getNameTotalCount(bool onlyOwner) public view returns (uint)",
	"function getNameIndexsByPageCount(uint pageSize, uint pageCount, bool onlyOwner) public view returns(uint256[])",
	"function getNameInfoByName(string name) public view returns (uint256, string, string, string, address, address, bool)",
	"function getNameInfoById (uint256 nameId) public view returns (string, string, string, string, address, address, bool)",
	"function caculateFees(string name) public view returns (uint256)",
	"function resolveByName (string name) public view returns (address)",
	"function resolveByAddress (address addr) public view returns (string[])",
];

const zeroAddress = '0x0000000000000000000000000000000000000000';

export class FileNameSpace {
	private contractAddress: string;

	constructor(contractAddress:string = ''){
		this.contractAddress = contractAddress;
	}

	private getContract = async () => {
		await networkConnect();

		return new Contract(this.getAddress(), abi, connectState.signer);		
	}	

	public getAddress = () => {
		if(this.contractAddress != ''){
			return this.contractAddress;
		}else{
			return (fileNameSpaceContractAddress as any)[connectState.chainId];
		}
	}	

	public isApprovedForAll = async (owner:string, operator:string) => {
		const contract = await this.getContract();

		return await contract.isApprovedForAll(owner, operator);
	}

	public name = async () => {
		const contract = await this.getContract();

		return await contract.name();
	}

	public symbol = async () => {
		const contract = await this.getContract();

		return await contract.symbol();
	}

	public totalSupply = async () => {
		const contract = await this.getContract();

		const res = await contract.totalSupply();

		return res.toNumber();
	}

	public balanceOf = async (address:string) => {
		const contract = await this.getContract();

		const res = await contract.balanceOf(address);

		return res.toNumber();
	}

	public ownerOf = async (tokenId:number) => {
		if(tokenId <= 0){
			throw new Error("invalid token id!");
		}

		const contract = await this.getContract();

		return await contract.ownerOf(tokenId);
	}

	public tokenByIndex = async (index:number) => {
		if(index < 0){
			throw new Error("invalid token index!");
		}

		const contract = await this.getContract();

		const res = await contract.tokenByIndex(index);

		return res.toNumber();
	}

	public tokenOfOwnerByIndex = async (owner:string, index:number) => {
		if(index < 0){
			throw new Error("invalid token index!");
		}

		const contract = await this.getContract();

		const res = await contract.tokenOfOwnerByIndex(owner, index);

		return res.toNumber();
	}

	public tokenURI = async (tokenId:number) => {
		if(tokenId <= 0){
			throw new Error("invalid token id!");
		}

		const contract = await this.getContract();

		return await contract.tokenURI(tokenId);
	}

	public approve = async (to:string, tokenId:number) => {
		if(tokenId <= 0){
			throw new Error("invalid token id!");
		}

		const contract = await this.getContract();

		const tx = await contract.approve(to, tokenId);

		await tx.wait();

		return tx.hash;
	}

	public getApproved = async (tokenId:number) => {
		if(tokenId <= 0){
			throw new Error("invalid token id!");
		}

		const contract = await this.getContract();

		return await contract.getApproved(tokenId);
	}

	public safeTransferFrom = async (from:string, to:string, tokenId:number) => {
		if(tokenId <= 0){
			throw new Error("invalid token id!");
		}

		const contract = await this.getContract();

		const tx = await contract.safeTransferFrom(from, to, tokenId);

		await tx.wait();

		return tx.hash;		
	}

	public transferFrom = async (from:string, to:string, tokenId:number) => {
		if(tokenId <= 0){
			throw new Error("invalid token id!");
		}
				
		const contract = await this.getContract();

		const tx = await contract.transferFrom(from, to, tokenId);

		await tx.wait();

		return tx.hash;		
	}

	public setApprovalForAll = async (operator:string, approved:boolean) => {
		const contract = await this.getContract();

		const tx = await contract.setApprovalForAll(operator, approved);

		await tx.wait();

		return tx.hash;		
	}

	public mint = async (name:string, avatar:string, publicKey:string, privateKey:string) => {
		name = name.trim();
		if(name.length <= 0){
			throw new Error("invalid name!");
		}

		avatar = avatar.trim();
		if(avatar.length <= 0){
			throw new Error("invalid avatar url link!");
		}

		if(avatar.search("https://") != 0 ){
			throw new Error("avatar url must started with 'https://'!");
		}

		publicKey = publicKey.trim();
		if(publicKey.length === 0){
			throw new Error("invalid publicKey!");
		}

		privateKey = privateKey.trim();
		if(privateKey.length === 0){
			throw new Error("invalid privateKey!");
		}		

		const contract = await this.getContract();

		const opts = { value : await this.caculateFees(name)};

		const tx = await contract.mint(name, avatar, publicKey, privateKey, opts);

		await tx.wait();

		return tx.hash;
	}

	public updateAvatar = async (nameId:number, avatar:string) => {
		if(nameId <= 0){
			throw new Error("invalid name id!");
		}

		avatar = avatar.trim();
		if(avatar.length <= 0){
			throw new Error("invalid avatar url link!");
		}

		if(avatar.search("https://") != 0 ){
			throw new Error("avatar url must started with 'https://'!");
		}

		const contract = await this.getContract();

		const tx = await contract.updateAvatar(nameId, avatar);

		await tx.wait();

		return tx.hash;
	}

	public updateKeys = async (nameId:number, publicKey:string, privateKey:string) => {
		if(nameId <= 0){
			throw new Error("invalid name id!");
		}

		publicKey = publicKey.trim();
		if(publicKey.length === 0){
			throw new Error("invalid publicKey!");
		}

		privateKey = privateKey.trim();
		if(privateKey.length === 0){
			throw new Error("invalid privateKey!");
		}

		const contract = await this.getContract();

		const tx = await contract.updateKeys(nameId, publicKey, privateKey);

		await tx.wait();

		return tx.hash;
	}

	public burn = async (nameId:number) => {
		if(nameId <= 0){
			throw new Error("invalid name id!");
		}

		const contract = await this.getContract();

		const tx = await contract.burn(nameId);

		await tx.wait();

		return tx.hash;		
	}

	public caculateFees = async (name:string) => {
		const contract = await this.getContract();

		return await contract.caculateFees(name);
	}

	public resolveByName = async (name:string) => {
		const contract = await this.getContract();

		return await contract.resolveByName(name);
	}

	public resolveByAddress = async (addr:string) => {
		const contract = await this.getContract();

		return await contract.resolveByAddress(addr);
	}

	public getNameIndexsByPageCount = async (pageSize:number, pageCount:number, onlyOwner:boolean) => {
		if(pageSize <=0 || pageSize > 100){
			throw new Error("invalid page size!");
		}

		if(pageCount < 0){
			throw new Error("invalid page count!");
		}

		const contract = await this.getContract();

		const indexList = [];

		const res = await contract.getNameIndexsByPageCount(pageSize, pageCount, onlyOwner);

		for(const i in res){
			indexList.push(res[i].toNumber());
		}

		return indexList;
	}

	//parse name info
	public getNameInfoById = async (nameId:number) => {
		if(nameId <= 0){
			throw new Error("invalid name id!");
		}

		const contract = await this.getContract();

		try{
			const res = await contract.getNameInfoById(nameId);

			return {
				nameId: nameId,
				name: res[0],
				url: res[1],
				publicKey: res[2],
				privateKey: res[3],
				owner: res[4].toLowerCase(),
				oldOwner: res[5].toLowerCase(),
				updated: res[6],
			};
		}catch(e){
			return {
				nameId: 0,
				name: '',
				url: '',
				publicKey: '',
				privateKey: '',
				owner: '',
				oldOwner: '',
				updated: false,
			};
		}
	}

	public getNameInfoByName = async (name:string) => {
		name = name.trim();
		if(name === ''){
			throw new Error("invalid name!");
		}

		const contract = await this.getContract();

		try{
			const res = await contract.getNameInfoByName(name);

			return {
				nameId: res[0].toNumber(),
				name: name,
				url: res[1],
				publicKey: res[2],
				privateKey: res[3],
				owner: res[4].toLowerCase(),
				oldOwner: res[5].toLowerCase(),
				updated: res[6],
			};
		}catch(e){
			return {
				nameId: 0,
				name: name,
				url: '',
				publicKey: '',
				privateKey: '',
				owner: '',
				oldOwner: '',
				updated: false,
			};
		}
	}

	public getNameTotalCount = async (onlyOwner:boolean) => {
		const contract = await this.getContract();

		const res = await contract.getNameTotalCount(onlyOwner);

		return res.toNumber();
	}
}