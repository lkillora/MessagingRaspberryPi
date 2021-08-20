# Table of Contents

1. [About The Project](#about-the-project)
2. [Getting Started](#getting-started)
3. [Running the Backend and Frontend](#running-the-backend-and-frontend)
4. [Overview of Main Files](#overview-of-main-files)

## About The Project

Through the frontend of the site, the user can input a message, which gets stored in the database. Then a Raspberry Pi (or any device) can send a GET request to the backend to retrieve all the messages which had been stored.

## Getting Started

### Installation

1. Install VSCode: https://code.visualstudio.com/download
2. Install NodeJs: https://nodejs.org/en/download/
3. Install PostgreSQL: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads. Set the password to "testpassword". 
Run on Port 5432.
4. Clone the repo
   `git clone https://github.com/lkillora/MessagingRaspberryPi.git`

### Database Setup

If, after it’s been installed, and `psql -V` in the terminal returns `psql is not recognized as an internal command`, then Windows cannot find the executables because their location has not been added to the environment variables list. Go to “Edit the system environment variables” > Environment Variables > under “User Variables”, select “Path”, and click “Edit”. Add a new path string which corresponds to the path of the Postgres bin folder. For me, it was “C:\Program Files\PostgreSQL\13\bin”. (This folder contains the “psql.exe” file.) Now `psql -V` should work in a new terminal window.

The default user is `postgres` and the password for this user is the password provided above, `testpassword`.
Log in to postgres in the terminal using the following command: `psql -U postgres`
Create a database using: `create database messagesdb;`
Connect to the database using: `\c messagesdb;`
Now, the SQL script in the project folder will create a table to store the messages. Run it using:
`\ir C:/MessagingRaspberryPi/database.sql;` where the string is the absolute path to the sql script. (You can see the table’s contents using: `select \* from messages;`)

### Installing Node Modules

Open VSCode in the project folder (where the index.js file is).
In VSCode, open a Powershell terminal window here.
Install all the node modules for the backend by running: `npm i`
(My working directory was C:/MessagingRaspberryPiUsingPostgres.)
Install all the node modules for the backend by running: `cd client; npm i`
This should install ReactJs. If, for some strange reason, it doesn’t, then run: `npm i -g create-react-app`

## Running the Backend and Frontend

You can run the backend by `cd ..; npm run start` (the “cd ..” just ensures we are in the project folder, not the client folder.)
You can run the frontend by opening a new Powershell window and running `cd client; npm run start`
These commands reference the “scripts” key in the package.json file of whatever folder the command was run in.

## Overview of the Main Files

The `.env` file contains all the secret information such as database names, user names, and passwords. We have this file so that we don’t need to put secret information in the actual JavaScript files. `package.json` files contain all the script commands for running the servers as well as all the module dependencies. The `index.js` file handles the backend. If any POST requests come in (messages from the frontend), this script will put those messages in the database if the password was correct. The `routes.rest` file has GET and POST requests for testing the index.js file. The file `./Client/src/components/MyForm.js` contains the React code for generating the input boxes on the frontend, as well as taking the values that the user has submitted, and sending them to the backend.
