--CREATE DATABASE messagesdb;

CREATE TABLE messages(
  messageid SERIAL PRIMARY KEY,
  messagetext VARCHAR(255)
);