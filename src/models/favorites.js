const pool = require('../config/pool');

const getFavorites = async () => {
    const query = 'SELECT * FROM favorites';
    try {
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        throw new Error(error);
    }
};

const createFavorite = async (id, favorite) => {
    const query = 'INSERT INTO favorites (user_id, product_id) VALUES ($1, $2) RETURNING *';
    try {
        const response = await pool.query(query, [
            favorite.user_id,
            id
        ]);
        return response.rows;
    } catch (error) {
        throw new Error(error);
    }
};

// const deleteFavorite = async (id) => {
//     const query = 'DELETE FROM favorites WHERE product_id = $1';
//     try {
//         const response = await pool.query(query, [id]);
//         return response.rows;
//     } catch (error) {
//         throw new Error(error);
//     }
// };

const deleteFavorite = async (id, favorite) => {
    const query = 'DELETE FROM favorites WHERE user_id = $1 AND product_id = $2';
    try {
        const response = await pool.query(query, [favorite.user_id, id]);
        return response.rows;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getFavorites,
    createFavorite,
    deleteFavorite
};