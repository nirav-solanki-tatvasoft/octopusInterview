import { Chance } from 'chance';
import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import * as proxyquire from 'proxyquire';
import { reset, mock } from 'ts-mockito';
import { PasswordModel } from '../models/password.model';
import { PasswordRepository } from '../repositories/password.repository';

const chance: Chance.Chance = new Chance();

const connectionMock = {
    DB: { get: () => { /**/ } },
    _initialize: () => { /**/ }
}

const testPasswordRepository = proxyquire('../repositories/password.repository', {
    '../utils/db': {
        Connection: connectionMock
    }
});

describe('Password Repository', () => {
    const passwordRepositoryMock: PasswordRepository = mock(PasswordRepository);
    let repository: PasswordRepository;
    let PasswordModelResult: PasswordModel;
    let PasswordModelRequest: PasswordModel;
    let PasswordModelRequestFull: PasswordModel;
    let ErrorResult: Error;

    beforeEach(() => {
        reset(passwordRepositoryMock);
        repository = new testPasswordRepository.PasswordRepository();

        PasswordModelRequest = {
            service: chance.string()
        } as PasswordModel;

        PasswordModelResult = {
            service: chance.string(),
            password: chance.string()
        } as PasswordModel;

        PasswordModelRequestFull = {
            service: chance.string(),
            password: chance.string()
        } as PasswordModel;

        ErrorResult = {
            message: chance.string()
        } as Error;
    });

    describe('get Password function', () => {
        it('should return Password', async (done) => {
            connectionMock.DB.get = (): Promise<PasswordModel> => {
                done();
                return Promise.resolve(PasswordModelResult);
            };

            const result: PasswordModel = await repository.getPassword(PasswordModelRequest);

            expect(JSON.stringify(result)).to.equal(JSON.stringify(PasswordModelResult));
        });

        it('should return Null', async (done) => {
            connectionMock.DB.get = (): Promise<null> => {
                done();
                return Promise.resolve(null);
            };

            const result: PasswordModel = await repository.getPassword(PasswordModelRequest);
            expect(JSON.stringify(result)).to.equal(JSON.stringify(null));
        });

        it('should return Error', async (done) => {
            connectionMock.DB.get = (): Promise<PasswordModel | Error> => {
                done();
                return Promise.resolve(new Error());
            };

            const result: PasswordModel = await repository.getPassword(PasswordModelRequest);
            expect(JSON.stringify(result)).to.equal(JSON.stringify(ErrorResult));
        });
    });

    describe('create Password function', () => {
        it('should create Password', async (done) => {
            connectionMock.DB.get = (): Promise<PasswordModel> => {
                done();
                return Promise.resolve(PasswordModelResult);
            };

            const result: PasswordModel = await repository.createPassword(PasswordModelRequestFull);

            expect(JSON.stringify(result)).to.equal(JSON.stringify(PasswordModelResult));
        });

        it('should return Null', async (done) => {
            connectionMock.DB.get = (): Promise<null> => {
                done();
                return Promise.resolve(null);
            };

            const result: PasswordModel = await repository.createPassword(PasswordModelRequestFull);
            expect(JSON.stringify(result)).to.equal(JSON.stringify(null));
        });

        it('should return Error', async (done) => {
            connectionMock.DB.get = (): Promise<PasswordModel | Error> => {
                done();
                return Promise.resolve(new Error());
            };

            const result: PasswordModel = await repository.createPassword(PasswordModelRequestFull);
            expect(JSON.stringify(result)).to.equal(JSON.stringify(ErrorResult));
        });
    });
});
