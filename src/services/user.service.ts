import { UserRepository } from '../repositories/user.repository';
import {
  TokenModel
} from '../models/token.model';
import { UserModel } from '../models/user.model';

export class UserService {
  public constructor(
    private readonly userRepository: UserRepository
  ) {
    this.userRepository = userRepository;
  }

  public async login(
    userModel: UserModel
  ): Promise<TokenModel> {
    return this.userRepository.login(userModel);
  }
}
