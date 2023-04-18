const { Router } = require("express");
const { getRestaurants, 
        createNewRestaurant, 
        getRestaurantByID, 
        deleteRestaurant,
        updateRestaurant} = require("./restaurante.controller");
const router = Router();


//devuelve todos los restaurantes
router.get("/", getRestaurants);

//devuelve un restaurante por la id proveida
router.get("/:id" , getRestaurantByID);

//metodo post para crear un restaurante
router.post("/", createNewRestaurant);

//devuelve un restaurante por categoria o nombre similar


//update a restaurante by id
router.patch("/:id", updateRestaurant);

//inhabilita a restaurante by id
router.delete("/delete/:id", deleteRestaurant);

module.exports = router;