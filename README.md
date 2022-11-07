# filename-space

 filename space, a decentralized web3 name service based on ethereum and filecoin to make people use the web3 apps simply and ealisy.
 
 There are some features which maybe attract you:
 
 1. using filename-space, you can register a ".fil" name to bind your wallet address.

 2. stack to mint, you must stack some eth tokens to mint a name nft. and when you burn it, it will return the stack fees to your wallet.
 
 3. we suggest simle names when you deside to mint a name nft. so the longer the name length you mint, the more fees you need to stack in the smartcontract.
 
 4. each wallet only can mint one name nft, so that we wish our name serivce can have more really active users.
 
 5. mutable configs are supported based on the web3.storage and w3name services, which will store your avatars and configures on the filecoin network.
 
 ***How to run:***
 
 0. make sure you are using linux system installed with git, node, npm .etc.
 
 1. clone this project
 
           git clone https://github.com/shepherliu/filename-space.git
           
 2. cd this project
 
           cd filename-space
           
 3. install dependencies
 
           npm install
           
 4.  run it on https://localhost:8080/
 
           npm run serve
           
 5.  build it for production
 
           npm run build
           
 6.  see our daemon website: https://filename-space.vercel.app
 
 7.  see our daemon video: https://youtu.be/o2sYe3K7PXU


***Future Plans:***

1. support private configures with your binding names, which will encrypt the configs with your wallet and the save to the filecoin network through w3name service.

2. support files upload with your bing names, you can ealisy manage your important files stored on the filecoin network through web3.storage and w3name serivce.

3. name service SDK supports, then you can ealisy resolve the name and address in your own apps.

4. ui/ux degsign for more user friendly.

***How it use chainlink:***

1. we use the chainlink keeper functions in our smart contracts, these smart contracts are Keepers-compatible Contracts:

           contracts/FileNameSpace.sol
           
2. the checkUpkeep function will check if the name nft is outdated or not.

3. the performUpkeep function will automaticly set the name nft status to outdated if transfer happened. 

***How it use filecoin:***

1. we use web3storage to upload the the nft avatar images to the filecoin.

2. we use w3name to store mutable configures binding to the name nft. 

***Resources:***

1.Block Chain Resource Docs:

getting started with Ploygon Network: https://docs.polygon.technology/, https://faucet.polygon.technology/

2. Distributed Storage Resource Docs:

getting started with IPFS & Filecoin: https://bitly.protocol.ai/IPFS_Filecoin_Get_Started

getting started with Web3Storage: https://web3.storage/docs/

getting started with W3name: https://web3.storage/docs/how-tos/w3name/

3. Chainlink Resource Docs

getting started with Chainlink: https://docs.chain.link/

getting started with Chainlink Keeper: https://docs.chain.link/docs/chainlink-keepers/compatible-contracts/

register Chainlink upkeep: https://docs.chain.link/docs/chainlink-keepers/register-upkeep/

4. Transak Docs:

getting started wit Transak: https://integrate.transak.com/

5. Unstoppable Domains:

unstoppable Domains Resolution API: https://docs.alchemy.com/alchemy/enhanced-apis/unstoppable-domains-apis

NFT domains registry architecture: https://docs.unstoppabledomains.com/domain-registry-essentials/uns-vs-cns-comparison

domain resolution SDKs: https://docs.unstoppabledomains.com/send-and-receive-crypto-payments/resolution-libraries

how to resolve domains using direct blockchain call (without SDK): https://docs.unstoppabledomains.com/send-and-receive-crypto-payments/direct-blockchain-calls

crypto payments integration guide: https://docs.unstoppabledomains.com/send-and-receive-crypto-payments/crypto-payments

6. Smart contract Resource Docs:

online solidity compilier: https://chainide.com/, https://remix.ethereum.org/

getting started with ethers.js: https://docs.ethers.io/v5/

getting started with solidity: https://docs.soliditylang.org/en/latest/

7. Fronted Resource Docs:

getting started with Vue3: https://vuejs.org/guide/introduction.html

getting started with Element Ui: https://element-plus.org/en-US/component/menu.html



***Contract Me:***

Email: shepher.liu@gmail.com

Unstoppable Domain Register Email: shepher.liu@gmail.com

Discord: swarmlover#4063
