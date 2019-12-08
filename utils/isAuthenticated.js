let jwt = require("jsonwebtoken");

let secretObj = require("./jwt");


module.exports  =  function (req, res, next) {
    let token = extractToken(req);
    console.log(token);
    let decoded = jwt.verify(token, secretObj.secret);
    

    if (decoded) {
      return next();
      
    }else{
      res.status(403).json({
        message: "403 Forbidden Error"
      })
    }
    //res.redirect('/login');
    //res.render('login/login.ejs',{loginmessage : '해당메뉴에 권한이 없습니다. 로그인이 필요합니다.'});
  };


function extractToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}