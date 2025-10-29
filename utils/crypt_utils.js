import bcrypt from 'bcrypt';
import * as jose from 'jose';
import dotenv from 'dotenv';

dotenv.config();

const saltRounds = 10;
const secret = new TextEncoder().encode(
    process.env.SECRET_KEY    
);
const alg = 'HS256';

export const encryptOneWay = async (password) => {
    return await bcrypt.hash(password, saltRounds);
};
export const compareOneWay = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};
export const encryptTwoWay = async (payload) => {
    return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .sign(secret)
}

export const decryptTwoWay = async (hash) => {
    return await jose.jwtVerify(hash, secret, {});
}


