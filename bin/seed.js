const mongoose = require('mongoose');
const Plant = require('../models/plants.model');
const Shop = require('../models/store.model');
const User = require('../models/user.model');

const dbtitle = 'plantas';
mongoose.connect(`mongodb://localhost/${dbtitle}`);

Plant.collection.drop()
Shop.collection.drop()
User.collection.drop()
