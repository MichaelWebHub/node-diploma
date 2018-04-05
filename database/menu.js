const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    obj: [
        {
            title: String,
            image: String,
            id: Number,
            rating: Number,
            ingredients: Array,
            price: Number
        }
    ]
});

const Menu = mongoose.model('menu', MenuSchema, 'menu');

module.exports = Menu;