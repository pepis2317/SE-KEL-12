CREATE DATABASE StudyBuddyDatabase;
CREATE TABLE msUsers(
	id CHAR(5) PRIMARY KEY,
	pass VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	rating FLOAT NOT NULL,
	studysubject VARCHAR(100),
	about VARCHAR(50),
	latitude FLOAT,
	longitude FLOAT,
	ratings INT NOT NULL
);
INSERT INTO msUsers VALUES
('U0000', 'Candra', 'pass', 'candra.wijaya001@binus.ac.id', 0, 'Gender Studies', 'I love big booty bitches', 0,0,0),
('U0001', 'Budi', 'pass', 'budi@mail.com', 0, 'Sorcery', 'Ak jg mw', 0,0,0),
('U0002', 'AAA', 'pass', 'a@mail.com', 0, 'Scientology', 'fuck', 0,0,0);