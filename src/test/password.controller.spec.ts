import { Chance } from 'chance';
import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import * as httpMocks from 'node-mocks-http';
import { mock, reset, when, instance } from 'ts-mockito';
import {
    HttpStatusCode
} from '../utils/utils';

import { PasswordService } from '../services/password.service';
import { PasswordController } from '../controllers/password.controller';
import { PasswordModel } from '../models/password.model';

const chance: Chance.Chance = new Chance();
const responseMock = httpMocks.createResponse();
const requestMock = httpMocks.createRequest();

describe('PasswordController', () => {
    const PasswordServiceMock: PasswordService = mock(PasswordService);
    let controller: PasswordController;
    let PasswordModelResult: PasswordModel;
    let PasswordModelRequest: PasswordModel;
    let PasswordModelRequestFull: PasswordModel;

    beforeEach(() => {
        reset(PasswordServiceMock);
        const PasswordServiceMockInstance: PasswordService = instance(
            PasswordServiceMock
        );
        controller = new PasswordController(PasswordServiceMockInstance);
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

    describe('get Password function', () => {
        describe('service success', () => {
            it('should return HTTP 200 OK', async () => {
                when(
                    PasswordServiceMock.getPassword(PasswordModelRequest)
                ).thenResolve(PasswordModelResult);
                requestMock.body = PasswordModelRequest;
                await controller.getPassword(requestMock, responseMock);
                expect(responseMock.statusCode).to.equal(HttpStatusCode.Ok);
            });

            it('should return HTTP 400 Bad Request', async () => {
                when(
                    PasswordServiceMock.getPassword(PasswordModelRequest)
                ).thenResolve(null);
                requestMock.body = PasswordModelRequest;
                await controller.getPassword(requestMock, responseMock);
                expect(responseMock.statusCode).to.equal(HttpStatusCode.BadRequest);
            });
        });

        describe('service failures', () => {
            it('should return Internal Server Error for a service failure', async () => {
                when(
                    PasswordServiceMock.getPassword(PasswordModelRequest)
                ).thenReturn(Promise.reject(new Error('Internal server error')));
                requestMock.body = PasswordModelRequest;
                await controller.getPassword(requestMock, responseMock);
                expect(responseMock.statusCode).to.equal(HttpStatusCode.InternalServerError);
            });
        });
    });

    describe('create Password function', () => {
        describe('service success', () => {
            it('should return HTTP 200 OK', async () => {
                when(
                    PasswordServiceMock.createPassword(PasswordModelRequestFull)
                ).thenResolve(PasswordModelResult);
                requestMock.body = PasswordModelRequestFull;
                await controller.createPassword(requestMock, responseMock);
                expect(responseMock.statusCode).to.equal(HttpStatusCode.Ok);
            });

            it('should return HTTP 400 Bad Request', async () => {
                when(
                    PasswordServiceMock.createPassword(PasswordModelRequestFull)
                ).thenResolve(null);
                requestMock.body = PasswordModelRequestFull;
                await controller.createPassword(requestMock, responseMock);
                expect(responseMock.statusCode).to.equal(HttpStatusCode.BadRequest);
            });
        });

        describe('service failures', () => {
            it('should return Internal Server Error for a service failure', async () => {
                when(
                    PasswordServiceMock.createPassword(PasswordModelRequestFull)
                ).thenReturn(Promise.reject(new Error('Internal server error')));
                requestMock.body = PasswordModelRequestFull;
                await controller.createPassword(requestMock, responseMock);
                expect(responseMock.statusCode).to.equal(HttpStatusCode.InternalServerError);
            });
        });
    });
});
