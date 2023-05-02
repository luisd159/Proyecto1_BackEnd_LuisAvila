const {Router} = require("express");
const { getDelivery, 
        createNewDelivery, 
        deleteDelivery,
        UpdateDelivery,
        getDeliveryByquery,
        getDeliveryById,
        deliveryNotAccepted} = require("./pedido.controller");

const router = Router();

//devolver todos los pedidos
router.get("/",getDelivery);

//devolver pedido por query
router.get("/byquery", getDeliveryByquery);

//delivery no aceptado
router.get("/aceptado/:id", deliveryNotAccepted);

//devolver pedido por id
router.get("/:id", getDeliveryById);

//crear nuevo pedido
router.post("/", createNewDelivery);

//update a Delivery ....
router.patch("/updateDelivery/:id", UpdateDelivery);

//inhabilita un producto
router.patch("/delete/:id", deleteDelivery);

module.exports = router;
