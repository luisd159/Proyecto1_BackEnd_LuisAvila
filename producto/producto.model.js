const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            maxlength: 250,
        },
        id_restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurants",
            required: true,
            validate : {
                validator: async function (v) {
                    const rest = await mongoose.model("Restaurant").find(v);
                    if(rest.length == 0){
                        throw new Error ("El restaurante no existe ingresa un ID Valido");
                    }
                },
            },
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "Products"
    }
);

module.exports = mongoose.model("Product", productSchema);