let express = require('express');
let router = express.Router();

let jwt = require("jsonwebtoken");
let secretObj = require("../../utils/jwt");


router.post("/auth", function (req, res, next) {

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

})

module.exports = router;