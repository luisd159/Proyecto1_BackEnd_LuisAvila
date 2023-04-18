const mongoose = require("mongoose");

const restaurant = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlenght: 48,
        },
        address: {
            type: String,
            required: true,
            maxlenght: 48,
        },
        phone_number: {
            type: String,
            required: true,
            match: [/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, 'Please fill a valid Phone Number'],
        },
        category: {
            type: String,
            required: true,
        },
        active:{
            type: Boolean,
            required: true,
            default: true,
        },
    }
)

module.exports = mongoose.model("Restaurant", restaurant);