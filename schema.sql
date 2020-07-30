DROP DATABASE IF EXISTS employeetracker_db;

CREATE DATABASE employeetracker_db;

USE employeetracker_db;

CREATE TABLE employee(
	 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     first_name VARCHAR (30) NOT NULL,
     last_name VARCHAR (30) NOT NULL,
     role_id INT NOT NULL,
     manager_id INT
);

SELECT * FROM employee;

CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL,
    department_id INT 
);

SELECT * FROM role; 

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (30) NOT NULL
);

SELECT * FROM department; 