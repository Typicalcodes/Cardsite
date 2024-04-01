const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://shashankdonbro2:jxcLFmBL8Mj4t26X@cluster0.7ozzcrv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB', err));
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

const http = require("http");


app.use(
  cors({
    origin: ["http://localhost:3002"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// //app.use('/api/city',require('./Routes/cities.js'))
app.use("/api", require("./Routes/User"));
app.use("/teamapi", require("./Routes/Teamapi"));

app.get("/", (req,res)=>{
  res.json("hello")
});


const server = http.createServer(app);


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
