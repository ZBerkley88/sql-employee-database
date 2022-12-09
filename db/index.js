const db = require('./connection');
const cTable = require('console.table');
const inquirer = require('inquirer');

function viewAllEmployees() {
    db.query('SELECT * FROM employee', function(err, res) {
        if (err) {
            console.error('Something is clearly wrong...')
        } else {
            console.table(res);
        }
    });
};

function viewAllEmployeesBd() {
    inquirer.prompt([ 
        {
            type: `list`,
            name: `deptChoice`,
            message: `Which department would you like to view?`,
            choices: [
                'Finance',
                'Marketing',
                'Sales'
            ]
        }
    ])
    .then((userChoice) => {
        if (userChoice.deptChoice === 'Finance') {
            db.query('SELECT department.name, role.title, role.salary, employee.first_name, employee.last_name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.id = ?;', 1, function(err, res) {
                if (err) {
                    console.error('Something is clearly wrong...')
                } else {
                    console.table(res);
                }
            })
        } else if (userChoice.deptChoice === 'Marketing') {
            db.query('SELECT department.name, role.title, role.salary, employee.first_name, employee.last_name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.id = ?;', 2, function(err, res) {
                if (err) {
                    console.error('Something is clearly wrong...')
                } else {
                    console.table(res);
                } 
            })
        } else {
            db.query('SELECT department.name, role.title, role.salary, employee.first_name, employee.last_name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.id = ?;', 3, function(err, res) {
                if (err) {
                    console.error('Something is clearly wrong...')
                } else {
                    console.table(res);
                }
            })
        }   
    })
};


function viewAllEmployeesBd() {
    inquirer.prompt([ 
        {
            type: `list`,
            name: `managerChoice`,
            message: `Which manager's employees would you like to view?`,
            choices: [
                'Finance',
                'Marketing',
                'Sales'
            ]
        }
    ])
    .then((userChoice) => {
 
 
    }


}

module.exports = { viewAllEmployees, viewAllEmployeesBd };