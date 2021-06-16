import { Request, Response } from 'express';
import {
  HttpStatusCode,
  ErrorCode
} from '../utils/utils';

import { UserService } from '../services/user.service';
import { TokenModel } from '../models/token.model';

export class UserController {
  public constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  public login = async (req: Request, res: Response): Promise<Response> => {
    return this.userService
      .login(req.body)
      .then((tokenModel: TokenModel) => {
        if (tokenModel) {
          return res.status(HttpStatusCode.Ok).json(tokenModel);
        }
        else {
          return res.status(HttpStatusCode.NotFound).json(ErrorCode.NotFound);
        }
      }
      )
      .catch(() => {
        return res.status(HttpStatusCode.InternalServerError).json(ErrorCode.InternalServerError);
      });
  };
}
