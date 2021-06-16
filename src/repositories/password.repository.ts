import { Connection } from '../utils/db';
import {
  PasswordModel
} from '../models/password.model';

export class PasswordRepository {

  public async getPassword(
    passwordModel: PasswordModel
  ): Promise<PasswordModel> {
    const res = await new Promise((resolve, reject) => {
      Connection.DB.get(`SELECT service, password FROM services WHERE service = '${passwordModel.service}';`, (err: any, row: any) => {
        if (row && row.service && row.password) {
          resolve({
            service: row.service,
            password: row.password
          } as PasswordModel);
        }
        else if (err) {
          reject(err);
        }
        else {
          resolve(null);
        }
      })
    });

    return res as PasswordModel;
  }

  public async createPassword(
    passwordModel: PasswordModel
  ): Promise<PasswordModel> {
    const res = await new Promise((resolve, reject) => {
      Connection.DB.get(`INSERT INTO services(service, password) 
      SELECT '${passwordModel.service}', '${passwordModel.password}' 
      WHERE NOT EXISTS(SELECT 1 FROM services WHERE service = '${passwordModel.service}');`, (err: any) => {
        if (err) {
          reject(err);
        }
        else {
          this.getPassword(passwordModel).then((res: PasswordModel) => {
            resolve(res);
          });
        }
      })
    });

    return res as PasswordModel;
  }
}
