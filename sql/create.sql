CREATE TABLE Tracks (
    id SERIAL PRIMARY KEY,
    name TEXT,
    closed BOOLEAN
);

CREATE TABLE Projects (
    id SERIAL PRIMARY KEY,
    track INTEGER REFERENCES Tracks(id),
    goals TEXT NOT NULL,
    results TEXT,
    grade INTEGER,
    repo TEXT,
    title TEXT,
    screenshots TEXT[]
);

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(50)
);

CREATE TABLE ProjectUsers (
    project_id INTEGER REFERENCES Projects(id),
    user_id INTEGER REFERENCES Users(id),
    PRIMARY KEY (project_id, user_id)
);

