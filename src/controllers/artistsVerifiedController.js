const {getArtists, getArtistById} = require('../models/verified_artists');


const all = async (req, res) => {
    try {
        const artists = await getArtists();
        res.json(artists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const one = async (req, res) => {
    try {
        const artist = await getArtistById(req.params.id);
        res.json(artist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {all, one};