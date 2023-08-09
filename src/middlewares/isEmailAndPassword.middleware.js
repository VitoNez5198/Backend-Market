const validateEmailAndPasswordMiddleware = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
    return res.status(400).json({ message: 'Email y/o contraseña no proporcionados' });
    } else {
    next();
    }
};

module.exports = validateEmailAndPasswordMiddleware;
