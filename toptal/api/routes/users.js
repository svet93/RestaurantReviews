const express = require('express');
const controller = require('../controllers/users');
const permissions = require('../helpers/permissions');

const router = express.Router();
/* POST login. */
router.get('/', permissions.checkAdmin, controller.getUsers);
router.post('/', permissions.checkAdmin, controller.createUsers);
router.put('/:id', permissions.checkAdmin, controller.updateUser);
router.delete('/:id', permissions.checkAdmin, controller.deleteUsers);

module.exports = router;
