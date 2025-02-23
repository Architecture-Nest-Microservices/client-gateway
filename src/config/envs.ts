import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    PRODUCT_MICROSERVICES_HOST: string;
    PRODUCT_MICROSERVICES_PORT: number;
    ORDERS_MICROSERVICES_HOST: string;
    ORDERS_MICROSERVICES_PORT: number;
}

const envsSchema = joi
    .object({
        PORT: joi.number().required(),
        PRODUCT_MICROSERVICES_HOST: joi.string().required(),
        PRODUCT_MICROSERVICES_PORT: joi.number().required(),
        ORDERS_MICROSERVICES_HOST: joi.string().required(),
        ORDERS_MICROSERVICES_PORT: joi.number().required()
    })
    .unknown();

const { error, value } = envsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    productMicroservicesHost: envVars.PRODUCT_MICROSERVICES_HOST,
    productMicroservicesPost: envVars.PRODUCT_MICROSERVICES_PORT,
    ordersMicroservicesHost: envVars.ORDERS_MICROSERVICES_HOST,
    ordersMicroservicesPort: envVars.ORDERS_MICROSERVICES_PORT
};
