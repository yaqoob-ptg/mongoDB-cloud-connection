require('dotenv').config();
const express = require("express");
const connectDB = require("./config/db"); // Fixed typo in variable name

const app = express();
app.use(express.json());

// Connect to MongoDB first, then start server
connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server started on port 3000"); // Fixed typo
  });
}).catch(error => {
  console.error("Failed to connect to database:", error);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});



const userRoutes=require("./routes/userRouters");
app.use("/api/users",userRoutes);