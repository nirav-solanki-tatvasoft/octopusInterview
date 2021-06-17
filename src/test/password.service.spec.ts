import { Chance } from 'chance';
import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { instance, mock, reset, when } from 'ts-mockito';
import { PasswordRepository } from '../repositories/password.repository';
import { PasswordModel } from '../models/password.model';
import { PasswordService } from '../services/password.service';

const chance: Chance.Chance = new Chance();

describe('PasswordService', () => {
    const passwordRepositoryMock: PasswordRepository = mock(PasswordRepository);
    const passwordRepositoryMockInstance: PasswordRepository = instance(passwordRepositoryMock);
    let service: PasswordService;
    let PasswordModelResult: PasswordModel;
    let PasswordModelRequest: PasswordModel;
    let PasswordModelRequestFull: PasswordModel;

    beforeEach(() => {
        reset(passwordRepositoryMock);
        service = new PasswordService(passwordRepositoryMockInstance);
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
    });

    it('should return Password', async () => {
        when(passwordRepositoryMock.getPassword(PasswordModelRequest)).thenReturn(
            Promise.resolve<PasswordModel>(PasswordModelResult)
        );
        const result: PasswordModel = await service.getPassword(PasswordModelRequest);
        expect(result).to.equal(PasswordModelResult);
    });

    it('should create Password', async () => {
        when(passwordRepositoryMock.getPassword(PasswordModelRequestFull)).thenReturn(
            Promise.resolve<PasswordModel>(PasswordModelResult)
        );
        const result: PasswordModel = await service.getPassword(PasswordModelRequestFull);
        expect(result).to.equal(PasswordModelResult);
    });
});
