const { getFavorites, createFavorite, deleteFavorite } = require('../models/favorites');

const all = async (req, res) => {
    try {
        const favorites = await getFavorites();
        res.json(favorites);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const favorite = await createFavorite(req.params.id, req.body);
        res.json(favorite);        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const destroy = async (req, res) => {
    try {
        const favorite = await deleteFavorite(req.params.id, req.body);
        res.json(favorite);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {all, create, destroy};