import { Chance } from 'chance';
import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import * as httpMocks from 'node-mocks-http';
import { mock, reset, when, instance } from 'ts-mockito';
import {
    HttpStatusCode
} from '../utils/utils';

import { UserModel } from '../models/user.model';
import { TokenModel } from '../models/token.model';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';

const chance: Chance.Chance = new Chance();
const responseMock = httpMocks.createResponse();
const requestMock = httpMocks.createRequest();

describe('UserController', () => {
    const UserServiceMock: UserService = mock(UserService);
    let controller: UserController;
    let CorrectTokenModelResult: TokenModel;
    let InCorrectTokenModelResult: TokenModel;
    let UserModelParam: UserModel;

    beforeEach(() => {
        reset(UserServiceMock);
        const UserServiceMockInstance: UserService = instance(
            UserServiceMock
        );
        controller = new UserController(UserServiceMockInstance);
        UserModelParam = {
            username: chance.string(),
            password: chance.string()
        } as UserModel;

        CorrectTokenModelResult = {
            access_token: chance.string(),
            refresh_token: chance.string()
        } as TokenModel;
    });

    describe('login function', () => {
        describe('service success', () => {
            it('should return HTTP 200 OK', async () => {
                when(
                    UserServiceMock.login(UserModelParam)
                ).thenResolve(CorrectTokenModelResult);
                requestMock.body = UserModelParam;
                await controller.login(requestMock, responseMock);
                expect(responseMock.statusCode).to.equal(HttpStatusCode.Ok);
            });

            it('should return HTTP 400 Bad Request', async () => {
                when(
                    UserServiceMock.login(UserModelParam)
                ).thenResolve(InCorrectTokenModelResult);
                requestMock.body = UserModelParam;
                await controller.login(requestMock, responseMock);
                expect(responseMock.statusCode).to.equal(HttpStatusCode.BadRequest);
            });
        });

        describe('service failures', () => {
            it('should return Internal Server Error for a service failure', async () => {
                when(
                    UserServiceMock.login(UserModelParam)
                ).thenReturn(Promise.reject(new Error('Internal server error')));
                requestMock.body = UserModelParam;
                await controller.login(requestMock, responseMock);
                expect(responseMock.statusCode).to.equal(HttpStatusCode.InternalServerError);
            });
        });
    });
});
