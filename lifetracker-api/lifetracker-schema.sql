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