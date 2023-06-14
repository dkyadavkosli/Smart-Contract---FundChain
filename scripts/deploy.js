async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const CrowdFunding = await ethers.getContractFactory("CrowdFunding");
  const funding = await CrowdFunding.deploy();

  console.log("Contract address:", funding.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
