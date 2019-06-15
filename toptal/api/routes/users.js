const express = require('express');
const controller = require('../controllers/users');

const router = express.Router();
/* POST login. */
router.get('/', controller.getUsers);
router.post('/', controller.createUsers);
router.delete('/:id', controller.deleteUsers);

module.exports = router;
