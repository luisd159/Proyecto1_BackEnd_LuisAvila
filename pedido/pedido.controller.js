const pedido = require("./pedido.model");

async function getDelivery(req, res) {
    try {
        const deliveryFinded = await pedido.find();

        if (deliveryFinded.length === 0) {
            res.status(500).json({ "message": "No existe ningun pedido" })
        } else {
            res.status(200).json(deliveryFinded);
        }
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
}

async function createNewDelivery(req, res) {
    try {
        const newDelivery = await pedido.insertMany({
            id_cliente: req.body.id_cliente,
            id_restaurante: req.body.id_restaurante,
            id_domiciliario: req.body.id_domiciliario,
        })
        if (!newDelivery) {
            res.status(500).json({ "message": "Error Creando Pedido" })
        } else {
            res.status(200).json(newDelivery);
        }
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

module.exports = {
    getDelivery,
    createNewDelivery
}