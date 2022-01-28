const router = require("express").Router();
const validateJWT = require("../auth/validateJWT");
const messagesController = require('../controllers/messagesController');

router.post('/', validateJWT, messagesController.create);

module.exports = router;