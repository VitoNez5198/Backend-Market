const {getProducts, getProductById, createProduct, updateProduct, deleteProduct} = require('../models/artworks');


const all = async (req, res) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const one = async (req, res) => {
    try {
        const product = await getProductById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//VERIFICAR SI LA URL AL CREAR EL PRODUCTO TENDRA EL ID DEL VENDEDOR PARA USAR EL PARAMS
// const create = async (req, res) => {
//     try {
//         const product = await createProduct(req.params.id, req.body);
//         res.json(product);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

const create = async (req, res) => {
    try {
        const product = await createProduct(req.body);
        res.json(product);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const update = async (req, res) => {
    try {
        const product = await updateProduct(req.params.id, req.body);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const destroy = async (req, res) => {
    try {
        const product = await deleteProduct(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {all, one, create, update, destroy};