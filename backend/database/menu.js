const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    title: String,
    image: String,
    id: Number,
    rating: Number,
    ingredients: Array,
    price: Number
});

const Menu = mongoose.model('menu', MenuSchema);

module.exports = Menu;