const pool = require('../config/pool');

const getArtists = async () => {
    const query = 'SELECT * FROM verified_artists';
    try {
        const response = await pool.query(query);
        return response.rows;
    } catch (error) {
        throw new Error(error);
    }
};

const getArtistById = async (id) => {
    const query = 'SELECT * FROM verified_artists WHERE artist_id = $1';
    try {
        const response = await pool.query(query, [id]);
        return response.rows[0];
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {getArtists, getArtistById};