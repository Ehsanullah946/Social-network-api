const db = require("../connect");
const jwt = require("jsonwebtoken");
const moment = require("moment");
exports.getComments = (req, res) => {
        const q = `SELECT c.*, u.id AS userId,name, profilePic FROM comments AS c JOIN users AS u ON (u.id= c.userId) 
        WHERE c.postId=? ORDER BY c.createdAt DESC`
        db.query(q,[req.query.postId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        }) 
}

exports.addComments = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("NOT logged in! please login first");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(401).json("Not valid token");

    const q = "INSERT INTO comments(`desc`, `createdAt`, `userId`,`postId`) VALUES(?)";

    const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), // ✅ fixed format
      userInfo.id,
      req.body.postId
    ];

    db.query(q, [values], (err, data) => {
      if (err) {
        console.error("Error inserting comment:", err); // ✅ log the error
        return res.status(500).json(err);
      }
      return res.status(200).json("Comment has been created");
    });
  });
};
