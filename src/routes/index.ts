import * as express from 'express';
import * as userRouter from './user.route';
import * as passwordRouter from './password.route';

const router: express.Router = express.Router();

router.use('/user', userRouter);
router.use('/password', passwordRouter);

export = router;
