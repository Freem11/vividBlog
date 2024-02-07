# vividBlog
A full stack (PERN) app for posting blogs, this was the coding challenge set to me by  Vivid Theory.

# Setup

Cd into "vividBlog" folder

Login to Postgres - 'psql -U postgres username'

Create Postgres DB  - 'CREATE DATABASE your_database_name;'

Create Database Schema - \i schema/schema.sql;

Seed Database - \i seeds/seeds.sql;

Create .env file 

Apply Database Credentials

    DB_HOST='localhost'
    DB_USER='your user name'
    DB_PASSWORD='chose your own password'
    DB_NAME='your postgres database's name'
    DB_PORT='chose a port'

In new Terminal

Cd into "vividBlog" folder

Install Dependencies - npm i or npm install

Run Server - npm run dev

In new Terminal

Cd into "frontEnd" folder

Install Dependencies - npm i or npm install

Run front end - npm run dev

# Description

The app is fairly simple
On the main page you will be shown up to 6 blog tiles at a time, you can paginate through them using the chevron buttons to the left and right
You can also search a specific blog by title in the search field at the top

Clicking on the "Compose" button will bring up the blog creation modal you will need to supply a title, content and image file to complete a blog and submit it successfully.
to cancel click either the "X" button at the top right or the "cancel blog post" button at the bottom to cancel any work
To submit click the "Post Blog" button, a confirmation modal will pop up to let you know that you were successful (or not)

On the Main page click on any of the blog tiles to open one up, on the lefthand side you will see the blog name its picture and content along with a "delete" button
to the right you will see 4 random "related" blogs, clicking on any of them will change the blog on the righthand site.

Finally use the delete button to initiate a soft delete of the blog you are looking at, a confirmation modal will pop up to make sure you are certain, click "cancel" to go back or "confirm" to proceed with the blog deletion.

# screen shots

!["Main Page"](https://github.com/Freem11/vividblog/blob/master/frontEnd/src/images/main.png)

!["Single Blog"](https://github.com/Freem11/vividblog/blob/master/frontEnd/src/images/single.png)

!["Delete Confirm"](https://github.com/Freem11/vividblog/blob/master/frontEnd/src/images/delete.png)

!["Create Blog"](https://github.com/Freem11/vividblog/blob/master/frontEnd/src/images/create.png)

!["Incomplete Warning"](https://github.com/Freem11/vividblog/blob/master/frontEnd/src/images/incomplete.png)


