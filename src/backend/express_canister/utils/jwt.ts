import { createHmac } from "crypto"
import { SECRET } from "../env";

export function generateToken(payload: any, minute: number) {
    const header = {
        alg: 'HS256', // Algorithm used for hashing
        typ: 'JWT' // Type of token
    };

    const expiration = Math.floor(Date.now() / 1000) + (minute * 60) // Eg. 60 minute = 1 hour from now

    payload = {
        ...payload,
        expiration: expiration
    };

    const headerBase64 = Buffer.from(JSON.stringify(header)).toString('base64');
    const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64');

    const signature = createHmac('sha256', SECRET)
        .update(`${headerBase64}.${payloadBase64}`)
        .digest('base64');

    return { token: `${headerBase64}.${payloadBase64}.${signature}`, expiration: expiration };
}

export function verifyToken(token: string) {
    const [headerBase64, payloadBase64, signature] = token.split('.');
    const expectedSignature = createHmac('sha256', SECRET)
        .update(`${headerBase64}.${payloadBase64}`)
        .digest('base64');

    if (signature !== expectedSignature) {
        return null; // Signature verification failed
    }

    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());

    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        return null; // Token expired
    }

    return payload;
}