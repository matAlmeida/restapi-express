import express from 'express';
const router = express.Router();

router.get('/', require('./root').default);
router.use('/users', require('./users').default);

export default router;
