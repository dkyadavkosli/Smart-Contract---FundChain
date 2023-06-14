const { ethers } = require("hardhat");
const { assert } = require("chai");

// npx hardhat run scripts/deploy.js --network polygon

describe("CrowdFunding", function () {
  let CrowdFunding_Factory, crowd_funding;

  this.beforeEach(async function () {
    CrowdFunding_Factory = await ethers.getContractFactory("CrowdFunding");
    crowd_funding = await CrowdFunding_Factory.deploy();
  });

  it("Should create a project", async function () {
    let all;
    const _project = await crowd_funding.createProject(
      ["ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss"] , [1,2,3,4,5,6,7], "0x863441952A806c680cea03915077B72876DA17f3", "dd"
    );
    all = await crowd_funding.getProjects();

    assert.equal(all.length, 1);
    assert.equal(all[0].intArray[2], 3);
  });

  it("Should return all projects", async function () {
    let all;
    const _project = await crowd_funding.createProject(
      ["ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss"] , [1,2,3,4,5,6,7], "0x863441952A806c680cea03915077B72876DA17f3", "dd"
    );
    all = await crowd_funding.getProjects();

    assert.equal(all.length, 1);
  });

  it("Should invest in a project", async function () {
    let all;
    const _project = await crowd_funding.createProject(
      ["ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss"] , [1,2,0,4,5,6,7], "0x863441952A806c680cea03915077B72876DA17f3", "dd"
    );
    const _invest = await crowd_funding.InvestInProject(0, "DK", { value: 2 });
    all = await crowd_funding.getProjects();

    const bal = await crowd_funding.getBalance(0);

    assert.equal(bal, 2);
    assert.equal(all[0].donators.length, 1);
    assert.equal(all[0].donations.length, 1);

    // const withdraw = await crowd_funding.withdraw(0);

    // const balance = await crowd_funding.getBalance(0);
    // assert.equal(balance, 0);
  });

  it("Should return donators in a project", async function () {
    let all, _donators;
    const _project = await crowd_funding.createProject(
      ["ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss"] , [1,2,3,4,5,6,7], "0x863441952A806c680cea03915077B72876DA17f3", "dd"
    );
    const _invest = await crowd_funding.InvestInProject(0, { value: 2 });

    all = await crowd_funding.getProjects();
    _donators = await crowd_funding.getDonators(0);

    assert.equal(_donators.length, 1);
  });

  it("Should delete a project", async function () {
    let all;
    const _project = await crowd_funding.createProject(
      ["ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss"], [1,2,3,0,5,6,7], "0x863441952A806c680cea03915077B72876DA17f3", "dd"
    );
    all = await crowd_funding.getProjects();

    assert.equal(all.length, 1);
    assert.equal(all[0].intArray[3], 0);

    const _invest = await crowd_funding.deleteProject(0);
    all = await crowd_funding.getProjects();


    assert.equal(all[0].intArray[3] ,1);
  });

  it("Should abort a project", async function () {
    let all;
    const _project = await crowd_funding.createProject(
      ["ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss"], [1,2,0,0,5,6,7], "0x863441952A806c680cea03915077B72876DA17f3", "dd"
    );

    const _invest = await crowd_funding.InvestInProject(0, "DK", { value: 2 });

    const bal = await crowd_funding.getBalance(0);

    assert.equal(bal, 2);

    await crowd_funding.abortProject(0);
    all = await crowd_funding.getProjects();
    
    assert(all[0].intArray[2], 0);

    assert.equal(all[0].intArray[3] ,1);
  });

  it("Should make an update", async function () {
    let all;
    const _project = await crowd_funding.createProject(
      ["ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss"], [1,2,0,0,5,6,7], "0x863441952A806c680cea03915077B72876DA17f3", "dd"
    );

    const _inv = await crowd_funding.InvestInProject(0, "DK", { value: 2 });

    const _invest = await crowd_funding.makeUpdate(0, "2 cups coffee", 2);

    all = await crowd_funding.getProjects();
    
    assert(all[0].updates[0].deadline, 2);
  });

  it("Should make a response", async function () {
    let all;
    const _project = await crowd_funding.createProject(
      ["ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss","ss"], [1,2,0,0,5,6,7], "0x863441952A806c680cea03915077B72876DA17f3", "dd"
    );

    const _inv = await crowd_funding.InvestInProject(0, "DK", { value: 2 });

    const _invest = await crowd_funding.makeUpdate(0, "2 cups coffee", 2);

    const _res = await crowd_funding.makeResponse(0, 0, "0x863441952A806c680cea03915077B72876DA17f3", 0);

    all = await crowd_funding.getProjects();
    
    assert(all[0].updates[0].deadline, 2);

    assert(all[0].updates[0].votes, -1);
  });
});
