# Introduction

FundChain is simply a blockchain-based crowdfunding platform using which new entrepreneurs can raise financial for their business. This repository contains the Smart Contract, Test File and Deploy Scripts for the project. The project is built using 'Hardhat' which is simply an environment to write, test and deply smart contracts. Hardhat provides some fake accounts with some fake ethers that can be used to test the execution of various functions in the smart contract.

The 'contracts' folder contains the smart conntract in the name of 'Crowdfunding.sol' which is written in 'Solidity' language. It contains all the logic behind the execution of various transactions in the crowdfunding application. It includes functions like creation, deletion and abortion of a project, funding a project, withdrawing funds from a project, etc. Whenever any user executes a transaction in client side, a call will be made to the corresponding function of the smart contract.

The 'test' folder contains the test file '1_CrowdFunding_Test.js' which is used to test various functions of the Smart Contract before actually deploying it to blockchain. For this purpose, the fake ethers provided by hardhat are used.

The 'scripts' folder contains a file 'deploy.js' which is used to deploy the smart contract to actual blockchain.


## Using Hardhat 

To install hardhat, run this command in the terminal

```bash
  npm install --save-dev hardhat
```

To create a new hardhat project

```bash
  npx hardhat
```
Select `Create an empty hardhat.config.js` with your keyboard and hit enter.



To compile the smart contract, run the following command in the terimanl

```bash
  npx hardhat compile
```


To test the execution of various functions in the smart contract, write tests in the test file and run the follwing command

```bash
  npx hardhat test
```

To deploy the smart contract to a particular blockchain network, run the following command

```bash
  npx hardhat run scripts/deploy.js --network <network-name>
```
