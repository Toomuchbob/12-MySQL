drop database if exists employee_db;

create database employee_db;

use employee_db;

create table employee (
	id int not null auto_increment primary key,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int
);

create table role (
	id int not null auto_increment primary key,
    title varchar(30),
    salary decimal,
    department_id int
);

create table department (
	id int not null auto_increment primary key,
    name varchar(30)
);