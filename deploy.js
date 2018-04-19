const HDwalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDwalletProvider(
    'zero mammal can spatial finish nature bread dynamic photo drastic manual gasp',
    'https://rinkeby.infura.io/Gb6jV5frxcYOqoWSVfpq'
);
const web3 = new Web3(provider);

const deploy = async () => {
    
    const accounts = await new web3.eth.getAccounts();
    console.log('Attempting to deploy a contract', accounts[0]);
    const results = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi There!'] })
        .send({ from: accounts[0], gas: '1000000' })
        
    console.log('Our Contract is deployed to: ', results.options.address);
    
};
deploy();