import { PasswordRepository } from '../repositories/password.repository';
import {
  PasswordModel
} from '../models/password.model';

export class PasswordService {
  public constructor(
    private readonly passwordRepository: PasswordRepository
  ) {
    this.passwordRepository = passwordRepository;
  }

  public async getPassword(
    passwordModel: PasswordModel
  ): Promise<PasswordModel> {
    return this.passwordRepository.getPassword(passwordModel);
  }

  public async createPassword(
    passwordModel: PasswordModel): Promise<PasswordModel> {
    return this.passwordRepository.createPassword(passwordModel);
  }
}
