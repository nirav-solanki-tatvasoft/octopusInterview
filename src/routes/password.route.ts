import * as express from 'express';
import { celebrate } from 'celebrate';
import { PasswordController } from '../controllers/password.controller';
import { PasswordSchema } from '../models/password.model';
import { PasswordRepository } from '../repositories/password.repository';
import { PasswordService } from '../services/password.service';

const {
    getdelete,
    addupdate
  } = PasswordSchema;

const router: express.Router = express.Router();

const repo: PasswordRepository = new PasswordRepository();

const service: PasswordService = new PasswordService(
  repo
);
const controller: PasswordController = new PasswordController(service);

// get password
router.get('/', celebrate(getdelete), controller.getPassword);

// add password
router.post('', celebrate(addupdate), controller.createPassword);

export = router;
