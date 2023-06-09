const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connect } = require("./db/config");
const userRoutes = require("./usuario/usuario.routes");
const restaurantRoutes = require("./restaurante/restaurante.routes");
const productRoutes = require("./producto/producto.routes");
const pedidosRoutes =require("./pedido/pedido.routes");

const app = express();

connect();
app.listen(process.env.PORT, ()=>{
    console.log("App Listened at", process.env.PORT);
});

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/products", productRoutes);
app.use("/delivery", pedidosRoutes);

// Endpoint para 404
app.use((req, res) => {
  res.status(404).json({ message: "Not found." });
});