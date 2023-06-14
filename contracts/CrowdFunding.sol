// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Update{
        uint256 id;
        string update;
        int256 votes;
        address[] voters;
        uint256 deadline;
    }

    mapping(uint256 => Update) public updates;

    uint256 public numberOfUpdates = 0;

    struct Project {
        string[14] stringArray; // owner_name, video, tagline, title, desc, image, country, hq_address,plan,twitter,mail,insta,linkedIn,doc.
        uint256[7] intArray; // target, deadline, amountRaised, visible, prev_amount_raised, valuation, min_invest
        address owner;
        address[] donators;
        uint256[] donations;
        string[] donators_name;
        string category;
        Update[] updates;
        uint256 totalUpdates;
    }

    mapping(uint256 => Project) public projects;

    uint256 public numberOfProjects = 0;

    function createProject(
        string[14] memory strArr, uint256[7] memory intArr, address _owner, string memory _category
    ) public payable returns (uint256) {
        Project storage project = projects[numberOfProjects];

        require(
            project.intArray[1] < block.timestamp,
            "The deadline should be a date in the future."
        );

        project.intArray[0] = intArr[0]*1000000000000000000;
        project.intArray[1] = intArr[1];
        project.intArray[2] = intArr[2];
        project.intArray[3] = intArr[3];
        project.intArray[4] = intArr[4]*1000000000000000000;
        project.intArray[5] = intArr[5]*1000000000000000000;
        project.intArray[6] = intArr[6]*1000000000000000;

        project.stringArray[0] = strArr[0];
        project.stringArray[1] = strArr[1];
        project.stringArray[2] = strArr[2];
        project.stringArray[3] = strArr[3];
        project.stringArray[4] = strArr[4];
        project.stringArray[5] = strArr[5];
        project.stringArray[6] = strArr[6];
        project.stringArray[7] = strArr[7];
        project.stringArray[8] = strArr[8];
        project.stringArray[9] = strArr[9];
        project.stringArray[10] = strArr[10];
        project.stringArray[11] = strArr[11];
        project.stringArray[12] = strArr[12];
        project.stringArray[13] = strArr[13];

        project.totalUpdates = 0;

        project.category = _category;

        project.owner = _owner;

        numberOfProjects++;

        return numberOfProjects - 1;
    }

    function InvestInProject(uint256 _id , string memory _name) payable public returns (uint256) {
        uint256 amount = msg.value;

        Project storage project = projects[_id];

        project.donators.push(msg.sender);
        project.donations.push(amount);
        project.donators_name.push(_name);

        project.intArray[2] = project.intArray[2] + amount;


        return project.intArray[2];
    }

    function getBalance(uint256 _id) public view returns (uint256) {
        Project storage project = projects[_id];
        return project.intArray[2];
    }

    function withdraw(uint256 _id, uint256 _id1) public {
        Project storage project = projects[_id];
        require(
            project.intArray[0] <= project.intArray[2],
            "Your project could not reach the target within deadline"
        );
        require(
            project.updates[_id1].votes > 0,
            "Your request does not have enough votes"
        );
        payable(msg.sender).transfer(project.intArray[2]);
        project.intArray[2] = 0;
        project.intArray[3] = 1;
    }

    function deleteProject(uint256 _toDelete) public returns (uint256){
        Project storage project = projects[_toDelete];
        project.intArray[3] = 1;
        return _toDelete;
    }

    function getDonators(
        uint256 _id
    ) public view returns (address[] memory) {
        return (projects[_id].donators);
    }

    function getProjects() public view returns (Project[] memory) {
        Project[] memory allProjects = new Project[](numberOfProjects);

        for (uint i = 0; i < numberOfProjects; i++) {
            Project storage item = projects[i];

            allProjects[i] = item;
        }

        return allProjects;
    }

    function abortProject(uint256 _id) public {
        Project storage project = projects[_id];

        for(uint256 i = 0; i < project.donators.length;i=i+1){
            payable(project.donators[i]).transfer(project.donations[i]);
        }

        project.intArray[3] = 1;
    }

    function makeUpdate(uint256 _id , string memory _update, uint256 _deadline) public {
        Update storage update = updates[numberOfUpdates];
        Project storage project = projects[_id];

        update.update = _update;  
        update.deadline = _deadline;
        update.id = numberOfUpdates;

        project.updates.push(update);
        project.totalUpdates++;
        numberOfUpdates++;
    }

    function makeResponse(uint256 _id , uint256 _id1, address _voter, uint256 _vote) public {
        Project storage project = projects[_id];

        project.updates[_id1].voters.push(_voter);

        if(_vote == 1)
        project.updates[_id1].votes = project.updates[_id1].votes + 1;

        else {
            project.updates[_id1].votes = project.updates[_id1].votes - 1;
        }
    }

}