--command to add tables (from inside backEnd folder)
-- \i schema/schema.sql;

DROP TABLE IF EXISTS Blogs CASCADE;

CREATE TABLE Blogs (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    published_at DATE,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE
);