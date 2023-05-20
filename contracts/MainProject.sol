// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import 'hardhat/console.sol';

contract MainProject {

    struct Owner {
        address addr;
        string name;
    }

    struct User {
        address addr;
        string name;
        string user_id;
    }

    struct Company {
        address addr;
        string name;
        string company_id;
    }

    struct File {
        string link;
        string title;
        string description;
        string uploaded_on;
        uint index;
        string id;
    }

    struct Job {
        string company_id;
        string title;
        string description;
        string requirements;
        string eligibility;
        bool active;
        uint index;
    }

    struct Report {
        address user;
        string comment;
        string file_link;
        string created_on;
        string updated_on;
        uint index;
    }

    uint public reportCount = 0;
    Report[] public reports;

    uint public jobCount = 0;
    Job[] public jobs;

    uint public ownerCount = 0;
    Owner[] public owners;

    uint public userCount = 0;
    User[] public users;

    uint public companyCount = 0;
    Company[] public companies;

    uint public fileCount = 0;
    File[] public files;

    constructor() {
        ownerCount++;
        owners.push(Owner(msg.sender, 'Main Project Admin'));
    }

    function addReport(string memory _comment, string memory _file_link, string memory created_on) public {
        reports.push(Report(msg.sender, _comment, _file_link, created_on, "", reportCount));
        reportCount++;
    }

    function editReport(uint _index, string memory _comment, string memory _file_link, string memory _updated_on) public {
        Report memory _r = reports[_index];
        _r.comment = _comment;
        _r.file_link = _file_link;
        _r.updated_on = _updated_on;

        reports[_index] = _r;
    }

    function addJob(string memory _company_id, string memory _title, string memory _description, string memory _requirements, string memory _eligibility, bool _active) public {
        jobs.push(Job(_company_id, _title, _description, _requirements, _eligibility, _active, jobCount));
        jobCount++;
    }

    function editJob(uint _index, string memory _description, string memory _requirements, string memory _eligibility, bool _active) public {
        Job memory _r = jobs[_index];
        _r.description = _description;
        _r.requirements = _requirements;
        _r.eligibility = _eligibility;
        _r.active = _active;
        _r.title = jobs[_index].title;

        jobs[_index] = _r;
    }

    function isCompany(address _addr) public view returns(bool) {
        for (uint i = 0; i < companyCount; i++) {
            if (_addr == companies[i].addr) return true;
        }
        return false;
    }

    function isUser(address _addr) public view returns(bool) {
        for (uint i = 0; i < userCount; i++) {
            if (_addr == users[i].addr) return true;
        }
        return false;
    }

    function addUser(address _addr, string memory _name, string memory _user_id) public {
        users.push(User(_addr, _name, _user_id));
        userCount++;
    }

    function addCompany(address _addr, string memory _name, string memory _company_id) public {
        companies.push(Company(_addr, _name, _company_id));
        userCount++;
    }

    function addFile(string memory _link, string memory _title, string memory _description, string memory _uploaded_on, string memory _id) public {
        File memory _r;
        _r.link = _link;
        _r.title = _title;
        _r.description = _description;
        _r.uploaded_on = _uploaded_on;
        _r.index = fileCount;
        _r.id = _id;
        files.push(_r);
        fileCount++;
    }
}