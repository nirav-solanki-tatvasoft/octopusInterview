import * as express from 'express';
import { celebrate } from 'celebrate';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { UserSchema } from '../models/user.model';

const {
    login
  } = UserSchema;

const router: express.Router = express.Router();

const repo: UserRepository = new UserRepository();

const service: UserService = new UserService(
  repo
);
const controller: UserController = new UserController(service);

// user login
router.post('/login', celebrate(login), controller.login);

export = router;
