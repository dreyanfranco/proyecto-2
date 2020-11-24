const mongoose = require('mongoose');
const Plant = require('../models/plants.model');
const Store = require('../models/store.model');
const User = require('../models/user.model');

const dbtitle = 'plantas';
mongoose.connect(`mongodb://localhost/${dbtitle}`);

Plant.collection.drop()
Store.collection.drop()
User.collection.drop()
const plants = [
    {
        name: "costilla de Adán",
        scientificName: "Monstera deliciosa",
        imageUrl: "https://cdn.shopify.com/s/files/1/0013/3529/6118/products/Milton-41-4534.041-WH_Monstera-Deliciosa-10.jpg?v=1605963690",
        description: "Apodada como Planta del Queso o Costilla de Adán, la Monstera Deliciosa es conocida por sus hojas agujereadas de un verde brillante. Una planta resistente que da a cualquier casa un aire de jungla.",
        climate: "Ambiente humedo, es una planta que aguanta bien temperaturas entre los 18° y 27°",
        height: " Altura de 55-70 cm altura desde la raíz y diámetro de 14 cm.",
        water: "Una vez a la semana",
        spray: "Una vez a la semana",
        care: "Fácil de cuidar",
        ligth: "Luminosidad con luz indirecta",
        location: "Es una planta de interior",
        petFriendly: false,
    },
    {
        name: "Calatea",
        scientificName: "Calathea Ornata",
        imageUrl: "https://cdn.thecolvinco.com/photos_cache_gallery/lara/lara-3ecab7c2-260e-424e-956f-3aa54f3a3f79.jpg",
        description: "Calathea Ornata o Calathea de Raya de Alfiler. Esta planta destaca por sus característicos nervios blancos y rosas sobre sus hojas brillantes de color verde oscuro. Purifica el aire así que querrás tenerla cerca.",
        climate: "A una planta de la selva lo que le gusta es el clima tropical entre 16 y 20ºC y húmedo",
        height: "Altura de 40-55 cm altura desde la raíz y diámetro de 11 cm.",
        water: "Cada 2 días",
        spray: "Una vez a la semana",
        care: "Fácil de cuidar",
        ligth: "Espacios sombríos",
        location: "Es una planta de interior",
        petFriendly: false,
        
    },
    {
        name: "Lengua de Suegra",
        scientificName: "Sansevieria Zeylanica",
        imageUrl: "https://cdn.shopify.com/s/files/1/0013/3529/6118/products/Ferm-Hexagon-Pot-XL-Grey_Sansevieria-Zeylanica-6.jpg?v=1557435905",
        description: "Se caracteriza por sus hojas bicolor en forma de espadas. Agradecerás ponerla en la habitación porque libera oxígeno por la noche.",
        climate: "Es versátil como ella sola. Puede estar en la habitación que prefieras en ambientes cálidos y fríos de entre 5 y 26ºC",
        height: "Altura de 40-55 cm altura desde la raíz y diámetro de 11 cm.",
        water: "Una vez cada dos semanas",
        spray: "No pulverizar",
        care: "Casi inmortal",
        ligth: "Luz indirecta",
        location: "Es una planta de interior",
        petFriendly: false,
    },
]

Plant
    .create(plants)
    .then(allPlantsCreated => {
        console.log(`Created ${allPlantsCreated.length} plants`)
        mongoose.connection.close()
    })
    .catch(err => console.log('Hubo un error,', err))

const stores = [
    {
        name: "Verdecora",
        direction: "Calle de Alcalá, 108, 28009 Madrid",
        location: {
            type: 'Point',
            coordinates: [40.43036064181388, -3.661767031876859]
        }
    },
    {
        name: "Casla Jardinería y Paisajismo",
        direction: "Calle Condes del Val, 9, 28036 Madrid",
        location: {
            type: 'Point',
            coordinates: [40.45555450780821, -3.6837046424662425]
        }
    },
    {
        name: "PLANTHAE Gabinete Botanico",
        direction: "Calle de Santa Ana, 3",
        location: {
            type: 'Point',
            coordinates: [40.41039336211959, -3.707532079232811]
        }
    },
]
Store
    .create(stores)
    .then(allStoresCreated => {
        console.log(`Created ${allStoresCreated.length} stores`)
        mongoose.connection.close()
    })
    .catch(err => console.log('Hubo un error,', err))

const users = [
    {
        name: "Administrador",
        username: "Admin",
        password: "plantitas",
        role: "ADMIN",
    }
]

User
    .create(users)
    .then(allUsersCreated => {
        console.log(`Created ${allUsersCreated.length} users`)
        mongoose.connection.close()
    })
    .catch(err => console.log('Hubo un error,', err))
