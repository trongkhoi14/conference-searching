const express = require('express');
const { UserController, SettingController } = require('../controllers');
const { verifyAccessToken, checkAdminRole } = require('../middlewares/verifyToken');

const router = express.Router();
const userController = new UserController();
const settingController = new SettingController();

// --> /api/v1/user
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/infomation', verifyAccessToken, userController.getCurrentUser);
router.put('/infomation', verifyAccessToken, userController.updateUser);
router.put('/changePassword', verifyAccessToken, userController.changePassword);
router.get('/refreshToken', userController.refreshAccessToken);

router.post('/register', userController.register);

router.get('/setting', verifyAccessToken, settingController.getAllSettings);
router.put('/setting', verifyAccessToken, settingController.changeSetting);

// admin side
router.get('/', verifyAccessToken, checkAdminRole, userController.getAll);

module.exports = router;