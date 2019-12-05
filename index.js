"use strict";
const http = require('http');
const app = require('./app');


const logger = require('./utils/logger');


const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, function() {
    logger.info(`Express's started on port : ${port}`)
    
})