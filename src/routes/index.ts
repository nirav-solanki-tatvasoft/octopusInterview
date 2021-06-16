import * as express from 'express';
import * as userRouter from './user.route';

const router: express.Router = express.Router();

router.use('/user', userRouter);

export = router;
