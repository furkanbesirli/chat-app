const mongoose = require("mongoose")

const chatSchma = new mongoose.Schema({

    members: Array,

},{
    timestamps: true,
})


const chatModel = mongoose.model("Chat", chatSchma)

module.exports = chatModel

