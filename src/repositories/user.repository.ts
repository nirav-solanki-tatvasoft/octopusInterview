import { Connection } from '../utils/db';
import { generateAccessToken } from '../utils/utils';
import {
  TokenModel
} from '../models/token.model';
import {
  UserModel
} from '../models/user.model';

Connection._initialize();

export class UserRepository {

  public async login(
    userModel: UserModel
  ): Promise<TokenModel> {
    const res = await new Promise((resolve, reject) => {
      Connection.DB.get(`SELECT count(*) as userCounts FROM users WHERE username = '${userModel.username}' AND password = '${userModel.password}';`, (err: any, row: any) => {
        if (row && row.userCounts == 1) {
          resolve({
            access_token: generateAccessToken("ACCESS_TOKEN", userModel.username, 300),
            refresh_token: generateAccessToken("REFRESH_TOKEN", userModel.username, 900)
          } as TokenModel);
        }
        else if(err) {
          reject(err);
        }
        else {
          resolve(null);
        }
      })
    });

    return res as TokenModel;
  }
}
