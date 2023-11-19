export const mongoose = require("mongoose");

mongoose
    .connect('mongodb+srv://' + process.env.USER_DB +'@simba.qqlfl.mongodb.net/')
    .then(()=> console.log("connected to mongoDB"))
    .catch((err: any)=> console.log("failed to connect to mongoDb", err));
