require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const connectDB = require('./config/db'); // Conexión a MongoDB
const userRoutes = require('./routes/UserRoutes'); // Rutas de usuarios
const statRoutes = require('./routes/StatRoutes'); // Rutas de estadísticas

// Conectar a la base de datos
connectDB();

const app = express();

// Middlewares
app.use(express.json()); // Middleware para manejar JSON

// Rutas
app.use('/api/users', userRoutes); // Rutas para usuarios
app.use('/api/stats', statRoutes); // Rutas para estadísticas

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('🚀 API funcionando con Node.js, Express y MongoDB');
});

// Definir puerto y arrancar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));