const { getUsers, getUserById, getUserByEmail, updateUser, deleteUser } = require('../models/users');

const all = async (req, res) => {
    try {
        const artists = await getUsers();
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//SIRVE PARA OBTENER LA INFORMACION DE UN USUARIO LOGUEADO POR SU EMAIL
const userLogued = async (req, res) => {
    try {
        const loguedUserData = await getUserByEmail(req.email);
        res.status(200).json(loguedUserData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const oneUser = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//VER BIEN SI UTILIZAR ESTE YA QUE HABRIA Q ENCRIPTAR DE NUEVO LA PASSWORD, Y SI LO NECESITAMOS
const update = async (req, res) => {
    try {
        const user = await updateUser(req.params.id, req.username, req.email, req.password);
        res.status(204).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const destroy = async (req, res) => {
    try {
        const user = await deleteUser(req.params.id);
        res.status(204).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {all, userLogued, oneUser, update, destroy};