const router = require('express').Router();
const artistVerifiedController = require('../controllers/artistsVerifiedController');

router.get('', artistVerifiedController.all);
router.get('/:id', artistVerifiedController.one);

module.exports = router;
