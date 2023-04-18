const user = require("./usuario.model");

async function getUsers(req, res) {
    const users = await user.find();
    if(!users){
        res.status(500).json({"error":"Usuarios No Encontrados"})
    }else{
        res.status(200).json(users);
    }
}

async function createNewUser(req, res){
    try{
        const newUSer = await user.insertMany({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            phone_number: req.body.phone_number,
            address: req.body.address,
            role: req.body.role
        })
        if(!newUSer){
            res.status(500).json({"error":"Error Creando Usuario"})
        }else{
            res.status(200).json(newUSer);
        }
    }catch(error){
        res.status(500).json({"error": error.message})
    }
}

async function updateUser(req, res){
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
    if(!userUpdated){
        res.status(500).json({"error":"Error actualizando informacion"})
    }else{
        res.status(200).json(userUpdated);
    }
}

async function findUserByID(req, res){
    const users = await user.findById(req.params.id);
    if(!users){
        res.status(500).json({"error":"Usuarios No Encontrados"})
    }else{
        res.status(200).json(users);
    }
}

async function deleteUser(req, res) {
    const deletedUser = await user.findByIdAndUpdate(req.params.id, 
        {
            active:false,
        },
        {
            new: true,
        }
        );
    if (!deletedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario Inhabilitado Correctamente." });

}

module.exports = {
    getUsers,
    deleteUser,
    createNewUser,
    updateUser,
    findUserByID
}