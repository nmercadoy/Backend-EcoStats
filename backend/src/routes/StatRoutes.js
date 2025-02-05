const express = require('express');
const {
    getStats,
    getStatsByUserId,
    createStat,
    updateStat,
    deleteStat
} = require('../controllers/StatController'); // Importar funciones del controlador

const router = express.Router();

// Rutas CRUD para estadísticas
router.get('/', getStats); // Obtener todas las estadísticas
router.get('/user/:userId', getStatsByUserId); // Obtener estadísticas por ID de usuario
router.post('/', createStat); // Crear una nueva estadística
router.put('/:id', updateStat); // Actualizar una estadística por ID
router.delete('/:id', deleteStat); // Eliminar una estadística por ID

module.exports = router;