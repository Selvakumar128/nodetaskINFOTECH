import express from "express";
import bodyParser from "body-parser";
import User from "./routes/User.js";
import mongoose from "mongoose";
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/nodejs')
  .then(() => console.log('Connected to MongoDB database...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use('/api/user',User)

app.listen(3000, () => {
console.log(`Server is up and running on 3000 ...`)
});