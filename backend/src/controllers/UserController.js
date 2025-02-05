const User = require('../models/User'); // Importar el modelo de usuario

// Obtener todos los usuarios
const getUsers = async(req, res) => {
    try {
        const users = await User.find(); // Obtener todos los documentos
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
};

// Obtener un usuario por ID
const getUserById = async(req, res) => {
    try {
        const user = await User.findById(req.params.id); // Buscar por ID
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
    }
};

// Crear un nuevo usuario
const createUser = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validar datos
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Crear un nuevo usuario
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario', error: error.message });
    }
};

// Actualizar un usuario
const updateUser = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Actualizar campos
        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;

        await user.save();
        res.status(200).json({ message: 'Usuario actualizado exitosamente', user });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
    }
};

// Eliminar un usuario
const deleteUser = async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};