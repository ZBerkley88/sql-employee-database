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
            db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary FROM employee WHERE id = ? JOIN role ON employee_role.id = role.id;', 1, function(err, res) {
                if (err) {
                    console.error('Something is clearly wrong...')
                } else {
                    console.table(res);
                }
            })
        }
    })
};

module.exports = { viewAllEmployees, viewAllEmployeesBd };