const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const likeRouter = require("./routes/likes");
const commentRouter = require("./routes/comments");
const authRouter = require("./routes/auth");
const relationshipRouter = require("./routes/relationships");


app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
})

app.use(cors({
    origin:"http://localhost:3000"
}));
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../client/public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage })

app.post('/api/uploads', (req, res) => {
  upload.single("file")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log("Multer error:", err);
      return res.status(500).json({ error: "Multer error" });
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log("Unknown upload error:", err);
      return res.status(500).json({ error: "Unknown error" });
    }

    const file = req.file;
    console.log("Received file:", file);

    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    res.status(200).json(file.filename);
  });
});

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/auth", authRouter);
app.use("/api/likes", likeRouter);
app.use("/api/relationships", relationshipRouter);

app.listen(8800, () => {
    console.log("app is running");
})