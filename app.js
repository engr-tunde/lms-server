require("dotenv").config();
require("./db");
const express = require("express");

const authRouter = require("./src/routes/admin/auth-routes");
const adminRouter = require("./src/routes/admin/admin-routes");
const adminCourseRouter = require("./src/routes/admin/admin-course-routes");
const adminUserRouter = require("./src/routes/admin/admin-user-routes");
const adminOrderRouter = require("./src/routes/admin/admin-order-routes");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connect } = require("./db");
const { verifyLoginToken } = require("./src/controllers/admin/auth-controller");

const app = express();
app.use(
  cors({
    credentials: true,
    // origin: "*",
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:3000",
      "http://192.168.0.132:3000",
      "http://192.168.0.132:5173",
      "http://192.168.0.132:5174",
      "http://thelcreamery.com",
      "https://thelcreamery.vercel.app",
      "https://thelcreamery.onrender.com",
      "https://thel-creamery.onrender.com",
    ],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/v1/admin-auth", authRouter);
app.use("/api/v1/admin", verifyLoginToken, adminRouter);
app.use("/api/v1/admin/course", verifyLoginToken, adminCourseRouter);
app.use("/api/v1/admin/user", verifyLoginToken, adminUserRouter);
app.use("/api/v1/admin/order", verifyLoginToken, adminOrderRouter);

app.get("/", (req, res) => {
  res.send(
    "Hello, welcome to this RESTful API. Server is running with latest update in November 2025\n -"
  );
});

app.listen(process.env.APP_PORT || 7000, () => {
  connect();
  console.log(`Listening to requests on port ${process.env.APP_PORT}`);
  setTimeout(() => {
    console.log("server is live and active");
  }, 300000);
});
