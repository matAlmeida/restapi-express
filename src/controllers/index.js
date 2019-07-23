const express = require('express');
const router = express.Router();

router.get('/', require('./root'));
router.use('/users', require('./users'));
  
module.exports = router;