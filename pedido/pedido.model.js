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
                    if(!user){
                        throw new Error ("El usuario no existe. Ingresa un ID Valido");
                    }
                    if(user.role !== "Cliente"){
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
                    if(!rest){
                        throw new Error ("El Restaruante no existe. Ingresa un ID Valido");
                    }
                },
            },
        },
        id_domiciliario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            validate : {
                validator: async function (value) {
                    const user = await mongoose.model("User").findById(value);
                    console.log("AAAAAAAAAAAAAAAAAAAA");
                    if(!user){
                        throw new Error ("El usuario no existe. Ingresa un ID Valido");
                    }
                    if(user.role !== "Domiciliario"){
                        throw new Error ("El id ingresado no pertence a ningun usuario domiciliario");
                    }
                },
            },
        },
        productos: [
            {
                id_producto:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users",
                required: true,
                immutable: true,
                validate : {
                    validator: async function (value) {
                        const product = await mongoose.model("Product").findById(value);
                        if(product.length == 0){
                            throw new Error ("El produco no existe. Ingresa un ID Valido");
                        }
                    },
                },
                },
                cantidad: {
                    type: Number,
                    default: 1,
                    immutable: true,
                }

            }
        ],
        estado: {
            type: String,
            required: true,
            default: "Creado",
            enum: ["Creado", "Enviado", "Aceptado", "Recibido", "En Direccion", "Realizado"],
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "Pedidos"
    }
)

module.exports = mongoose.model("Pedido", pedido);

