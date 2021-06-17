import { Chance } from 'chance';
import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { instance, mock, reset, when } from 'ts-mockito';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { TokenModel } from '../models/token.model';
import { UserModel } from '../models/user.model';

const chance: Chance.Chance = new Chance();

describe('UserService', () => {
    const userRepositoryMock: UserRepository = mock(UserRepository);
    const userRepositoryMockInstance: UserRepository = instance(userRepositoryMock);
    let service: UserService;
    let CorrectTokenModelResult: TokenModel;
    let UserModelParam: UserModel;

    beforeEach(() => {
        reset(userRepositoryMock);
        service = new UserService(userRepositoryMockInstance);
        UserModelParam = {
            username: chance.string(),
            password: chance.string()
        } as UserModel;

        CorrectTokenModelResult = {
            access_token: chance.string(),
            refresh_token: chance.string()
        } as TokenModel;
    });

    it('should return Access Token', async () => {
        when(userRepositoryMock.login(UserModelParam)).thenReturn(
            Promise.resolve<TokenModel>(CorrectTokenModelResult)
        );
        const result: TokenModel = await service.login(UserModelParam);
        expect(result).to.equal(CorrectTokenModelResult);
    });
});
