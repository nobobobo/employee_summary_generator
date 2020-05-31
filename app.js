const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// construct propmt questions for manager 
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

// construct propmt questions for engineer
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

// construct propmt questions for intern
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

// construct propmt question to get next type of employee to add.
const employeeTypePrompt = [
    {
        type: "list",
        message: "Please select a type of employee to add:",
        choices: ['Engineer', 'Intern', "I'm not adding more employee"],
        name: "employeeType",
    }
]

// main function
const main = async () => {
    // initialize employees list. There will be employee class elements to be pushed into it.
    const employees =[];

    // get information of manager, create a new manager class and push to employee list
    const {name, id, email, officeNum} = await inquirer.prompt(managerPrompt);
    employees.push(new Manager(name, id, email, officeNum));

    // initialize isDone boolean in order to repeat inquirer
    let isDone = false;

    while (!isDone) {
        // get employee type from prompt
        const { employeeType } = await inquirer.prompt(employeeTypePrompt);

        // execute another prompt based on the input of the type
        if (employeeType === 'Engineer') {
            await inquirer.prompt(engineerPrompt).then(res =>{
                employees.push(new Engineer(res.name, res.id, res.email, res.github));
            });
        } else if (employeeType === 'Intern') {
            await inquirer.prompt(internPrompt).then(res =>{
                employees.push(new Intern(res.name, res.id, res.email, res.school));
            });
        // if the user chose not adding more, setting isDone to true, which will quit the loop.
        } else {
            isDone = true;
        }
    }

    // render and write file based on the employee list. 
    fs.writeFile(outputPath, render(employees), err => {
        if (err) return console.log(err);
        console.log("A new html file is generated!");
    });
}

main();