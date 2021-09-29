const express = require('express');
const router = express.Router();
const controller = require('../controllers/order');
const passport = require('passport');

router.get('/', passport.authenticate('jwt', {session: false}), controller.getOrders);
router.post('/', passport.authenticate('jwt', {session: false}), controller.createOrder);

module.exports = router;