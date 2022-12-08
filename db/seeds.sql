USE company_db

INSERT INTO department (name)
VALUES  ('Finance'),
        ('Marketing'),
        ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES  ('Accounting Manager', 70000, 1),
        ('Accountant', 46000, 1),
        ('Marketing Coordinator', 48000, 2),
        ('Sales Manager', 47000, 3),
        ('Sales Associate', 24000, 3);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Paul', 'McCartney', 1, 1),
        ('John', 'Lennon', 2, 1),
        ('George', 'Harrison', 3, 3),
        ('Ringo', 'Starr', 4, 4),
        ('Pete', 'Best', 5, 4);
