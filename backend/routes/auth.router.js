import express from 'express';
import {Login, Register, Logout} from '../controllers/auth.controller.js';

const authRouter = express.Router();


authRouter.post('/register',Register);  

authRouter.post('/login',Login);  

authRouter.post('/logout',Logout);  

export default authRouter;
// export { authRouter };


