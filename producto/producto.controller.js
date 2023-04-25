const product = require("./producto.model");

async function getProducts(req, res) {
    try {
        const productFinded = await product.find();

        if (productFinded.length === 0) {
            res.status(500).json({ "message": "No existe ningun Producto" })
        } else {
            res.status(200).json(productFinded);
        }
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
}

async function getOneProductByID(req, res) {
    try {
        const productFinded = await product.findById(req.params.id);
        if (productFinded.length == 0) {
            res.status(500).json({ "message": "Esta ID no pertenece a ningun restaurante" })
        } else {
            res.status(200).json(productFinded);
        }
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }

}

async function getOnePruductByRestaurantOrCategory(req, res) {
    console.log("HOLA")
    try {
        const { restaurant, category } = req.query;
        console.log(req.query);
        const filtrado = {};
        if (restaurant) {
            filtrado.id_restaurant = restaurant;
        } else if (category) {
            filtrado.category = category;
        }
        console.log(filtrado);
        const productFinded = await product.find(filtrado);
        if (productFinded.length == 0) {
            res.status(500).json({ "message": "No Existe un Producto con esta categoria o ID de restaurante" })
        } else {
            res.status(200).json(productFinded);
        }
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
}

async function createNewProduct(req, res) {
    try {
        const newProduct = await product.insertMany({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            description: req.body.description,
            id_restaurant: req.body.id_restaurant
        })
        if (!newProduct) {
            res.status(500).json({ "message": "Error Creando Producto" })
        } else {
            res.status(200).json(newProduct);
        }
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

async function updateProduct(req, res) {
    try {
        const productUpdated = await product.findByIdAndUpdate(req.params.id,
            {
                name: req.body.name,
                category: req.body.category,
                price: req.body.price,
                description: req.body.description,
                id_restaurant: req.body.id_restaurant
            },
            {
                new: true,
            }
        )
        if (!productUpdated) {
            res.status(500).json({ "message": "Error Actualizando Producto" })
        } else {
            res.status(200).json(productUpdated);
        }
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }

}

async function deleteProduct(req, res) {
    try {
        const inhabilitProduct = await product.findByIdAndUpdate(req.params.id,
            {
                active: false,
            },
            {
                new: true,
            }
        );
        if (!inhabilitProduct) {
            return res.status(404).json({ "message": "Producto no encontrado" });
        }
        res.status(200).json({ "message": "Producto Inhabilitado Correctamente." });
    } catch (error) {
        return res.status(500).json({ "message": error.message });
    }
}

module.exports = {
    getProducts,
    getOneProductByID,
    getOnePruductByRestaurantOrCategory,
    createNewProduct,
    updateProduct,
    deleteProduct
}