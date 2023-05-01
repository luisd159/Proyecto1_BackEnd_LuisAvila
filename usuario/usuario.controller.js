const bcrypt = require('bcrypt');
const user = require("./usuario.model");

async function getUsers(req, res) {
    try {
        const users = await user.find();
        if (users.length == 0) {
            res.status(500).json({ "message": "No Hay usuarios Registrados" })
        } else {
            res.status(200).json(users);
        }
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

async function createNewUser(req, res) {
    try {
        const newUSer = await user.insertMany({
            name: req.body.name,
            password: await bcrypt.hash(req.body.password, 10),
            email: req.body.email,
            phone_number: req.body.phone_number,
            address: req.body.address,
            role: req.body.role
        })
        if (newUSer.length == 0) {
            res.status(500).json({ "message": "Error Creando Usuario" })
        } else {
            res.status(200).json(newUSer);
        }
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

async function updateUser(req, res) {
    try {
        const userUpdated = await user.findByIdAndUpdate(req.params.id,
            {
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                phone_number: req.body.phone_number,
                address: req.body.address,
                role: req.body.role

            },
            {
                new: true,
            }
        )
        if (!userUpdated) {
            res.status(500).json({ "message": "Error actualizando informacion" })
        } else {
            res.status(200).json(userUpdated);
        }
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }

}

async function findUserByID(req, res) {
    try {
        const users = await user.findById(req.params.id);
        if (users.length == 0) {
            res.status(500).json({ "error": "Usuario No Encontrado con id" });
        } else {
            res.status(200).json(users);
        }
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
}

async function GetUserByEmailAndPassword(req, res) {
    try {
        const {email, password} = req.query;
        const userFinded = await user.findOne({ email });
        if (userFinded.length == 0) {
            res.status(500).json({ "error": "Usurio No Encontrados con Email" });
        }
        const isPasswordValid = await bcrypt.compare(password, userFinded.password);
        if (!isPasswordValid) {
            res.status(500).json({ "message": "Contraseña incorrecta" });
        }
        res.status(200).json(userFinded);
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }

}

async function deleteUser(req, res) {
    const deletedUser = await user.findByIdAndUpdate(req.params.id,
        {
            active: false,
        },
        {
            new: true,
        }
    );
    if (deletedUser.length == 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario Inhabilitado Correctamente." });

}

module.exports = {
    getUsers,
    deleteUser,
    createNewUser,
    updateUser,
    findUserByID,
    GetUserByEmailAndPassword
}