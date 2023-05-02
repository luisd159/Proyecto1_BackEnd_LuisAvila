const pedido = require("./pedido.model");
const restaurant = require("../restaurante/restaurante.model");

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

async function getDeliveryById(req, res) {
    try {
        const deliveryFinded = await pedido.findById(req.params.id);

        if (deliveryFinded.length === 0) {
            res.status(500).json({ "message": "No existe ningun pedido con esta id proveida" })
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
            productos: req.body.productos,
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

async function getDeliveryByquery(req, res) {
    try {
        const { cliente, domiciliario, restaurante, FechaIni, FechaFin } = req.query;
        const filtro = {};
        if (cliente) {
            filtro.id_cliente = cliente;
        }
        if (domiciliario) {
            filtro.id_domiciliario = domiciliario;
        }
        if (restaurante) {
            filtro.id_restaurante = restaurante;
        }
        if (FechaIni && FechaFin) {
            filtro.createdAt = {
                $gte: new Date(FechaIni),
                $lte: new Date(FechaFin),
            }
        }
        const deliveryFinded = await pedido.find(filtro);
        if (deliveryFinded.length == 0) {
            res.status(500).json({ "message": "No existe ningun pedido con estos parametros" })
        } else {
            res.status(200).json(deliveryFinded);
        }
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }

}

async function UpdateDelivery(req, res) {
    try {
        const deliveryFinded = await pedido.findByIdAndUpdate(req.params.id,
            {
                id_domiciliario: req.body.id_domiciliario,
                estado: req.body.estado
            },
            {
                new: true,
            }
        );
        if (!deliveryFinded) {
            return res.status(404).json({ "message": "No se pudo modificar el Pedido" });
        }
        res.status(200).json({ "message": "Pedido Modificado Correctamente." });

    } catch (error) {
        res.status(500).json({ "message": error.message })
    }

}

async function deliveryNotAccepted(req, res){
    try {
        const deliveryFinded = await pedido.findById(req.params.id);

        if (!deliveryFinded) {
            return res.status(404).json({ "message": "Pedido No existe" });
        }
        if(deliveryFinded.estado !== "Aceptado"){
            res.status(200).json({"message": "El pedido con el ID proveido no ha sido aceptado " , deliveryFinded});
        }else{
            res.status(200).json({"message": "El pedido con el ID proveido Ya fue aceptado ", deliveryFinded});
        }
        }catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

async function deleteDelivery(req, res) {
    try {
        const inhabilitDelivery = await pedido.findByIdAndUpdate(req.params.id,
            {
                active: false,
            },
            {
                new: true,
            }
        );
        if (!inhabilitDelivery) {
            return res.status(404).json({ "message": "Delivery no encontrado" });
        }
        res.status(200).json({ "message": "Producto Inhabilitado Correctamente." });
    } catch (error) {
        return res.status(500).json({ "message": error.message });
    }
}

module.exports = {
    getDelivery,
    createNewDelivery,
    UpdateDelivery,
    deleteDelivery,
    getDeliveryByquery,
    getDeliveryById,
    deliveryNotAccepted
}