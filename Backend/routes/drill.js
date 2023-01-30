const express = require('express');

const drillController = require('../controllers/drill');

const router = express.Router();

router.get('/', drillController.drill);

router.get('/:drillId', drillController.show);

router.post('/', drillController.create);

router.put('/:drillId', drillController.update);

router.delete('/:drillId', drillController.delete);

module.exports = router;