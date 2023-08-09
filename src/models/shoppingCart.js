const pool = require('../config/pool');

const getProductByID = async (product) => {
    const query = 'SELECT * FROM cart_example WHERE user_id = $1 AND product_id = $2';
    try {
        const response = await pool.query(query, [product.user_id, product.product_id]);
        return response.rows[0];
    } catch (error) {
        throw new Error(error);
    }
};


const getCartInfo = async (id) => {
    const query = 'SELECT cart_example.product_id, products.title, cart_example.quantity, products.price, products.url_image FROM users INNER JOIN cart_example ON users.user_id = cart_example.user_id INNER JOIN products ON cart_example.product_id = products.product_id WHERE cart_example.user_id = $1';
    try {
        const response = await pool.query(query, [id]);
        return response.rows;
    } catch (error) {
        throw new Error(error);
    }
};

const addProduct = async (product) => {
    const query =
      'INSERT INTO cart_example (user_id, product_id, price, quantity) VALUES ($1, $2, $3, COALESCE($4,1)) RETURNING *';
    try {
        const response = await pool.query(query, [product.user_id, product.product_id, product.price, product.quantity]);
        return response.rows;
    } catch (error) {
        throw new Error(error);
    }
};


const addOne = async (product) => {
    const query = 'UPDATE cart_example SET quantity = quantity + COALESCE($1,1) WHERE user_id = $2 AND product_id = $3 RETURNING *';
    try {
        const response = await pool.query(query, [product.quantity, product.user_id, product.product_id]);
        return response.rows;
    } catch (error) {
        throw new Error(error);
    }
};

const addOneOrMore = async (product, addedQuantity) => {
    const query = 'UPDATE cart_example SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3 RETURNING *';
    try {
        const response = await pool.query(query, [addedQuantity, product.user_id, product.product_id]);
        return response.rows;
    } catch (error) {
        throw new Error(error);
    }
};

const sustractOne = async (product) => {
    const query = 'UPDATE cart_example SET quantity = quantity - 1 WHERE user_id = $1 AND product_id = $2 RETURNING *';
    try {
        const response = await pool.query(query, [product.user_id, product.product_id]);
        return response.rows;
    } catch (error) {
        throw new Error(error);
    }
};

const getCarts = async () => {
    const query = 'SELECT * FROM cart_example';
    try {
        const response = await pool.query(query);
        return response.rows;
    } catch (error) {
        throw new Error(error);
    }
};

const deleteProducts = async (user_id) => {
    const query = 'DELETE FROM cart_example WHERE user_id = $1 AND quantity <= 0';
    try {
        const response = await pool.query(query, [user_id]);
        return response.rows;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getProductByID,
    getCartInfo,
    addProduct,
    addOne,
    sustractOne,
    getCarts, 
    addOneOrMore,
    deleteProducts
};