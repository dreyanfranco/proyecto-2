const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    password: String,
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    },
    plants: [{
        type: Schema.Types.ObjectId,
        ref: 'Plant'       
    }]


}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User
