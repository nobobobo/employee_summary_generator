const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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

const employees =[];


const getInfo = async () => {
    const {name, id, email, officeNum} = await inquirer.prompt(managerPrompt);
    employees.push(new Manager(name, id, email, officeNum));
    let isDone = false;

    while (!isDone) {
        const { employeeType } = await inquirer.prompt([
            {
                type: "list",
                message: "Please select a type of employee to add:",
                choices: ['Engineer', 'Intern', "I'm not adding more employee"],
                name: "employeeType",
            }
        ]);

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
    console.log(employees);
}
getInfo();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
