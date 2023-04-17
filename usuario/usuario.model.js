const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone_number: {
            type: String,
            maxlength: 10,
            minlength: 10,
        },
        address: {
            type: String,
            maxlenght: 48,
        },
        role: {
            type: String,
            enum: ["Cliente", "Domiciliario", "Administrador"],
        },
    }
)

module.exports = mongoose.model("User", userSchema);