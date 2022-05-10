const router = require('express').Router();

const {
  updateProfileUser, getUserInfo,
} = require('../controllers/users');

const { updateProfileUserCheck } = require('../middlewares/JoiCheck');

router.get('/api/users/me', getUserInfo);
router.patch('/api/users/me', updateProfileUserCheck, updateProfileUser);
module.exports = router;
