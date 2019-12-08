"use strict";
const Promise = require("bluebird");

const pool = require('../../utils/pool');
const logger = require('../../utils/logger');



exports.userlist_get = (req, res, next) => {
    logger.info('호출 : /api/v1/users/ ');

    let limit = parseInt(req.query.limit);

    if(isNaN(limit)){
        res.status(400).json({
            resultcode: "400",
            resultmsg: "Bad Request",
            resultdata: ""
        });

    }
    

    let sql = "select userid,username,email from users limit ? ";
    let param = [limit];
    
    pool.excuteSql(sql, param)
        .then((result) => {
            res.status(200).json({
                resultcode: "200",
                resultmsg: "success",
                resultdata: result
            });

        }).catch(err => {
            logger.error(err.toString());
            res.status(500).json({
                resultcode: "500",
                resultmsg: "Error",
                resultdata: err.toString()
            });


        });


    //Authorization
    //logger.info('UserList 호출 ');
    //console.log(req.body);




}