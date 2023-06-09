const restaurant = require("./restaurante.model");

async function getRestaurants(req, res) {
    try {
        const rest = await restaurant.find();

        if (rest.length === 0) {
            res.status(500).json({ "message": "Restaurantes No Encontrados" })
        } else {
            res.status(200).json(rest.sort((a,b)=> b.numPedidos - a.numPedidos));
        }
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
}

async function updateRestaurant(req, res) {
    try {
        const restaurantUpdated = await restaurant.findByIdAndUpdate(req.params.id,
            {
                name: req.body.name,
                address: req.body.address,
                phone_number: req.body.phone_number,
                category: req.body.category,
                numPedidos: req.body.numPedidos,
            },
            {
                new: true,
            }
        )
        if (!restaurantUpdated) {
            res.status(500).json({ "message": "Error Actualizando Restaurante" })
        } else {
            res.status(200).json(restaurantUpdated);
        }
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
}

async function getOneRestaurantByOrCategory(req, res) {
    try {
        const { Name, Category } = req.query;
        const filtrado = {};
        if (Name) {
            filtrado.name = Name;
        }else if (Category) {
            filtrado.category = Category;
        }
        const restaurantFinded = await restaurant.find(filtrado);
        if (restaurantFinded.length == 0) {
            res.status(500).json({ "message": "No Existe un Restaurante con esta categoria o nombre de restaurante" })
        } else {
            res.status(200).json(restaurantFinded);
        }
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
}

async function getRestaurantByID(req, res) {
    try {
        const rest = await restaurant.findById(req.params.id);
        if (rest.length == 0) {
            res.status(500).json({ "message": "Restaurante no encontrado por id" })
        } else {
            res.status(200).json(rest);
        }
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
}

async function createNewRestaurant(req, res) {
    try {
        const newRestaurant = await restaurant.insertMany({
            name: req.body.name,
            address: req.body.address,
            phone_number: req.body.phone_number,
            category: req.body.category,
            numPedidos: req.body.numPedidos,
        })
        if (!newRestaurant) {
            res.status(500).json({ "message": "Error Creando Restaurante" })
        } else {
            res.status(200).json(newRestaurant);
        }
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

async function deleteRestaurant(req, res) {
    try {
        const deletedrest = await restaurant.findByIdAndUpdate(req.params.id,
            {
                active: false,
            },
            {
                new: true,
            }
        );
        if (!deletedrest) {
            return res.status(404).json({ "message": "Restaurante no encontrado" });
        }
        res.status(200).json({ "message": "Restaurante Inhabilitado Correctamente." });
    } catch (error) {
        return res.status(500).json({ "message": error.message });
    }
}



module.exports = {
    getRestaurants,
    createNewRestaurant,
    getRestaurantByID,
    deleteRestaurant,
    updateRestaurant,
    getOneRestaurantByOrCategory
}