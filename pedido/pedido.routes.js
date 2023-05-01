const {Router} = require("express");
const { getDelivery, 
        createNewDelivery } = require("./pedido.controller");

const router = Router();

//devolver todos los pedidos
router.get("/",getDelivery);

//crear nuevo pedido
router.post("/", createNewDelivery);

module.exports = router;
