/*
const url = 'https://polygon-mumbai.g.alchemy.com/v2/2haggC0dpL8-uonWikDxRgdFj1CoSgc8';

const Web3 = require('web3');

const ABI = require('./instance.json');

const adress = '0x1BA15b804d606d41E58B181F6031d0210C4d7D4B';

const pirvateKey = /* your private key goes here */

'';

/*
// Using web3js
const web3 = new Web3(url);

const account = web3.eth.accounts.privateKeyToAccount(pirvateKey);

web3.eth.accounts.wallet.add(account);

const contract = new web3.eth.Contract(ABI.abi, adress);

console.log(contract);

contract.methods
  .info()
  .call()
  .then((r) => console.log(r));

contract.methods
  .password()
  .call()
  .then((r) => console.log(r));

contract.methods
  .authenticate('pass1')
  .send({
    from: '0x34b76bF476d81732D65b471bd27Df08bF7826061',
    gasLimit: 300000,
  })
  .then((r) => console.log(r.events.EventName.returnValues));
  */
