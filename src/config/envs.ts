
import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    STRIPE_SECRET: string;
    ENDPOINT_SECRET: string;
    STRIPE_SUCCESSURL:string;
    STRIPE_CANCELURL:string;
    NATS_SERVERS: string[];
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    STRIPE_SECRET: joi.string().required(),
    ENDPOINT_SECRET: joi.string().required(),
    STRIPE_SUCCESSURL: joi.string().required(),
    STRIPE_CANCELURL : joi.string().required(),
    NATS_SERVERS: joi.array().items( joi.string() ).required(),
})
.unknown(true);
const { error, value } = envsSchema.validate({ 
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(',')
  });
if(error) throw new Error(`Config validation error: ${error.message}`);
const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    stripeSecret  : envVars.STRIPE_SECRET,
    endpointSecret: envVars.ENDPOINT_SECRET,
    successUrl    : envVars.STRIPE_SUCCESSURL,
    cancleUrl     : envVars.STRIPE_CANCELURL,
    natsServers   : envVars.NATS_SERVERS, 
}
