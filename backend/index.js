import express from "express";
import dotenv from "dotenv";

dotenv.config()
const PORT = process.env.BACKEND_PORT;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`)
})