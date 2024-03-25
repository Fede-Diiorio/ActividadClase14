const mongoose = require('mongoose');

const collection = 'Students';

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    dni: { type: String, required: true, unique: true },
    course: { type: String, required: true },
    note: { type: Number, required: true }
})

module.exports = mongoose.model(collection, schema);