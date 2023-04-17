const { Router } = require("express");
const { getUsers,
        updateUser,
        findUserByID,
        deleteUser,
        createNewUser} = require("./usuario.controller");

const router = Router();

router.get("/", getUsers);

router.get("/:id", findUserByID);

router.patch("/", updateUser);

router.post("/", createNewUser);

router.delete("/delete/:id", deleteUser);

module.exports = router;

