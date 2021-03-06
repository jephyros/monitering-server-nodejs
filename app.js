"use strict";
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const moment = require('moment-timezone');
const cors = require('cors');
const app = express();

const isAuthenticated = require('./utils/isAuthenticated');

const accessLogStream = require('file-stream-rotator').getStream({
  filename: path.join(__dirname, 'logs', 'access_%DATE%.log'),
  frequency: 'daily',
  verbose: false,
  date_format: 'YYYYMMDD'
});

morgan.token('date', (req, res) => {
  return moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
})
morgan.format('myformat', '[:date] ":method :url" :status :res[content-length] - :response-time ms');



// =================================================


app.use(morgan('combined', { stream: accessLogStream }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());


//============================================================================
//================         Router       ======================================
//============================================================================
const v1LoginRouter = require('./routes/v1/login');
const v1UsersRouter = require('./routes/v1/users');

//Router
app.use('/api/v1/login', v1LoginRouter);
app.use('/api/v1/users', isAuthenticated, v1UsersRouter);



//============================================================================


//router error 
app.use((req, res, next) => {
  const error = new Error("Not found - CustomCIS");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 404);
  res.json({
    error: {
      message: error.message
    }
  })
});

module.exports = app;