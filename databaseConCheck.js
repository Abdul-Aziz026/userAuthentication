const mongoose = require("mongoose");
require('dotenv').config();

// mongo connection check
// const MONGO_URL = process.env.MONGO_URL;
const MONGO_URL= "mongodb+srv://alhamdulillah026:Alhamdulillah18CSE026@clustaer0.xvjeezh.mongodb.net/UserAuthentication";



main()
.then(() => console.log("connection Successfull in database."))
.catch((err) => {
    console.log(err)
});
async function main() {
  await mongoose.connect(MONGO_URL);
}