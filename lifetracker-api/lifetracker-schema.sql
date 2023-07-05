CREATE TABLE users (
    id VARCHAR(255),
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
    created_at TIMESTAMP ,
    updated_at TIMESTAMP
);

CREATE TABLE nutrition (
    id VARCHAR(255),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    calories INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    email TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1)
);

CREATE TABLE exercise (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    duration INTEGER NOT NULL,
    intensity INTEGER NOT NULL CHECK(intensity > 0 AND intensity < 11),
    user_email TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE sleep (
    id SERIAL PRIMARY KEY,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    user_email TEXT NOT NULL,
    FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE
);