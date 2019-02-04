USE notetaker_db;

INSERT INTO notes (note_title,note_text,color_id)  
VALUES('Reminders','HomeWork Due Monday','1'),
('Appointment','Doctor on Wed 10','2'),
('Shopping','Milk, Eggs','3'),
('FYI','Love Coffee','4'),
('Today','Finish Homework','5');

SELECT * FROM notes;