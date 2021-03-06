import express from 'express';
const router = express.Router();

import AccountController from 'controllers/accountController';

router.get('/users', AccountController.list);
router.post('/user/create', AccountController.create);
router.put('/user/update/:id', AccountController.update);
router.delete('/user/delete/:id', AccountController.delete);

export default router;