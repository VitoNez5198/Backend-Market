require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const artworksRoutes = require('./src/routes/artworksRoutes');
const verifiedArtistsRoutes = require('./src/routes/verifiedArtistsRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const favoritesRoutes = require('./src/routes/favoritesRoutes');
const loggerMiddleware = require('./src/middlewares/logger.middleware')

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`SERVIDOR ENCENDIDO EN PUERTO ${PORT}`);
});

// ruta default
app.get('/', (req, res) => {
    res.send('ArtMarket');
});
// app.use(loggerMiddleware);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/artworks', artworksRoutes);
app.use('/artist', verifiedArtistsRoutes);
app.use('/cart', cartRoutes);
app.use('/favorites', favoritesRoutes);


module.exports = app;