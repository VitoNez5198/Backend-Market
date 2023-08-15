const router = require('express').Router();

const buysController = require('../controllers/buysController');

router.get('/:id', buysController.oneBuy);
router.post('', buysController.add);
router.put('/sustract', buysController.sustract);
router.put('/paid/:id', buysController.paid);

module.exports = router;