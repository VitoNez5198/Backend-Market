const router = require('express').Router();

const { isAuth } = require('../middlewares/isAuth.middleware');

const favoritesController = require('../controllers/favoritesController');

router.get('', favoritesController.all);
router.post('/:id', isAuth, favoritesController.create);
router.delete('/:id', isAuth, favoritesController.destroy);

module.exports = router;