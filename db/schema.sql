DROP DATABASE IF EXISTS notetaker_db;

CREATE DATABASE notetaker_db;

USE notetaker_db;

CREATE TABLE notes(
note_id INTEGER(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
note_title VARCHAR(50) NOT NULL ,
note_text VARCHAR(255),
color_id INTEGER(2) NOT NULL DEFAULT 5,
created_dt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
modified_dt DATETIME
);

