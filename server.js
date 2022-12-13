const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

console.log(
    '\nWelcome to the SQL Company Database!'
);

// View all employees
function viewAllEmployees() {

    db.query('SELECT employee.id AS employee_id, employee.first_name, employee.last_name, department.name AS department_name, role.title AS job_title, role.salary, manager.first_name as manager_first_name, manager.last_name as manager_last_name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id JOIN employee AS manager ON employee.manager_id = manager.id;', function(err, res) {
        if (err) {
            console.log(err)
        } else {
            console.table(res);
            mainMenu();
        }
    });
};


// View all departments
function viewAllDepartments() {

        db.query('SELECT * FROM department;', function(err, res) {
            if (err) {
                console.log(err)
            } else {
                console.table(res);
                mainMenu();
            }
        });
}


// View all employees by department
function viewAllEmployeesBd() {

    db.query(`SELECT name, id FROM department`, (err, data) => {
        if (err) console.log(err)        
    
        const deptList = data.map(({ name, id }) => ({ name: name, value: id }));

    inquirer.prompt([ 
        {
            type: `list`,
            name: `deptChoice`,
            message: `Which department would you like to view?`,
            choices: deptList
        }
    ])
    .then((userChoice) => {
        // console.log(userChoice.deptChoice)        
            db.query(`SELECT department.name AS department_name, role.title, role.salary, employee.first_name, employee.last_name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.id = ${userChoice.deptChoice};`, function(err, res) {
                if (err) {
                    console.log(err)
                } else {
                    console.table(res);
                    mainMenu();
                }
            })
        })
    });
}



// View all roles
function viewAllRoles() {

    db.query('SELECT role.id AS role_id, role.title AS job_title, role.salary, department.name AS department_name, department.id AS department_id FROM role JOIN department ON role.department_id = department.id;', function(err, res) {
        if (err) {
            console.log(err)
        } else {
            console.table(res);
            mainMenu();
        }
    });
}


// Add a department
function addDepartment() {

    inquirer.prompt([ 
        {
            type: `text`,
            name: `newDept`,
            message: `What is the name of the new department?`
        }
    ])
    .then((userChoice) => {
        db.query(`INSERT INTO department (name) VALUES ( '${userChoice.newDept}' );`, function(err, res) {
            if (err) {
                console.log(err)
            } else {
                console.table(res);
                mainMenu();
            } 
        });
    });
}


// Add a role
function addRole() {

    db.query(`SELECT name, id FROM department`, (err, data) => {
        if (err) console.log(err)        
    
        const deptList = data.map(({ name, id }) => ({ name: name, value: id }));
    


        inquirer.prompt([ 
            {
                type: `text`,
                name: `roleTitle`,
                message: `What is the name of the new role?`
            },
            {
                type: `text`,
                name: `roleSalary`,
                message: `What is the salary for the new role (numbers only)?`
            },
            {
                type: `list`,
                name: `roleDept`,
                message: `To which department would you like to assign this new role?`,
                choices: deptList
            }   
        ])
    

        .then((userChoice) => {
            // console.log(userChoice)
            db.query(`INSERT INTO role (title, salary, department_id) VALUES ( '${userChoice.roleTitle}', '${userChoice.roleSalary}', ${userChoice.roleDept} );`, function(err, res) {
                if (err) {
                    console.log(err)
                } else {
                    console.table(res);
                    mainMenu();
                } 
            });
        });
    });
}


// Add an employee
function addEmployee() {

    db.query(`SELECT title, id FROM role`, (err, data) => {
        if (err) console.log(err)        
        
        const roleList = data.map(({ title, id }) => ({ name: title, value: id }));



        inquirer.prompt([ 
            {
                type: `text`,
                name: `firstName`,
                message: `What is the new employee's first name?`
            },
            {
                type: `text`,
                name: `lastName`,
                message: `What is the new employee's last name?`
            },
            {
                type: `list`,
                name: `newRole`,
                message: `What is the new employee's assigned role?`,
                choices: roleList
            }
        ])
        .then((userChoice) => {
            const newEmployee = [
                userChoice.firstName,
                userChoice.lastName,
                userChoice.newRole,
            ]
        


            db.query(`SELECT first_name, last_name, id FROM employee`, (err, data) => {
                if (err) console.log(err)        
                
                    const managerList = data.map(({ first_name, last_name, id }) => ({ name: first_name + ' ' + last_name, value: id }));

                    inquirer.prompt([ 
                        {
                            type: `list`,
                            name: `assignManager`,
                            message: `Who is the new employee's manager?`,
                            choices: managerList
                        }
                    ])
                    
        .then((userChoice) => {
            newEmployee.push(userChoice.assignManager);
            // console.log(newEmployee)

            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( '${newEmployee[0]}', '${newEmployee[1]}', ${newEmployee[2]}, ${newEmployee[3]} );`, function(err, res) {
                if (err) {
                    console.log(err)
                } else {
                    console.table(res);
                    mainMenu();
                } 
                    });
                });
            });
        });
    })
}


// Update employee role
function updateRole() {

    db.query(`SELECT first_name, last_name, id FROM employee`, (err, data) => {
        if (err) console.log(err)     
        
        const employeeList = data.map(({ first_name, last_name, id }) => ({ name: first_name + ' ' + last_name, value: id }));

        inquirer.prompt([ 
            {
                type: `list`,
                name: `selectEmployee`,
                message: `Whose role would you like to update?`,
                choices: employeeList
            }
        ])
        .then((userChoice) => {
            const employeeReassign = [
                userChoice.selectEmployee
            ]

            db.query(`SELECT title, id FROM role`, (err, data) => {
                if (err) console.log(err)        
                
                const roleList = data.map(({ title, id }) => ({ name: title, value: id }));

                    inquirer.prompt([ 
                        {
                            type: `list`,
                            name: `assignNewRole`,
                            message: `What is this employee's new assignment?`,
                            choices: roleList
                        }
                    ])
                    
        .then((userChoice) => {
            employeeReassign.push(userChoice.assignNewRole);
            // console.log(employeeReassign)

            db.query(`UPDATE employee SET role_id = ${employeeReassign[1]} WHERE id = ${employeeReassign[0]};`, function(err, res) {
                if (err) {
                    console.log(err)
                } else {
                    console.table(res);
                    mainMenu();
                } 
                    });
                });
            });
        });
    })
}

// Delete employee
function deleteEmployee() {

    db.query(`SELECT * FROM employee`, (err, data) => {
        if (err) console.log(err)        
        
        const employeeList = data.map(({ first_name, last_name, id }) => ({ name: first_name + ' ' + last_name, value: id }));
        
        inquirer.prompt([
            {
                type: 'list',
                name: 'deletedEmployee',
                message: "Which employee would you like to delete?",
                choices: employeeList
            }
        ])

        .then((userChoice) => {
            // console.log(userChoice.deleteEmployee)
            db.query(`DELETE FROM employee WHERE id = ${userChoice.deletedEmployee};`, function(err, res) {
                if (err) {
                    console.log(err)
                } else {
                    console.table(res);
                    mainMenu();
                } 
            });
        });
    });
}


// Delete role
function deleteRole() {

    db.query(`SELECT * FROM role`, (err, data) => {
        if (err) console.log(err)        
        
        const roleList = data.map(({ title, id }) => ({ name: title, value: id }));
        
        inquirer.prompt([
            {
                type: 'list',
                name: 'deletedRole',
                message: "Which role would you like to delete?",
                choices: roleList
            }
        ])

        .then((userChoice) => {
            db.query(`DELETE FROM role WHERE id = ${userChoice.deletedRole};`, function(err, res) {
                if (err) {
                    console.log(err)
                } else {
                    console.table(res);
                    mainMenu();
                } 
            });
        });
    });
}
        

// Delete department
function deleteDepartment() {

    db.query(`SELECT * FROM department`, (err, data) => {
        if (err) console.log(err)        
        
        const deptList = data.map(({ name, id }) => ({ name: name, value: id }));
        
        inquirer.prompt([
            {
                type: 'list',
                name: 'deletedDept',
                message: "Which department would you like to delete?",
                choices: deptList
            }
        ])

        .then((userChoice) => {
            db.query(`DELETE FROM department WHERE id = ${userChoice.deletedDept};`, function(err, res) {
                if (err) {
                    console.log(err)
                } else {
                    console.table(res);
                    mainMenu();
                } 
            });
        });
    });
}


// Main menu
function mainMenu() {
    inquirer.prompt([ 
        {
            type: `list`,
            name: `mainMenu`,
            message: `What would you like to do?`,
            choices: [
                'View All Employees', 
                'View All Roles',
                'View All Departments',
                'View All Employees By Department', 
                'Add An Employee', 
                'Add A Role',
                'Add A Department',
                'Update Employee Role',
                'Delete Employee',
                'Delete Role',
                'Delete Department',
                'END'
            ]
        }
    ])
    .then((userChoice) => {
        if (userChoice.mainMenu === 'View All Employees') {
            viewAllEmployees();
        } else if (userChoice.mainMenu === 'View All Roles') {
            viewAllRoles();
        } else if (userChoice.mainMenu === 'View All Departments') {
            viewAllDepartments();
        } else if (userChoice.mainMenu === 'View All Employees By Department') {
            viewAllEmployeesBd();
        } else if (userChoice.mainMenu === 'Add An Employee') {
            addEmployee();
        } else if (userChoice.mainMenu === 'Add A Role') {
            addRole();
        } else if (userChoice.mainMenu === 'Add A Department') {
            addDepartment();
        } else if (userChoice.mainMenu === 'Update Employee Role') {
            updateRole();
        } else if (userChoice.mainMenu === 'Delete Employee') {
            deleteEmployee();
        } else if (userChoice.mainMenu === 'Delete Role') {
            deleteRole();
        } else if (userChoice.mainMenu === 'Delete Department') {
            deleteDepartment();
        } else {
            return
        } 
    })
};


mainMenu();