const mongoose = require('mongoose')

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
    heigth: {
        type: String,
        required: true,
        default: 'Desconocido',
        trim: true,

    },
    water: {
        type: String,
        enum: ['eventualmente','una vez cada dos semanas','una vez a la semana','cada 2 días' , 'todos los días'],
        
    },
    spray: {
        type: String,
        enum: ['una vez a la semana','cada 2 días' , 'todos los días', 'eventualmente', 'no pulverizar'],
        
    },
    care: {
        type: String,
        enum: ['casi inmortal','fácil de cuidar' , 'necesita cuidados'],
        
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
    }

}, {
    timestamps: true
})

const Plant = mongoose.model('Plant', plantsSchema)        

module.exports = Plant