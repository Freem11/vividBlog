# vividBlog
A full stack (PERN) app for posting blogs, this was the coding challenge set to me by  Vivid Theory.

# Setup

Once you have it on your computer CD into the main "vividBlog" folder
From there create a database in Postgres (download at https://www.postgresql.org/download/) 
Once downloaded and from the same "vividblog" folder type 'psql -U postgres' or replace 'postgres' with your username to log in
Next create a database with the command 'CREATE DATABASE your_database_name;'    'your_database_name' is the name of your database you can replace it with anything you like, for example in my case I used 'vividblog' as my database name

Once your database has been created we can now add thw schema and seed data
to add the schema type the following command into you database terminal:
\i schema/schema.sql;

Next seed the database using this command:
\i seeds/seeds.sql;

The database is now ready, next create a .env file in the "vividBlog" folder and and add your database credentials in the following format. You can do this via your code editor or in the terminal using the appropriate command.

DB_HOST='localhost'
DB_USER='your user name'
DB_PASSWORD='chose your own password'
DB_NAME='your postgres database's name'
DB_PORT='chose a port'

Next setup the server, in the terminal from the "vividBlog" folder install all required back end dependencies using 
npm i or npm install
Then run the server using 
npm run dev

Next open another terminal and CD into the "frontEnd" folder and repeat the previous process to install the front end dependencies and run it
(commands are : npm i or npm install, then npm run dev )

At this point you should have a working app!


The app is fairly simple
On the main page you will be shown up to 6 blog tiles at a time, you can paginate through them using the chevron buttons to the left and right
You can also search a specific blog by title in the search field at the top

Clicking on the "Compose" button will bring up the blog creation modal you will need to supply a title, content and image file to complete a blog and submit it successfully.
to cancel click either the "X" button at the top right or the "cancel blog post" button at the bottom to cancel any work
To submit click the "Post Blog" button, a confirmation modal will pop up to let you know that you were successful (or not)

On the Main page click on any of the blog tiles to open one up, on the lefthand side you will see the blog name its picture and content along with a "delete" button
to the right you will see 4 random "related" blogs, clicking on any of them will change the blog on the righthand site.

Finally use the delete button to initiate a soft delete of the blog you are looking at, a confirmation modal will pop up to make sure you are certain, click "cancel" to go back or "confirm" to proceed with the blog deletion.




