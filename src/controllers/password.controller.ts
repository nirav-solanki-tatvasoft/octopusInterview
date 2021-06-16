import { Request, Response } from 'express';
import {
  HttpStatusCode,
  ErrorCode
} from '../utils/utils';

import { PasswordService } from '../services/password.service';
import { PasswordModel } from '../models/password.model';

export class PasswordController {
  public constructor(private readonly passwordService: PasswordService) {
    this.passwordService = passwordService;
  }

  public getPassword = async (req: Request, res: Response): Promise<Response> => {
    return this.passwordService
      .getPassword(req.body)
      .then((passwordModel: PasswordModel) => {
        if (passwordModel) {
          return res.status(HttpStatusCode.Ok).json(passwordModel);
        }
        else {
          return res.status(HttpStatusCode.BadRequest).json(ErrorCode.BadRequest);
        }
      }
      )
      .catch(() => {
        return res.status(HttpStatusCode.InternalServerError).json(ErrorCode.InternalServerError);
      });
  };

  public createPassword = async (req: Request, res: Response): Promise<Response> => {
    return this.passwordService
      .createPassword(
        req.body
      )
      .then((passwordModel: PasswordModel) => {
        if (passwordModel) {
          return res.status(HttpStatusCode.Ok).json(passwordModel);
        }
        else {
          return res.status(HttpStatusCode.BadRequest).json(ErrorCode.BadRequest);
        }
      }
      )
      .catch(() => {
        return res.status(HttpStatusCode.InternalServerError).json(ErrorCode.InternalServerError);
      });
  };
}
