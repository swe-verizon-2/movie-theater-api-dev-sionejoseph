const express = require("express");
const app = express();
const { db } = require("../db/connection");

// server port
const port = 3000;

// middleware 
app.use( express.json() );
app.use( express.urlencoded({extended: true}) );

// routes
const userRouter = require('./routes/user');
const showRouter = require('./routes/show');

app.use("/users", userRouter);
app.use("/shows", showRouter);

module.exports = app;