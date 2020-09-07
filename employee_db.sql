drop database if exists employee_db;

create database employee_db;

use employee_db;

create table employee (
	id int not null auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int
);

create table role (
	id int not null auto_increment primary key,
    title varchar(30) not null,
    salary decimal,
    department_id int
);

create table department (
	id int not null auto_increment primary key,
    name varchar(30)
);

insert into department (name)
values 	("Sales"),
		("Engineering"),
        ("Finance"),
        ("Legal");
        
insert into role (title, salary, department_id)
values	("Sales Lead", 40000, 1),
		("Salesperson", 35000, 1),
        ("Lead Engineer", 50000, 2),
        ("Software Engineer", 55000, 2),
        ("Accountant", 42000, 3),
        ("Legal Team Lead", 90000, 4),
        ("Lawyer", 74000, 4);
        
insert into employee (first_name, last_name, role_id, manager_id)
values	("John", "Doe", 1, 3),
		("Mike", "Chan", 2, 1),
		("Ashley", "Rodriguez", 3, null),
		("Kevin", "Tupik", 4, 3),
        ("Malia", "Brown", 5, null),
        ("Sarah", "Lourd", 6, null),
        ("Tom", "Allen", 7, 6),
        ("Christian", "Eckenrode", 1, 3),
        ("Tammer", "Galal", 4, 4);