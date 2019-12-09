"use strict";
const Promise = require("bluebird");
const jwt = require("jsonwebtoken");

const secretObj = require("../../utils/jwt");
const pool = require('../../utils/pool');
const logger = require('../../utils/logger');

exports.auth_POST =  (req, res, next) =>{

    // default : HMAC SHA256
    let token = jwt.sign({
        email: "cis"   // 토큰의 내용(payload)
    },
        secretObj.secret,    // 비밀 키
        {
            expiresIn: '60m'    // 유효 시간은 60분
        })

    let userid = req.body.userid;
    let password = req.body.password;

    if (password === "1234" && userid === userid) {
        res.cookie("user", token);
        res.status(200).json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "403 Forbidden Error"
        })
    }

}

exports.signup_POST = (req, res, next) => {
    logger.info('호출 : /api/v1/logins/ ');

    let userid = req.body.userid;
    let password = req.body.password;

    

    let sql = "select userid,username,email from users limit ? ";
    let param = [10];
    
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


}