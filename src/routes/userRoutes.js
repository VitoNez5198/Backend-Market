const router = require('express').Router();
const userController = require('../controllers/userController');

// router.get('', userController.userLogued);
router.get('', userController.all);
router.get('/:id', userController.oneUser);
router.put('/:id', userController.update);
router.delete('/:id', userController.destroy);

module.exports = router;