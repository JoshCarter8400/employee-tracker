INSERT INTO department (name)
VALUES
("Bulls"),
("Sonics"),
("Rockets"),
("Knicks"),
("Lakers"),
("Cavs");

INSERT INTO role (salary, title, department_id)
VALUES
(100000, "Forward", 2),
(200000, "Guard", 1),
(300000, "Center", 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Michael", "Jordan", 1, 1),
("Shawn", "Kemp", 2, 2),
("Hakeem", "Olajuwon", 3, 2),
("Patrick", "Ewing", 3, 2),
("Magic", "Johnson", 1, 1),
("Lebron", "James", 2, 1),
("Gary", "Payton", 1, 2),
("Scottie", "Pippen", 2, 1),
("Clyde", "Drexler", 2, 1);