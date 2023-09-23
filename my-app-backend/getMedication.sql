drop database if exists getMedication;

create database getMedication;
use getMedication;

drop table if exists medicalConditions;

CREATE TABLE medicalConditions (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

drop table if exists medications;

CREATE TABLE medications (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    medicalConditionID INT NOT NULL,
    FOREIGN KEY (medicalConditionID) REFERENCES medicalConditions(id),
    PRIMARY KEY (id)
);

INSERT INTO medicalConditions (name) VALUES
    ('Headache'),
    ('Diabetes'),
    ('AIDS'),
    ('Dengue');

INSERT INTO medications (name,  medicalConditionID) VALUES
    ('Acetaminophen',  1),
    ('Ibuprofen',  1),
    ('Tylenol',  1),
    ("desmopressin", 2),
    ("vasopressin", 2),
    ("hydrochlorothiazide", 2),
    ("megestrol", 3),
    ("somatropin",3),
    ("dronabinol",3),
    ("acetaminophen",4);


