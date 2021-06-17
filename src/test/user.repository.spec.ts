import { Chance } from 'chance';
import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import * as proxyquire from 'proxyquire';
import { reset, mock } from 'ts-mockito';
import { UserRepository } from '../repositories/user.repository';
import { TokenModel } from '../models/token.model';
import { UserModel } from '../models/user.model';

const chance: Chance.Chance = new Chance();

const connectionMock = {
    DB: { get: () => { /**/ } },
    _initialize: () => { /**/ }
}

let generateAccessTokenMock = () => { /**/ }

const testUserRepository = proxyquire('../repositories/user.repository', {
    '../utils/db': {
        Connection: connectionMock
    },
    '../utils/utils': {
        generateAccessToken: generateAccessTokenMock
    }
});

describe('User Repository', () => {
    const userRepositoryMock: UserRepository = mock(UserRepository);
    let repository: UserRepository;
    let CorrectTokenModelResult: TokenModel;
    let UserModelParam: UserModel;
    let ErrorResult: Error;

    beforeEach(() => {
        reset(userRepositoryMock);
        repository = new testUserRepository.UserRepository();

        UserModelParam = {
            username: chance.string(),
            password: chance.string()
        } as UserModel;

        CorrectTokenModelResult = {
            access_token: chance.string(),
            refresh_token: chance.string()
        } as TokenModel;

        ErrorResult = {
            message: chance.string()
        } as Error;
    });

    describe('login function', () => {
        it('should return Access Token', async (done) => {
            connectionMock.DB.get = (): Promise<TokenModel> => {
                done();
                return Promise.resolve(CorrectTokenModelResult);
            };

            generateAccessTokenMock = () => { return chance.string(); }

            const result: TokenModel = await repository.login(UserModelParam);

            expect(JSON.stringify(result)).to.equal(JSON.stringify(CorrectTokenModelResult));
        });

        it('should return Null', async (done) => {
            connectionMock.DB.get = (): Promise<null> => {
                done();
                return Promise.resolve(null);
            };

            const result: TokenModel = await repository.login(UserModelParam);
            expect(JSON.stringify(result)).to.equal(JSON.stringify(null));
        });

        it('should return Error', async (done) => {
            connectionMock.DB.get = (): Promise<TokenModel | Error> => {
                done();
                return Promise.resolve(new Error());
            };

            const result: TokenModel = await repository.login(UserModelParam);
            expect(JSON.stringify(result)).to.equal(JSON.stringify(ErrorResult));
        });
    });
});
