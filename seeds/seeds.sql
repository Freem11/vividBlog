--command to add seeds (from inside backEnd folder)
-- \i seeds/seeds.sql;
 
DELETE FROM Blogs;

ALTER SEQUENCE Blogs_id_seq RESTART WITH 1;

INSERT INTO Blogs("title", slug, content, "image", published_at, created_at, updated_at, deleted_at)
VALUES ('My First blog', 'abqcde','this is my first blog ever!', 'imageFile',  null, '2024-01-01', '2024-01-01', null ),
('My Second blog', 'qwerty','this is my Second blog ever!', 'imageFile1',  null, '2024-01-05', '2024-01-07', null ),
('My Third blog', 'pooiy','this is my Third blog ever!', 'imageFile2',  null, '2024-01-11', '2024-01-12', null ),
('My 4th blog', 'shttsh','this is my 4th blog ever!', 'imageFile3',  null, '2024-01-22', '2024-01-24', null ),
('My 5th blog', 'eefewfe','this is my 5th blog ever!', 'imageFile4',  null, '2024-02-01', '2024-02-10', null ),
('My Sixth blog', 'xbnnxn','this is my Sixth blog ever!', 'imageFile5',  null, '2024-02-07', '2024-02-11', null ),
('My 7th blog', 'idwnwi','this is my 7th blog ever!', 'imageFile6',  null, '2024-02-15', '2024-02-28', null ),
('My 8th blog', 'qpwesod','this is my 8th blog ever!', 'imageFile7',  null, '2024-02-24', '2024-03-03', null ),
('My nineth blog', 'vureasg','this is my nineth blog ever!', 'imageFile8',  null, '2024-03-01', '2024-03-06', null ),
('My tenth blog', '120v4n0i','this is my tenth blog ever!', 'imageFile9',  null, '2024-03-12', '2024-03-17', null ),
('My 11th blog', '98bu4ib','this is my 11th blog ever!', 'imageFile0',  null, '2024-03-16', '2024-03-25', null ),
('My 12th blog', '64nosb','this is my 12th blog ever!', 'imageFile23',  null, '2024-03-22', '2024-05-01', null ),
('My thirteenth blog', '273boaub56','this is my thirteenth blog ever!', 'imageFile56',  null, '2024-04-02', '2024-05-02', null ),
('My 14th blog', '58673827','this is my 14th blog ever!', 'imageFile67',  null, '2024-04-04', '2024-04-12', null ),
('My 15th blog', 'd7328n0k','this is my 15th blog ever!', 'imageFile89',  null, '2024-05-05', '2024-05-06', null ),
('My 16th blog', '06903nd','this is my 16th blog ever!', 'imageFile901',  null, '2024-05-11', '2024-05-23', null ),
('My seventeenth 2748dbi', 'abcde','this is my seventeenth blog ever!', 'imageFile11',  null, '2024-06-04', '2024-06-21', null ),
('My 18th blog', 'dhfhrw7383','this is my 18th blog ever!', 'imageFile55',  null, '2024-07-11', '2024-07-17', null )



 