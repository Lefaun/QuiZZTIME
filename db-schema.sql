CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    option1 TEXT NOT NULL,
    option2 TEXT NOT NULL,
    correct_answer INTEGER NOT NULL CHECK (correct_answer IN (0, 1))
);
