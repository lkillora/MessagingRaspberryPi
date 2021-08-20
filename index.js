// importing modules
require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const pgp = require('pg-promise')(/* initialization options */);
const path = require("path");
const PORT = process.env.PORT || 5000;

// CONNECT TO POSTGRESQL DATABASE
// development connection (connecting to local postgresql db)
const dev_cn = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
// alternative method for connecting:
// const dev_cn = {
//   host: process.env.PG_HOST, // server name or IP address;
//   port: process.env.PG_PORT,
//   database: process.env.PG_DATABASE,
//   user: process.env.PG_USER,
//   password: process.env.PG_PASSWORD
// };
// Heroku production connection (connecting to Postgresql db on web)
const prod_cn = `${process.env.DATABASE_URL}?ssl=true`; //heroku addons
// set NODE_TLS_REJECT_UNAUTHORIZED=0 in heroku config
const cn = process.env.NODE_ENV === "production" ? prod_cn : dev_cn
const db = pgp(cn);

app.use(cors());
app.use(express.json()); 
if (process.env.NODE_ENV === "production") {
  //server static content
  //npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}

// ROUTES
// for the dev environment the backend server url will be http://localhost:5000/ 
// (because the .env file specifies that it run on port 5000) 
// then putting http://localhost:5000/messages in the browser (get request)
// will return all the messages in the database
// if there was a post request to the same url with messages, those would be
// added to the db. See below.

// post request -> create a message
app.post("/messages", async (req, res) => {
  try {
    var newpass = req.body.passwordText;
    // the password must match the one in the .env file
    if(newpass != process.env.PASSWORD){
      // if it doesn't, send a response with the below dictionary
        res.send({success:false , message : "Incorrect Password!"})
    }
    else{
      const messageText = req.body.messageText;
      // see https://github.com/vitaly-t/pg-promise for more details on this
      // if password matched, then insert that message into the table
      const newMessage = await db.none('INSERT INTO messages(messagetext) VALUES(${messagedict.messagetext})', {
      messagedict: {messagetext: messageText}
    }); 
    // let the user on the frontend know that we added the message
    // they can find this response in the Console window of the site
    res.json("Message Added!");
    }
  } catch (err) {
    // if error, log it 
    console.error(err.message);
  }
});

// get request -> send back all messages
app.get("/messages", async (req, res) => {
  try {
    // get all messages from the table, log them, and send them back to the user
    const allMessages = await db.any("SELECT * FROM messages");
    console.log(allMessages);
    res.json(allMessages);
  } catch (err) {
    console.error(err.message);
  }
});

// get request for specific message 
app.get("/messages/:id", async (req, res) => {
  try {
    // get the id in the url
    // then query the db, and send back that message
    const { id } = req.params;
    const specificmessage = await db.one("SELECT * FROM messages WHERE messageid = $1", [
      id
    ]);
    res.json(specificmessage);
  } catch (err) {
    console.error(err.message);
  }
});

// updating a message
app.put("/messages/:id", async (req, res) => {
  try {
    // get the message id they want to edit
    // and the text they want to update it to
    // update it
    const messageId = req.params;
    const messageText = req.body.messageText;
    console.log(messageId);
    console.log(messageText);
    const newMessage = await db.none('UPDATE messages SET ${messagedict.messagetext} WHERE messageid = ${messagedict.messageid}', {
      messagedict: {messagetext: messageText, messageid: messageId}
  });
    res.json("Message was updated!");
  } catch (err) {
    console.log(req);
    console.error(err.message);
  }
});

// delete a message
app.delete("/messages/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMessage = await db.none("DELETE FROM messages WHERE messageid = $1", [
      id
    ]);
    res.json("Message was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

// if wrong route (nothing there), then just serve the client the static index file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

// print out the port the server is listening on
app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
