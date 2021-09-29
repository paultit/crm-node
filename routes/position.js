const express = require('express');
const router = express.Router();
const controller = require('../controllers/position');
const passport = require('passport');

router.get('/:categoryId', passport.authenticate('jwt', {session: false}), controller.getPosition);
router.post('/', passport.authenticate('jwt', {session: false}), controller.createPosition);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.removePosition);
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.updatePosition);

module.exports = router;