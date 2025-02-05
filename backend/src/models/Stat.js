const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Relación con el modelo de usuario
        required: true
    },
    category: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true // Agrega automáticamente createdAt y updatedAt
});

const Stat = mongoose.model('Stat', statSchema);
module.exports = Stat;