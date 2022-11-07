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
 
 7.  see our daemon video:


***Future Plans:***

1. support private configures with your binding names, which will encrypt the configs with your wallet and the save to the filecoin network through w3name service.

2. support files upload with your bing names, you can ealisy manage your important files stored on the filecoin network through web3.storage and w3name serivce.

3. name service SDK supports, then you can ealisy resolve the name and address in your own apps.

4. ui/ux degsign for more user friendly.
