//transak url
export const transakUrl = 'https://staging-global.transak.com/?apiKey=5aed5b3c-fbce-45ec-a62b-f835254ea9f9'

//covalent api host
export const covalentApiHost = 'https://api.covalenthq.com'
//covalent api key
export const covalentApiKey = 'ckey_c6e3dad6bbed4224bdb769673a9'

//ceramic host
export const CeramicApiHost = 'https://ceramic.passport-iam.gitcoin.co';

//swarm ts-tar metafile name
export const META_FILE_NAME = '.swarmgatewaymeta.json';

//web3 storage url
export const web3StorageHost = 'https://api.web3.storage';

//web3 storage appkey
export const web3StorageAppKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJlY0Q2MDVmZGZiNWVFRTdhYUZlYmVhNzUxMjVCMDBCNDkzMDMxOUUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTEzNjE4MTAwNDIsIm5hbWUiOiJ0ZXN0In0.SqcXP8E9fJEQ_7AGjrHaliBsoKCl2l2mA2q1-Lejkp4';

//web3 gateway
export const web3Gateway = "https://dweb.link/ipfs/"

//swarm api getway for download files from swarm
export const swarmGateway = "https://api.gateway.ethswarm.org/bzz/";

//swarm api gateway for upload files to swarm
export const swarmGatewayList = [
  "https://gateway-proxy-bee-0-0.gateway.ethswarm.org/bzz",
  "https://gateway-proxy-bee-1-0.gateway.ethswarm.org/bzz",
  "https://gateway-proxy-bee-2-0.gateway.ethswarm.org/bzz",
  "https://gateway-proxy-bee-3-0.gateway.ethswarm.org/bzz",
  "https://gateway-proxy-bee-4-0.gateway.ethswarm.org/bzz",
  "https://gateway-proxy-bee-5-0.gateway.ethswarm.org/bzz",
  "https://gateway-proxy-bee-6-0.gateway.ethswarm.org/bzz",
  "https://gateway-proxy-bee-7-0.gateway.ethswarm.org/bzz",
  "https://gateway-proxy-bee-8-0.gateway.ethswarm.org/bzz",
  "https://gateway-proxy-bee-9-0.gateway.ethswarm.org/bzz"
];
//arweave mainnet url
export const arweaveUrl = "https://arweave.net/";

//arweave testnet url
export const arweaveTestUrl = "https://arweave.net/";

//boba mainnet url
export const bundlrUrl = "https://node1.bundlr.network";

//boba testnet url
export const bundlrTestUrl = "https://devnet.bundlr.network";

//boba toekn testnet contract address 
export const bobaTestContractAddress = "0xF5B97a4860c1D81A1e915C40EcCB5E4a5E6b8309";

//name space surfix
export const nameSpaceSurfix = ".fns";

//green dao contract address
export const fileNameSpaceContractAddress = {
  5: "0x9F0eb3619F5FB576FB64f6d324C6f91a926491c5",
  50: "0xd654dDC0F79b28E6b0C32ec13Fd9702450032343",
  314: "0x5755579e4eD12D114CcdaB4AE69c99eb00479476",
  1422: "0x5755579e4eD12D114CcdaB4AE69c99eb00479476",
  3141: "0x5755579e4eD12D114CcdaB4AE69c99eb00479476",
  5001: "0x8a19Fe77193451Dc95f658e76dBEac95dC499f94",
  80001: "0x682021B3e777765e68f6Ab0B0b094E86Fb9c53be",
};

//token List
export const tokenList = {
  1: ['ETH'],
  3: ['ETH'],
  4: ['ETH'],
  5: ['ETH'],
  10: ['ETH'],
  28: ['BOBA', 'ETH'],
  42: ['ETH'],
  50: ['XDC'],  
  56: ['BNB'],
  66: ['OKT'],  
  82: ['MTR'],
  83: ['MTR'],
  100: ['xDAI'],
  128: ['HT'],
  137: ['MATIC'],  
  250: ['FTM'],
  288: ['BOBA', 'ETH'],
  314: ['FIL'],
  324: ['ETH'],
  588: ['METIS', 'ETH'],
  1001: ['KLAY'],
  1422: ['ETH'],
  1088: ['METIS', 'ETH'],
  2828: ['LYXT'],
  3141: ['tFIL'],
  4689: ['IOTX'],
  5000: ['BIT'],
  5001: ['BIT'],
  8217: ['KLAY'],
  9000: ['tEVMOS'],
  9001: ['EVMOS'],
  42161: ['ETH'],
  43114: ['AVAX'],
  80001: ['MATIC'],
};

//chain list
export const chainList = [
  {
    chainId: 1,
    chainName: 'Ethereum Chain Mainnet',
    nativeCurrency: 'ETH',
    rpcUrls: "https://mainnet.infura.io/v3",
    blockExplorerUrls: "https://etherscan.io",
  },
  {
    chainId: 3,
    chainName: 'Ropsten Chain Testnet',
    nativeCurrency: 'ETH',
    rpcUrls: 'https://ropsten.infura.io/v3',
    blockExplorerUrls: 'https://ropsten.etherscan.io',
  },
  {
    chainId: 4,
    chainName: 'Rinkeby Chain Testnet',
    nativeCurrency: 'ETH',
    rpcUrls: 'https://rinkeby.infura.io/v3',
    blockExplorerUrls: 'https://rinkeby.etherscan.io',
  },
  {
    chainId: 5,
    chainName: 'Goerli Chain Testnet',
    nativeCurrency: 'ETH',
    rpcUrls: 'https://goerli.infura.io/v3',
    blockExplorerUrls: 'https://goerli.etherscan.io',
  },
  {
    chainId: 10,
    chainName: 'Optimistic Chain Mainnet',
    nativeCurrency: 'ETH',
    rpcUrls: 'https://mainnet.optimism.io',
    blockExplorerUrls: 'https://optimism.io',
  },  
  {
    chainId: 28,
    chainName: 'Boba Chain Testnet',
    nativeCurrency: 'ETH',
    rpcUrls: 'https://rinkeby.boba.network',
    blockExplorerUrls: 'https://blockexplorer.rinkeby.boba.network',
  },    
  {
    chainId: 42,
    chainName: 'Kovan Chain Testnet',
    nativeCurrency: 'ETH',
    rpcUrls: 'https://kovan.infura.io/v3',
    blockExplorerUrls: 'https://kovan.etherscan.io',
  },
  {
    chainId: 50,
    chainName: 'XDC Chain Mainnet',
    nativeCurrency: 'XDC',
    rpcUrls: 'https://rpc.xinfin.network',
    blockExplorerUrls: 'https://explorer.xinfin.network',
  },  
  {
    chainId: 56,
    chainName: 'BSC Chain Mainnet',
    nativeCurrency: 'BNB',
    rpcUrls: 'https://bsc-dataseed.binance.org',
    blockExplorerUrls: 'https://bscscan.com',
  },
  {
    chainId: 66,
    chainName: 'OKEx Chain Mainnet',
    nativeCurrency: 'OKT',
    rpcUrls: 'https://exchainrpc.okex.org',
    blockExplorerUrls: 'https://www.oklink.com/okexchain',
  },  
  {
    chainId: 82,
    chainName: 'Meter Chain Mainnet',
    nativeCurrency: 'MTR',
    rpcUrls: 'https://rpc.meter.io',
    blockExplorerUrls: 'https://scan.meter.io',
  },  
  {
    chainId: 83,
    chainName: 'Meter Chain Testnet',
    nativeCurrency: 'MTR',
    rpcUrls: 'https://rpctest.meter.io',
    blockExplorerUrls: 'https://scan-warringstakes.meter.io',
  },      
  {
    chainId: 100,
    chainName: "Gnosis Chain Mainnet",
    nativeCurrency: "xDAI",
    rpcUrls: 'https://rpc.gnosischain.com',
    blockExplorerUrls: 'https://blockscout.com/xdai/mainnet',
  },
  {
    chainId: 128,
    chainName: 'Heco Chain Mainnet',
    nativeCurrency: 'HT',
    rpcUrls: 'https://http-mainnet-node.huobichain.com',
    blockExplorerUrls: 'https://hecoinfo.com',
  },
  {
    chainId: 137,
    chainName: 'Polygon Chain Mainnet',
    nativeCurrency: 'MATIC',
    rpcUrls: 'https://polygon-rpc.com',
    blockExplorerUrls: 'https://polygonscan.com',
  },  
  {
    chainId: 250,
    chainName: 'Fantom Chain Mainnet',
    nativeCurrency: 'FTM',
    rpcUrls: 'https://rpc.ftm.tools',
    blockExplorerUrls: 'https://ftmscan.com',    
  },  
  {
    chainId: 288,
    chainName: 'Boba Chain Mainnet',
    nativeCurrency: 'ETH',
    rpcUrls: 'https://mainnet.boba.network',
    blockExplorerUrls: 'https://blockexplorer.boba.network',
  },
  {
    chainId: 314,
    chainName: 'Filecoin Chain Mainnet',
    nativeCurrency: 'FIL',
    rpcUrls: 'https://rpc.ankr.com/filecoin',
    blockExplorerUrls: 'https://filfox.info/en',
  },
  {
    chainId: 324,
    chainName: 'Zksync Era Mainnet',
    nativeCurrency: 'ETH',
    rpcUrls: 'https://mainnet.era.zksync.io',
    blockExplorerUrls: 'https://mainnet.era.zksync.io',
  },
  {
    chainId: 588,
    chainName: 'Metis Stardust Testnet',
    nativeCurrency: 'METIS',
    rpcUrls: 'https://stardust.metis.io/?owner=588',
    blockExplorerUrls: 'https://stardust-explorer.metis.io',
  },
  {
    chainId: 1001,
    chainName: 'Klaytn Baobab Testnet',
    nativeCurrency: 'KLAY',
    rpcUrls: 'https://api.baobab.klaytn.net:8651',
    blockExplorerUrls: 'https://www.klaytn.com/',
  },    
  {
    chainId: 1422,
    chainName: 'Polygon zkEVM Testnet',
    nativeCurrency: 'ETH',
    rpcUrls: 'https://rpc.public.zkevm-test.net',
    blockExplorerUrls: 'https://explorer.public.zkevm-test.net',
  },
  {
    chainId: 1088,
    chainName: 'Metis Andromeda Mainnet',
    nativeCurrency: 'METIS',
    rpcUrls: 'https://andromeda.metis.io/?owner=1088',
    blockExplorerUrls: 'https://andromeda-explorer.metis.io',
  },    
  {
    chainId: 2828,
    chainName: 'KUKSO Test network',
    nativeCurrency: 'LYXT',
    rpcUrls: 'https://rpc.l16.lukso.network',
    blockExplorerUrls: 'https://explorer.execution.l16.lukso.network',
  },  
  {
    chainId: 3141,
    chainName: 'Filecoin Hyperspace Testnet',
    nativeCurrency: 'tFIL',
    rpcUrls: 'https://api.hyperspace.node.glif.io/rpc/v1',
    blockExplorerUrls: 'https://hyperspace.filfox.info/en',
  },
  {
    chainId: 4689,
    chainName: 'IoTex Chain Mainnet',
    nativeCurrency: 'IOTX',
    rpcUrls: 'https://babel-api.mainnet.iotex.io',
    blockExplorerUrls: 'https://iotexscan.io',
  },  
  {
    chainId: 5000,
    chainName: 'Mantle Chain Mainnet',
    nativeCurrency: 'BIT',
    rpcUrls: 'https://rpc.mantle.xyz',
    blockExplorerUrls: 'https://explorer.mantle.xyz',
  },
  {
    chainId: 5001,
    chainName: 'Mantle Chain Testnet',
    nativeCurrency: 'BIT',
    rpcUrls: 'https://rpc.testnet.mantle.xyz',
    blockExplorerUrls: 'https://explorer.testnet.mantle.xyz',
  },
  {
    chainId: 8217,
    chainName: 'Klaytn Cypress Mainnet',
    nativeCurrency: 'KLAY',
    rpcUrls: 'https://public-node-api.klaytnapi.com/v1/cypress',
    blockExplorerUrls: 'https://scope.klaytn.com',
  },    
  {
    chainId: 9000,
    chainName: 'Evmos Chain Testnet',
    nativeCurrency: 'tEVMOS',
    rpcUrls: 'https://eth.bd.evmos.dev:8545',
    blockExplorerUrls: 'https://evm.evmos.dev',
  },
  {
    chainId: 9001,
    chainName: 'Evmos Chain Mainnet',
    nativeCurrency: 'EVMOS',
    rpcUrls: 'https://eth.bd.evmos.org:8545',
    blockExplorerUrls: 'https://mintscan.io/evmos',
  },  
  {
    chainId: 42161,
    chainName: 'Arbitrum Chain Mainnet',
    nativeCurrency: 'ETH',
    rpcUrls: 'https://arb1.arbitrum.io/rpc',
    blockExplorerUrls: 'https://arbiscan.io',
  },  
  {
    chainId: 43114,
    chainName: 'AVAX Chain Mainnet',
    nativeCurrency: 'AVAX',
    rpcUrls: 'https://api.avax.network/ext/bc/C/rpc',
    blockExplorerUrls: 'https://cchain.explorer.avax.network',
  },
  {
    chainId: 80001,
    chainName: 'Polygon Mumbai Testnet',
    nativeCurrency: 'MATIC',
    rpcUrls: 'https://matic-mumbai.chainstacklabs.com',
    blockExplorerUrls: 'https://mumbai.polygonscan.com',
  },  
];