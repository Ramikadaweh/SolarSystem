const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const jwt = require('jsonwebtoken');


// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]

//   if (token == null) return res.sendStatus(401)

//   jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {

//     if (err) return res.sendStatus(403)

//     req.user = user

//     next()
//   })
// }

router.get('/', controller.AllUsers)
router.get('/:id', controller.Oneuser)
router.post('/', controller.InsertUser)
router.delete('/:id', controller.deleteUser)
router.put('/:id', controller.UpdateUser)
router.post('/admin', controller.validationUser)


module.exports = router;