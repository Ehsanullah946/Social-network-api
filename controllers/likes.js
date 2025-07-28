
const db = require("../connect");
const jwt = require("jsonwebtoken");


exports.getLikes = (req, res) => {

    const q = "SELECT userId  FROM likes WHERE postId=?";

    db.query(q, [req.query.postId], (err, data) => {
      if (err) {
        console.error(err); // ✅ log the error
        return res.status(500).json(err);
      }
      return res.status(200).json(data.map(like => like.userId));
    });
}

exports.addLike = (req,res) => {
    const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("NOT logged in! please login first");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(401).json("Not valid token");

    const q = "INSERT INTO likes(`userId`, `postId`) VALUES(?)";

    const values = [
      userInfo.id,
      req.body.postId
    ];

    db.query(q, [values], (err, data) => {
      if (err) {
        console.error("Error inserting like", err); // ✅ log the error
        return res.status(500).json(err);
      }
      return res.status(200).json("post liked");
    });
  });
}
exports.deleteLike = (req,res) => {
    const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("NOT logged in! please login first");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(401).json("Not valid token");

    const q = "DELETE FROM likes WHERE `userId`= ? AND `postId`= ?";


    db.query(q, [userInfo.id, req.query.postId], (err, data) => {
      if (err) {
        console.error("Error deleting like", err); // ✅ log the error
        return res.status(500).json(err);
      }
      return res.status(200).json("post has been disliked");
    });
  });
}
