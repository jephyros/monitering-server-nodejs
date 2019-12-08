"use strict";
const Promise = require("bluebird");

const pool = require('../../utils/pool');
const logger = require('../../utils/logger');
const utils = require('../../utils/utils');


exports.userlist_get = (req, res, next) => {

    res.status(200).json({
        resultcode: "200",
        resultmsg: "success"
    });
    //Authorization
    //logger.info('UserList 호출 ');
    //console.log(req.body);

    


}