const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const managerPrompt = [
    {
        type: "input",
        message: "Please enter the name of the manager:",
        name: "name"
    }, {
        type: "input",
        message: "Please enter the ID of the manager:",
        name: "id"
    }, {
        type: "input",
        message: "Please enter the email of the manager:",
        name: "email"
    }, {
        type: "input",
        message: "Please enter the office # of the manager:",
        name: "officeNum"
    }
];

const engineerPrompt = [
    {
        type: "input",
        message: "Please enter the name of the engineer:",
        name: "name"
    }, {
        type: "input",
        message: "Please enter the ID of the engineer:",
        name: "id"
    }, {
        type: "input",
        message: "Please enter the email of the engineer:",
        name: "email"
    }, {
        type: "input",
        message: "Please enter the github user name of the engineer",
        name: "github"
    }
]

const internPrompt = [
    {
        type: "input",
        message: "Please enter the name of the intern:",
        name: "name"
    }, {
        type: "input",
        message: "Please enter the ID of the intern:",
        name: "id"
    }, {
        type: "input",
        message: "Please enter the email of the intern:",
        name: "email"
    }, {
        type: "input",
        message: "Please enter the school of the intern:",
        name: "school"
    }
]

const employeeTypePrompt = [
    {
        type: "list",
        message: "Please select a type of employee to add:",
        choices: ['Engineer', 'Intern', "I'm not adding more employee"],
        name: "employeeType",
    }
]

const main = async () => {
    const employees =[];

    const {name, id, email, officeNum} = await inquirer.prompt(managerPrompt);
    employees.push(new Manager(name, id, email, officeNum));
    let isDone = false;

    while (!isDone) {
        const { employeeType } = await inquirer.prompt(employeeTypePrompt);
        if (employeeType === 'Engineer') {
            await inquirer.prompt(engineerPrompt).then(res =>{
                employees.push(new Engineer(res.name, res.id, res.email, res.github));
            });
        } else if (employeeType === 'Intern') {
            await inquirer.prompt(internPrompt).then(res =>{
                employees.push(new Intern(res.name, res.id, res.email, res.school));
            });
        } else {
            isDone = true;
        }
    }

    fs.writeFile(outputPath, render(employees), err => {
        if (err) return console.log(err);
        console.log("A new html file is generated!");
    });
}

main();