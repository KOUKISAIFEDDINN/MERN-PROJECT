const mongoose = require('mongoose');
const dbName = process.env.db;
const username = process.env.ATLAS_USERNAME;
const pw = process.env.ATLAS_PASSWORD;


const uri = "mongodb+srv://koukisaif:root@cluster0.8yc94wm.mongodb.net/zeeeezeeee?retryWrites=true&w=majority&appName=Cluster0";

mongoose
    .connect(uri)
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));

module.exports = mongoose;