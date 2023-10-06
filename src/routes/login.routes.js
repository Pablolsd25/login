const {Router} = require('express');
const pool = require('../db');
const router = Router();
const {getAllUser, getUser, createUser, deleteUser, updateUser} = require('../controllers/login.controller');


router.get('/user', getAllUser);
router.get('/user/:id', getUser);
router.post('/user', createUser);
router.delete('/user/:id', deleteUser);
router.put('/user/:id',updateUser);

module.exports = router;