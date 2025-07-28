const moment = require("moment/moment");
const db = require("../connect");
const jwt = require("jsonwebtoken");

exports.getPosts = (req, res) => {

    const userId = req.query.userId;


    const token = req.cookies.accessToken;
    
    if (!token) return res.status(401).json("NOT logged in! please login first");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(401).json("Not valid token");
        
        const q = userId ? ` SELECT p.*, u.id AS userId,name, profilePic FROM posts AS p JOIN users AS u ON (u.id=p.userId) WHERE p.userId=? `
            : `SELECT p.*, u.id AS userId,name, profilePic FROM posts AS p JOIN users AS u ON (u.id=p.userId) 
        LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId=? OR p.userId=?
        ORDER BY p.createdAt DESC`;

        const value = userId ? [userId] : [userInfo.id, userInfo.id];
        db.query(q,value, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })
}
exports.addPost = (req, res) => {

    const token = req.cookies.accessToken;
    
    if (!token) return res.status(401).json("NOT logged in! please login first");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(401).json("Not valid token");
        
        const q = "INSERT INTO posts(`desc`, `img`, `createdAt`, `userId`) VALUE(?)";

        const value = [
            req.body.desc,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH-mm-ss"),
            userInfo.id
        ]
        db.query(q,[value], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("post has been created");
        })
    })
}

