const mongoose = require("mongoose");

async function connect(){
    try{
        await mongoose.connect(process.env.URI);
        console.log("Connected To DB")
    }catch(error){
        console.log("error ", error)
    }
}

module.exports = { connect }