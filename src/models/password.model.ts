import { Joi } from 'celebrate';

export interface PasswordModel {
    service: string;
    password: string;
}

export const PasswordSchema = {
    addupdate: {
        body: {
            service: Joi.string()
                .required()
                .max(50),
            password: Joi.string()
                .required()
                .max(50)
        }
    },
    getdelete: {
        body: {
            service: Joi.string()
                .required()
                .max(50)
        }
    }
};
