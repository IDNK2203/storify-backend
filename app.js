const express = require("express");
const logger = require("morgan");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
if (app.get("env") !== "production") {
  app.use(logger("dev"));
}

app.use("/api/v1/user/", userRouter);
app.use("/api/v1/auth/", authRouter);

// catch 404 and forward to error handler
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "Error",
    message: "The Url cannot be found on this server",
  });
});

module.exports = app;
