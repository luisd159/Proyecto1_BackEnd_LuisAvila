const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connect } = require("./db/config");
const router = require("./usuario/usuario.routes");

const app = express();

connect();
app.listen(process.env.PORT, ()=>{
    console.log("App Listened at", process.env.PORT)
    
});

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/", router)

// Endpoint para 404
app.use((req, res) => {
  res.status(404).json({ message: "Not found." });
});