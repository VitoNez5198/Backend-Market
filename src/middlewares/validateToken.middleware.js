const jwt = require('jsonwebtoken');

const validateTokenMiddleware = (req, res, next) => {
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }
    try {
        const {email: user_email} = jwt.verify(token, process.env.JWT_SECRET);
        req.user_email = user_email;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = validateTokenMiddleware;
