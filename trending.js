//==============================<<--- TRENDING SERVICE --->>=============================
require("dotenv").config();
//================================
//--- START SERVER
const express = require("express");
const cors = require("cors");
const trending = express();
trending.use(express.json());
trending.use(express.urlencoded({ extended: true }));
const router = require("./router");
const { middlewarer } = require("./middleware/authorization");
trending.use(cors());
//================== <<--- middleware --->> ====================
trending.use('/trending', middlewarer, router);
console.log("<<___________________________________||  TRENDING SERVER STATUS ||______________________________________________>>");
console.log();
trending.listen(process.env.PORT, () => console.log(`<< ----👌|= TRENDING SERVICE IS BEING SERVED AT POST: ${process.env.PORT} ✔`));

