const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema(
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
            maxlength: 10,
            minlength: 10,
        },
        category: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "Restaurants"
    }
)

module.exports = mongoose.model("Restaurant", restaurantSchema);