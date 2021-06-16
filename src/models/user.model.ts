import { Joi } from 'celebrate';

export interface UserModel {
    username: string;
    password: string;
}

export const UserSchema = {
    login: {
        body: {
            username: Joi.string()
                .required()
                .max(50),
            password: Joi.string()
                .required()
                .max(50)
        }
    }
};