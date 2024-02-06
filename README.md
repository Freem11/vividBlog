# vividBlog
A full stack (PERN) app for posting blogs, this was the coding challenge set to me by  Vivid Theory.

# Setup

Once you have it on your computer CD into the main "vividBlog" folder
From there create a database in Postgres (download at https://www.postgresql.org/download/) 
Once downloaded and from the same "vividblog" folder type 'psql -U postgres' or replace 'postgres' with your username to log in
Next create a databse with the command 'CREATE DATABASE your_database_name;'    'your_database_name' is ythe name of your database you can replace it with anything you like, for example in my case I used 'vividblog' as my database name

Once your database has been created we can now add thw schema and seed data
to add the schema type the following command into you database terminal:
\i schema/schema.sql;

Next seed the database using this command:
\i seeds/seeds.sql;

The database is now ready, next create a .env file in the "vividBlog" folder and and add your database credentials in the following format. You can do this via your code editer or in the temrial using the appropreate command.

DB_HOST='localhost'
DB_USER='your user name'
DB_PASSWORD='chose your own password'
DB_NAME='your posgres database's name'
DB_PORT='chose a port'

Next setup the server, in the terminal from the "vividBlog" folder install all required back end dependencies using 
npm i or npm install
Then run the server using 
npm run dev

Next open another terminal and CD into the "frontEnd" folder and repeat the previous process to install the front end dependencies and run it
(commands are : npm i or npm install, then npm run dev )

At this point you should have a working app!




