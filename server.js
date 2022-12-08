const inquirer = require('inquirer');
const mysql = require('mysql2');

// Finish your welcome message
console.log(
    '\nWelcome to the SQL Company Database! \nFurther Instructions Go Here\n'
);

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password
      password: 'Aster1sk!',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);
  

function displayDataBase() {
    inquirer.prompt([ 
        {
            type: `list`,
            name: `displayData`,
            message: `Select which table you would like to see`,
            choices: ['Department', 'Role', 'Employee', 'END']
        }
    ])
            .then((userChoice) => {
                console.log(userChoice);
                    if (userChoice.addEmployee === 'Department') {
                        db.query('DESC department', function(err, results) {
                            console.log(results);
                        });
                    } else if (userChoice.addEmployee === 'Role') {
                        db.query('DESC role', function(err, results) {
                            console.log(results);
                        });
                    } else if (userChoice.addEmployee === 'Employee') {                        
                        db.query('DESC employee', function(err, results) {
                            console.log(results);
                        });
                    } else {
                        console.log('End')    
                        return
                    }
            });
}

// Query database
db.query('DESC employee', function (err, results) {
    console.log(results);
  });
// displayDataBase();