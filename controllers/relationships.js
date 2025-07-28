
const db = require("../connect");
const jwt = require("jsonwebtoken");


exports.getRelationship = (req, res) => {

    const q = "SELECT followerUserId  FROM relationships WHERE followedUserId=?";

    db.query(q, [req.query.followedUserId], (err, data) => {
      if (err) {
        console.error(err); // ✅ log the error
        return res.status(500).json(err);
      }
      return res.status(200).json(data.map(relationship => relationship.followerUserId));
    });
}

exports.addRelationship = (req,res) => {
    const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("NOT logged in! please login first");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(401).json("Not valid token");

    const q = "INSERT INTO relationships(`followerUserId`, `followedUserId`) VALUES(?)";

    const values = [
      userInfo.id,
      req.body.userId
    ];

    db.query(q, [values], (err, data) => {
      if (err) {
        console.error("Error inserting following", err); // ✅ log the error
        return res.status(500).json(err);
      }
      return res.status(200).json("following");
    }); 
  });
}
exports.deleteRelationship = (req,res) => {
    const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("NOT logged in! please login first");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(401).json("Not valid token");

    const q = "DELETE FROM relationships WHERE `followerUserId`= ? AND `FollowedUserId`= ?";


    db.query(q, [userInfo.id, req.query.userId], (err, data) => {
      if (err) {
        console.error("Error deleting following", err); // ✅ log the error
        return res.status(500).json(err);
      }
      return res.status(200).json("unfollowed");
    });
  });
}
