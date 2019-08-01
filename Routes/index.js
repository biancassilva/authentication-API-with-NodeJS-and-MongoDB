const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => {
  console.log(res.locals.auth_data);
  return res.send({ message: 'Tudo ok no método GET para raiz' });
});
router.post('/', (req, res) => {
  return res.send({ message: 'Tudo ok no método POST para raiz' });
});

module.exports = router;
