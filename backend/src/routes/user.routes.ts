import { Router } from 'express';
import userController from '../controllers/user.controller';
import validateToken from '../middlewares/validateToken';
import { validateLogin, validateRegister } from '../middlewares/validateUser';

const userRouter = Router();

userRouter.get('/', validateToken, userController.getUser);
userRouter.post('/register', validateRegister, userController.createUser);
userRouter.post('/login', validateLogin, userController.loginUser);

export default userRouter;