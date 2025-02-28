var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var teacherRouter = require("./routes/teacher");
var studentRouter = require("./routes/student");
var adminRouter = require("./routes/admin");
var headRouter = require("./routes/head");
var coursesRouter = require("./routes/courses");

var app = express();
mongoose.connect("mongodb://0.0.0.0:27017/lms").then(
  (db) => {
    console.log("Database Connected Successfully");
  },
  (err) => {
    return err;
  }
);
app.listen(500);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/teacher", teacherRouter);
app.use("/admin", adminRouter);
app.use("/student", studentRouter);
app.use("/head", headRouter);
app.use("/courses", coursesRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
