const inquirer = require('inquirer');
const db = require('./db/index');

// Finish your welcome message
console.log(
    '\nWelcome to the SQL Company Database! \nFurther Instructions Go Here\n'
);

function mainMenu() {
    inquirer.prompt([ 
        {
            type: `list`,
            name: `mainMenu`,
            message: `What would you like to do?`,
            choices: [
                'View All Employees', 
                'View All Employees By Department', 
                'View All Employees By Manager', 
                'Add Employee', 
                'Remove Employee', 
                'Update Employee Role', 
                'Update Employee Manager'
            ]
        }
    ])
    .then((userChoice) => {
        if (userChoice.mainMenu === 'View All Employees') {
            db.viewAllEmployees();
        } else if (userChoice.mainMenu === 'View All Employees By Department') {
            db.viewAllEmployeesBd();
        } else {
            console.log('End')    
            return
        } 
    })
};



mainMenu();