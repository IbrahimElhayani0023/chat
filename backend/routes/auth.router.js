import express from 'express';
import {Login, Register, Logout} from '../controllers/auth.controller.js';

const authRouter = express.Router();


authRouter.get('/register',Register);  

authRouter.get('/login',Login);  

authRouter.get('/logout',Logout);  

export default authRouter;
// export { authRouter };


