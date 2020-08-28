create database OfficeManagement;

use OfficeManagement;

drop table dept;
create table dept(
	id int auto_increment,
    dept_title varchar (30) not null,
    primary Key(id)
);
drop table role;
create table role(
	id int auto_increment primary key,
    title varchar(30) not null,
    salary double (12, 2) not null,
    dept_id int,
    FOREIGN KEY (dept_id) references dept(id)
);


drop table employee;
create table employee(
	id int auto_increment not null primary key,
    first_name varchar(20) not null,
    last_name varchar(20) not null,
	role_id int, 
    FOREIGN KEY (role_id)  references role(id),
    manager_id int unsigned references employee(id)
);

insert into dept(dept_title) values ('Production'),('Research'),('Purchasing'),('Marketing');

insert into role(title, salary,dept_id) values('LVL1', 55000,2), ('LVL2', 65000,3);
select * from role;

insert into employee( first_name, last_name, role_id, manager_id)
values('chuck', 'norris',2,4);

select * from employee;
##dept|| id(pk) dept_title/ role|| id title salary dept_id /employee|| id first_name last_name role_id(fk) manager(id)/ 
SELECT employee.id, employee.first_name, employee.last_name, dept.id, dept.title;

select * from employee;
insert into employee(first_name, last_name, role_id, manager_id)
					value('larry', 'dodle', 2, 4);
insert into employee(first_name, last_name, role_id, manager_id)
					value('geral', 'gime', 3, 2);
		

select employee.id as "Emp_ID", 
employee.last_name as "Emp_Last_Name", 
employee.first_name as "Emp_First_Name", 
role.title as "Role_Title",
role.salary as "Salary",
dept.dept_title as "Dept_Title"
from employee 
join role ON employee.role_id = role.id
join dept on dept.id = role.dept_id;



