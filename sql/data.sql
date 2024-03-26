-- Заполнение таблицы Tracks
INSERT INTO Tracks (name, closed) VALUES
('Track 1', false),
('Track 2', true),
('Track 3', false);

-- Заполнение таблицы Projects
INSERT INTO Projects (track, goals, results, grade, repo, title, screenshots) VALUES
(1, 'Цели и задачи проекта 1', 'Результаты проекта 1', 90, 'https://github.com/project1', 'Проект 1', '{"screenshot1.png", "screenshot2.png"}'),
(2, 'Цели и задачи проекта 2', 'Результаты проекта 2', 85, 'https://github.com/project2', 'Проект 2', '{"screenshot3.png"}'),
(3, 'Цели и задачи проекта 3', 'Результаты проекта 3', 95, 'https://github.com/project3', 'Проект 3', '{"screenshot4.png", "screenshot5.png"}');

-- Заполнение таблицы Users
INSERT INTO Users (full_name, role) VALUES
('Иванов Иван Иванович', 'Администратор'),
('Петров Петр Петрович', 'Пользователь'),
('Сидоров Сидор Сидорович', 'Пользователь');

-- Заполнение таблицы ProjectUsers
INSERT INTO ProjectUsers (project_id, user_id) VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 3);
