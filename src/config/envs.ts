import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    PRODUCT_MICROSERVICES_HOST: string;
    PRODUCT_MICROSERVICES_POST: number;
}

const envsSchema = joi
    .object<EnvVars>({
        PORT: joi.number().required(),
        PRODUCT_MICROSERVICES_HOST: joi.string().required(),
        PRODUCT_MICROSERVICES_POST: joi.number().required()
    })
    .unknown();

const { error, value } = envsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error error: ${error.message}`);
}

const envVarsL: EnvVars = value;

export const envs = {
    port: envVarsL.PORT,
    productMicroservicesHost: envVarsL.PRODUCT_MICROSERVICES_HOST,
    productMicroservicesPost: envVarsL.PRODUCT_MICROSERVICES_POST
};
