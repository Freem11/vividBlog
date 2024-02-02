--command to add seeds (from inside backEnd folder)
-- \i seeds/seeds.sql;
 
DELETE FROM Blogs;

ALTER SEQUENCE Blogs_id_seq RESTART WITH 1;

INSERT INTO Blogs("title", slug, content, "image", published_at, created_at, updated_at, deleted_at)
VALUES ('My First blog', 'abcde','this is my first blog ever!', 'imageFile',  null, '2024-01-01', '2024-01-01', null )




 