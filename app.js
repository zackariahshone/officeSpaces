// * Add departments, roles, employees

//   * View departments, roles, employees

//   * Update employee roles
const querys = require("./queryDB") 
const mysql = require("mysql");
var inquirer = require('inquirer');

//console.log(querys[0]);

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "OfficeManagement"
});

connection.connect(function(err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
        start();
      });
    
    const choices = [];
//const getter = () => connection.query("select * from table", (res, err) => choices = res.value)
   // start();
    
function start() {
    inquirer
        .prompt([
            /* Pass your questions in here */
            {
                type: 'list',
                name: 'action',
                message: 'Are you adding, Viewing, updating or deleting?',
                choices: [
                    'Add',
                    'View',
                    'Update'
                ]
            }
        ])
        .then(answers => {
            // Use user feedback for... whatever!!
            console.log(answers.action);
            let action = answers.action;
            switch (action) {
                case 'Add':
                    addLocation();
                    break;
                case 'View':
                    viewWhat();
                    break;
                case 'Update':
                    update();
                    break;
            }
        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
}

// add to data base

function addLocation(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: "What would you like to add?",
            choices:[
                'Employee',
                'Department',
                'Role'
            ]
        }
    ]).then(answers => {
        adding = answers.action;
        switch(adding){
            case 'Employee':
                addEmployee();
                break;
            case 'Department':
                addDept();
                break;
            case 'Role':
                addRole();
                break;
        }
       
    });
}
function addEmployee() {

    inquirer.prompt([
    {
        type: 'input',
        name: 'role_id',
        message: "what is the Role ID# of the Employee?",
    },
    {
        type: 'input',
        name: 'mnger',
        message: 'What is the employee Manager id#?'
    },{
        type: 'input',
        name: 'f_name',
        message: 'Employees first name?'
    },
    {
        type: 'input',
        name: 'l_name',
        message: ' Employees last name?'
    }

]).then(answers => {

    console.log(answers);
       const first = answers.f_name;
       const last = answers.l_name;
       const id = answers.role_id;

        console.log(first, last, id);
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answers.f_name,
                last_name: answers.l_name,
                role_id: answers.role_id,
                manager_id: answers.mnger
            },
            function (err) {  
                if(err) {
                    console.log("unsuccsefull creation");
                start();
            }else{
                console.log("Employee succsefully created");
                start();
            }
            }
        )

  

});

    

}
function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the name of the New Dept",
        }
    ]).then(answers => {
        const name = answers.name;
        //insert dept_name into new department
        connection.query(
        "INSERT INTO dept SET ?",
        {
            dept_title: name
        },
        function (err) {  
            if(err) 
                throw err;
            console.log("Department added: ");
            start();
        });

    });
}
function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'role_name',
            message: "what is the role title?",
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the role average salary?',
            
        },
        {
            type: 'input',
            name: 'dept_Id',
            message: 'What is the role Dept_id?'
        }
    
    ]).then(answers => {
        console.log(answers);
    
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answers.role_name,
                salary: answers.salary,
                dept_id: answers.dept_Id
            },
            function (err) {  
                if(err) throw err;
                console.log("New Role Created!");
                start();
            }
        )

    });
}

function viewWhat(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: "What would you like to view?",
            choices:[
                'Employee',
                'Department',
                'Role',
                'None'
            ]
        }
    ]).then(answers => {
        adding = answers.action;
        switch(adding){
            case 'Employee':
                viewAll();
                break;
            case 'Department':
                viewDept();
                break;
            case 'Role':
                viewroles();
                break;
            case 'None':
                start();
                break;
        }
       
    });
}
function viewAll() {connection.query(querys[0],function(err, res){
    if (err) throw err;

    for (let i = 0; i < res.length; i++) {
        console.log(res[i].Emp_ID + " | " + res[i].Emp_Last_Name + " | " + res[i].Role_Title + " | " + res[i].Salary + ' | '+ res[i].Dept_Title);
      }
      start();
});

}
function viewroles() {connection.query(querys[1],function(err, res){
    if (err) throw err;

    for (let i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].title + " | " + res[i].salary + " | " + res[i].dept_id);
      }
      start();
    });
}
function viewDept() {{connection.query(querys[2],function(err, res){
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].dept_title);
      }
      start();
    });
}
}

function queryUpdated() {

}


// {
//     type: 'list',
//     name: "role",
//     message: 'What role of Employee are you adding?',
//     chioces:[
//         'LVL1_Emp',
//         'LVL2_Emp',
//         'LVL3_Emp',
//         'Asst_Mngr',
//         'Mngr'
//     ]
// },
// {

//     type: 'list',
//     name: 'dept',
//     message: 'Which department are you adding to?',
//     choices: [
//         'Production',
//         'Research',
//         'Purchasing',
//         'Marketing'
//     ]
// },

// {
//     type: 'input',
//     name: 'salary',
//     message: 'What is the employees average salary',
    
// }