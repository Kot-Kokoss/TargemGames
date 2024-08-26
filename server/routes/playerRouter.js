const Router = require('express');
const router = new Router();
const playerController = require('../controllers/playerController');

router.get('/players', playerController.getOn);

module.exports = router;
