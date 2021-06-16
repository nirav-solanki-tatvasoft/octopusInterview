import { UserModel } from '../models/user.model';
import * as jwt from "jsonwebtoken";

export enum HttpStatusCode {
    BadRequest = 400,
    InternalServerError = 500,
    NotFound = 404,
    Ok = 200,
    Unauthorized = 401
}

export enum ErrorCode {
    InternalServerError = 'INTERNAL_SERVER_ERROR',
    NotFound = 'NOT_FOUND'
}

export const DefaultUser: UserModel = {
    username: 'admin',
    password: '123456'
}

export const generateAccessToken = (type: any, username: any, expiresIn?: string | number) => {
    let hashKey = "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611";;

    if (type == 'REFRESH_TOKEN') {
        hashKey = "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611";
    }

    return jwt.sign(
        {
            username,
            type,
        },
        hashKey,
        { expiresIn: expiresIn }
    );
};