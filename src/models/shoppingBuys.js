const pool = require('../config/pool');

const getProductByID = async (product) => {
    const query = 'SELECT * FROM buys WHERE user_id = $1 AND product_id = $2 and paid = false';
    try {
        const response = await pool.query(query, [product.user_id, product.product_id]);
        return response.rows[0];
    } catch (error) {
        throw new Error(error);
    }
};


const getBuyInfo = async (id) => {
    const query = 'SELECT buys.product_id, products.title, buys.quantity, products.price, products.url_image, buys.paid FROM users INNER JOIN buys ON users.user_id = buys.user_id INNER JOIN products ON buys.product_id = products.product_id WHERE buys.user_id = $1';
    try {
        const response = await pool.query(query, [id]);
        return response.rows;
    } catch (error) {
        throw new Error(error);
    }
};

const addProduct = async (product) => {
    const query =
      'INSERT INTO buys (user_id, product_id, price, quantity) VALUES ($1, $2, $3, COALESCE($4,1)) RETURNING *';
    try {
        const response = await pool.query(query, [product.user_id, product.product_id, product.price, product.quantity]);
        return response.rows;
    } catch (error) {
        throw new Error(error);
    }
};


const addOne = async (product) => {
    const query = 'UPDATE buys SET quantity = quantity + COALESCE($1,1) WHERE user_id = $2 AND product_id = $3 RETURNING *';
    try {
        const response = await pool.query(query, [product.quantity, product.user_id, product.product_id]);
        return response.rows;
    } catch (error) {
        throw new Error(error);
    }
};

const addOneOrMore = async (product, addedQuantity) => {
    const query = 'UPDATE buys SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3 RETURNING *';
    try {
        const response = await pool.query(query, [addedQuantity, product.user_id, product.product_id]);
        return response.rows;
    } catch (error) {
        throw new Error(error);
    }
};

const sustractOne = async (product) => {
    const query = 'UPDATE buys SET quantity = quantity - 1 WHERE user_id = $1 AND product_id = $2 AND paid = false RETURNING *';
    try {
        const response = await pool.query(query, [product.user_id, product.product_id]);
        return response.rows;
    } catch (error) {
        throw new Error(error);
    }
};

const deleteProducts = async (user_id) => {
    const query = 'DELETE FROM buys WHERE user_id = $1 AND quantity <= 0';
    try {
        const response = await pool.query(query, [user_id]);
        return response.rows;
    } catch (error) {
        throw new Error(error);
    }
};

const paidBuy = async (user_id) => {
    const query = 'UPDATE buys SET paid = true WHERE user_id = $1 RETURNING *';
    try {
        const response = await pool.query(query, [user_id]);
        return response.rows;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getProductByID,
    getBuyInfo,
    addProduct,
    addOne,
    sustractOne,    
    addOneOrMore,
    deleteProducts,
    paidBuy
};