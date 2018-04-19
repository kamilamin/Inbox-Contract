const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // constructor of web3 library
const web3 = new Web3(ganache.provider()); // instance of the web3 library that are going to deploy on any ethereum network
const { interface, bytecode } = require('../compile');

// class Car {
//     park(){
//         return 'stopped';
//     }

//     drive(){
//         return 'vroom';
//     }
// }

// let car;

// beforeEach( () => {
//     car = new Car();
// })

// describe('Car', () => {
//     it('can park', () => {
//         assert.equal(car.park(), 'stopped');
//     });

//     it('can drive', () => {
//         assert.equal(car.drive(), 'vroom');
//     });
// });

let accounts;
let inbox;

beforeEach( async () => {
    // get a list of accounts

    accounts=  await  web3.eth.getAccounts();

    // use one of the those account to deploy the contract

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi There!'] })
        .send({ from: accounts[0], gas: '1000000' })


});

describe('Inbox', () => {

    it('Deploy a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi There!')
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    });

});


