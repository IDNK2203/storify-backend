const express = require("express");
const logger = require("morgan");

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
if (app.get("env") !== "production") {
  app.use(logger("dev"));
}

app.use("/test", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the Server-side",
  });
});

// catch 404 and forward to error handler
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "Error",
    message: "The Url cannot be found on this server",
  });
});

module.exports = app;
