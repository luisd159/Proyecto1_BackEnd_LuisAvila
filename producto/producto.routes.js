const {Router} = require("express");
const { getProducts, 
        getOneProductByID, 
        getOnePruductByRestaurantOrCategory, 
        createNewProduct, 
        updateProduct, 
        deleteProduct } = require("./producto.controller");
const router = Router();

//obtener todos los productos
router.get("/", getProducts);;

//obtener un producto por ID
router.get("/:id",getOneProductByID);

//obtener un producto por categoria o restaurante
router.get("/restOrCateg", getOnePruductByRestaurantOrCategory);

//crear un nuevo producto
router.post("/", createNewProduct);

//Actualizar un producto
router.patch("/:id", updateProduct);

//inhabilitar un producto
router.patch("/delete/:id", deleteProduct);


module.exports = router;