const mongoose = require('mongoose')
const Schema = mongoose.Schema

const plantsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'Desconocido',
        trim: true,
        set: text => text.charAt(0).toUpperCase() + text.substring(1) 
    },
    
    scientificName: {
        type: String,
        required: true,
        default: 'Desconocido',
        trim: true,
        set: text => text.charAt(0).toUpperCase() + text.substring(1) 
    },
    imageUrl:{
        type: String,
        required:true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        default: 'Desconocido',
        trim: true,
    },
    climate: {
        type: String,
        required: true,
        default: 'Desconocido',
        trim: true,
    },
    height: {
        type: String,
        required: true,
        default: 'Desconocido',
        trim: true,

    },
    water: {
        type: String,
        enum: ['Eventualmente','Una vez cada dos semanas','Una vez a la semana','Cada 2 días' , 'Todos los días'],
        
    },
    spray: {
        type: String,
        enum: ['Una vez a la semana','Cada 2 días' , 'Todos los días', 'Eventualmente', 'No pulverizar'],
        
    },
    care: {
        type: String,
        enum: ['Casi inmortal','Fácil de cuidar' , 'Necesita cuidados'],
        
    },
    ligth: {
        type: String,
        enum: ['Luminosidad con luz indirecta','Luz indirecta' , 'Necesita de espacios luminosos sin incidencia directa del sol','Espacios sombríos', 'Espacios luminosos sin sol directo','Espacios poco luminosos'],
        
    },
    location: {
        type: String,
        enum: ['Es una planta de interior','Es una planta de exterior'],
        
    },
    petFriendly: {
        type:Boolean,
        default: true,
    },
    stores: [{
        type: Schema.Types.ObjectId,
        ref: 'Store'
    }]

}, {
    timestamps: true
})

const Plant = mongoose.model('Plant', plantsSchema)        

module.exports = Plant