const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    dish: {
        title: String,
        image: String,
        id: Number,
        rating: Number,
        ingredients: Array,
        price: Number
    },
    orderNumber: {type: Number, default: 1},
    status: {type: String, default: "ordered"},
    statusId: {type: Number, default: 1},
    userId: String
});

const Order = mongoose.model('orders', OrderSchema, 'orders');

module.exports = Order;