const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const controller = require('../controllers/category');
const passport = require('passport');

router.get('/', passport.authenticate('jwt', {session: false}), controller.getCategories);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getCategory);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.removeCategory);
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.createCategory);
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.updateCategory);

module.exports = router;