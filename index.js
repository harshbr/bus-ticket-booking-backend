const express = require("express");
const app = express();
const connectdb = require("./databaseconnection");
const userRoute = require("../bus/Routes/userRoute");
const busRouter = require("../bus/Routes/busroute");
const boookingroute = require("../bus/Routes/bookingroute");

connectdb();

app.use(express.json());

app.use("", userRoute);
app.use("/bus", busRouter);
app.use("/booking", boookingroute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
