const express = require("express");
const app = express();

const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const likeRouter = require("./routes/likes");
const commentRouter = require("./routes/comments");
const authRouter = require("./routes/auth");


app.use(express.json());


app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/auth", authRouter);
app.use("/api/likes", likeRouter);

app.listen(8800, () => {
    console.log("app is running");
})