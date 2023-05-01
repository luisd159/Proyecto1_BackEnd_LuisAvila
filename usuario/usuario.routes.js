const { Router } = require("express");
const { getUsers,
        updateUser,
        findUserByID,
        deleteUser,
        createNewUser,
        GetUserByEmailAndPassword} = require("./usuario.controller");

const router = Router();

//devuelve todos los usuarios
router.get("/", getUsers);

//devuelve un usuario por Email y Contraseña
router.get("/auth", GetUserByEmailAndPassword);

//devuelve un usuario por id
router.get("/:id", findUserByID);

//update a usuario
router.patch("/", updateUser);

//crea un nuevo usuario
router.post("/", createNewUser);

//elimina a un usuario por id
router.delete("/delete/:id", deleteUser);

module.exports = router;

