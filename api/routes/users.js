const express = require('express');
const router = express();
const UsersController = require("../controller/users");
router.get('/', UsersController.get_all_users);
router.post('/signup', UsersController.post_signup_info);

router.post('/login', UsersController.post_login_info);
router.delete('/:emailId', UsersController.delete_user_info);

module.exports = router;