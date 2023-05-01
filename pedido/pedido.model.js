const mongoose = require("mongoose");

const pedido = mongoose.Schema(
    {
        id_cliente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
            immutable: true,
            validate : {
                validator: async function (value) {
                    const user = await mongoose.model("User").findById(value);
                    if(user.length == 0){
                        throw new Error ("El usuario no existe. Ingresa un ID Valido");
                    }
                    console.log(user.role);
                    if(user.role != "Cliente"){
                        throw new Error ("El id ingresado no pertence a ningun usuario cliente");
                    }
                },
            },
        },
        id_restaurante: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurants",
            required: true,
            immutable: true,
            validate : {
                validator: async function (value) {
                    const rest = await mongoose.model("Restaurant").find(value);
                    if(rest.length == 0){
                        throw new Error ("El Restaruante no existe. Ingresa un ID Valido");
                    }
                },
            },
        },
        id_domiciliario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
            immutable: true,
            validate : {
                validator: async function (value) {
                    const user = await mongoose.model("User").findById(value);
                    if(user.length == 0){
                        throw new Error ("El usuario no existe. Ingresa un ID Valido");
                    }
                    console.log(user.role);
                    if(user.role != "Domiciliario"){
                        throw new Error ("El id ingresado no pertence a ningun usuario domiciliario");
                    }
                },
            },
        },


    },
    {
        timestamp: true,
        collection: "Pedidos"
    }
)

module.exports = mongoose.model("Pedido", pedido);

