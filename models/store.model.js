
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storeSchema = new Schema({

    name: {
        type: String,
        required: true,
        default: 'Desconocido',
        trim: true,
        set: text => text.charAt(0).toUpperCase() + text.substring(1) 
    },

    direction: {
        type: String,
        required: true,
        default: 'Desconocido',
    },

    location: {
        type: {
            type: String
        },
        coordinates: [Number]
    },
    plants: [{
        type: Schema.Types.ObjectId,
        ref: 'Plant' 
    }]

}, {

    timestamps: true

})
storeSchema.index({ location: '2dsphere'})

const Store = mongoose.model('Store', storeSchema)

module.exports = Store