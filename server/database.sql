CREATE DATABASE jobhunter;

CREATE TABLE users
(
    id uuid PRIMARY KEY DEFAULT
    
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);


INSERT INTO users
    (user_name, user_email, user_password)
VALUES
    ('John', 'john@john.com', '111111');

ALTER TABLE jobs
  ADD company_name VARCHAR (255);

  ALTER TABLE jobs
  DROP addedBy;

  ALTER TABLE jobs
RENAME COLUMN job_name TO job_title;

CREATE TABLE jobs (
    job_id serial PRIMARY KEY,
    job_name VARCHAR (255) NOT NULL,
    job_description VARCHAR (255),
    date_added TIMESTAMP,
    job_contacts jsonb,
    job_tasks text[],
    job_notes VARCHAR (255),
    tasks_open boolean,
    job_saved boolean,
    applied boolean,
    inContact boolean,
    interview1 boolean,
    interview2 boolean,
    interview3 boolean,
    hired boolean,
    denied boolean,
    archived boolean
);