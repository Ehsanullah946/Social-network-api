const express = require("express");
const app = express();
const multer = require("multer");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const likeRouter = require("./routes/likes");
const commentRouter = require("./routes/comments");
const authRouter = require("./routes/auth");


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
})

app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000"
}));
app.use(cookieParser());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/uploads')
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
  }
})

const upload = multer({ storage: storage })

app.post('/api/uploads', upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
})


app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/auth", authRouter);
app.use("/api/likes", likeRouter);

app.listen(8800, () => {
    console.log("app is running");
})