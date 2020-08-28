// hold the querys



const querys = [
    `select employee.id as Emp_ID, 
employee.last_name as 'Emp_Last_Name', 
employee.first_name as 'Emp_First_Name', 
role.title as 'Role_Title',
role.salary as 'Salary',
dept.dept_title as 'Dept_Title'
from employee 
join role ON employee.role_id = role.id
join dept on dept.id = role.dept_id;`
,
`select * from role;`
,
`select * from dept;`
]


//console.log(querys[1]);


module.exports = querys;
