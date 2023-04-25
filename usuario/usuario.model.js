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
            trim: true,
            lowercase: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
        phone_number: {
            type: String,
            maxlength: 10,
            minlength: 10,
            //match: [/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, 'Please fill a valid Phone Number'],
        },
        address: {
            type: String,
            maxlenght: 48,
        },
        role: {
            type: String,
            enum: ["Cliente", "Domiciliario", "Administrador"],
        },
        active: {
            type: Boolean,
            required: true,
            default: true,
        },
    },
    {
        timestamp: true,
        collection: "users"
    }
)

module.exports = mongoose.model("User", userSchema);