"use strict";
//const PROMISE = require("bluebird");
const jwt = require("jsonwebtoken");

const secretObj = require("../../utils/jwt");
const pool = require('../../utils/pool');
const logger = require('../../utils/logger');
const utils = require('../../utils/utils');


exports.auth_POST = (req, res, next) => {

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

    let userid = req.body.userid;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    //아이디 비번 존재여부 체크 
    if (!req.body.userid || !req.body.password || req.body.userid == "" || req.body.password == "") {
        res.status(400).json({
            resultcode: "400",
            resultmsg: "Bad Request",
            resultdata: ""
        });
    } else {
        saveData();
    }

    function saveData() {

        //  //아이디중복체크후저장
        pool.excuteSql("select userid,username,email from users where userid = ? ", [userid])
            .then((result) => {

                if (result.length > 0) {
                    res.status(200).json({
                        resultcode: "D01",
                        resultmsg: "User ID is duplicated ",
                        resultdata: ""
                    });
                } else {
                    //데이터 저장 
                    pool.excuteSql("insert into users "
                        + " ( userid,username,email,password,inserttime) values( ?,?,?,?, now())"
                        , [userid,
                            username,
                            email,
                            utils.encryptSHA2(password)
                        ])
                        .then((result) => {
                            logger.info('회원가입 성공 : 아이디 <' + userid + '>');
                            res.status(200).json({
                                resultcode: "200",
                                resultmsg: "success",
                                resultdata: result
                            });

                        });
                }
            }).catch((err) => {
                logger.error(err.toString());
                res.status(500).json({
                    resultcode: "500",
                    resultmsg: "ERROR",
                    resultdata: err.toString()
                });
            })

    }



}



