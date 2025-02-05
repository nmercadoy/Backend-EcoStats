const Stat = require('../models/Stat'); // Importar el modelo de estadísticas

// Obtener todas las estadísticas
const getStats = async(req, res) => {
    try {
        const stats = await Stat.find(); // Obtener todos los documentos
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener estadísticas', error: error.message });
    }
};

// Obtener estadísticas por ID de usuario
const getStatsByUserId = async(req, res) => {
    try {
        const stats = await Stat.find({ userId: req.params.userId }); // Buscar por userId
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener estadísticas', error: error.message });
    }
};

// Crear una nueva estadística
const createStat = async(req, res) => {
    try {
        const { userId, category, value, unit, date } = req.body;

        // Validar datos
        if (!userId || !category || !value || !unit || !date) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const newStat = new Stat({ userId, category, value, unit, date });
        await newStat.save();

        res.status(201).json({ message: 'Estadística creada exitosamente', stat: newStat });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear estadística', error: error.message });
    }
};

// Actualizar una estadística
const updateStat = async(req, res) => {
    try {
        const { category, value, unit, date } = req.body;

        const stat = await Stat.findById(req.params.id);
        if (!stat) {
            return res.status(404).json({ message: 'Estadística no encontrada' });
        }

        // Actualizar campos
        stat.category = category || stat.category;
        stat.value = value || stat.value;
        stat.unit = unit || stat.unit;
        stat.date = date || stat.date;

        await stat.save();
        res.status(200).json({ message: 'Estadística actualizada exitosamente', stat });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar estadística', error: error.message });
    }
};

// Eliminar una estadística
const deleteStat = async(req, res) => {
    try {
        const stat = await Stat.findByIdAndDelete(req.params.id);
        if (!stat) {
            return res.status(404).json({ message: 'Estadística no encontrada' });
        }
        res.status(200).json({ message: 'Estadística eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar estadística', error: error.message });
    }
};

module.exports = {
    getStats,
    getStatsByUserId,
    createStat,
    updateStat,
    deleteStat
};