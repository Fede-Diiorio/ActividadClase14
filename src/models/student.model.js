const mongoose = require('mongoose');

const collection = 'Students';

const schema = new mongoose.Schema({
    name: String,
    lastname: String,
    age: Number,
    dni: { type: String, unique: true },
    course: String,
    note: Number
})

module.exports = mongoose.model(collection, schema);