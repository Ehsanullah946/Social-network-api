const db = require("../connect");
const bcryptjs = require("bcryptjs");
exports.register = (res, req) => {
    // create user if does not exist
    const q = "SELECT *FROM users WHERE username=?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("user already exist");
    });

    
    // 
    
}
exports.login = (res, req) => {
    
}
exports.logout = (res, req) => {
    
}