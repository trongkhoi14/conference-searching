const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers');
const { verifyAccessToken } = require('../middlewares/verifyToken')

const userController = new UserController();

// --> /api/v1/user

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/current', verifyAccessToken, userController.getCurrentUser)
router.get('/logout', userController.logout);
router.get('/', userController.getAll);
router.get('/refreshToken', userController.refreshAccessToken);
router.put('/changePassword', verifyAccessToken, userController.changePassword);
router.put('/:id', verifyAccessToken, userController.updateUser);

module.exports = router;