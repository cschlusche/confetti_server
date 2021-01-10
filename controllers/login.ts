import { Database } from 'https://deno.land/x/denodb/mod.ts';
import { create, Header, Payload, verify, decode } from "https://deno.land/x/djwt/mod.ts";


interface loginDataType {
    username: string,
    password: string
}

const header: Header = { typ: 'JWT', alg: 'HS512' }

const payload: Payload = {
    iss: 'confetti.schlusche.net', // issuer (xxx)
    exp: (Date.now() / 1000) + 600,  // expiration date
}

const key = '!aJV9uSC!&W7Jxqt9Hx5eKs5NagrgXRx'

/**
 * 
 * @param loginData
 */
export const checkCredentials = (db: Database, loginData: loginDataType) => {

    if (String(loginData.username) === "christian" &&
        String(loginData.password) === "pass") {

        return true;
    } else {
        return false;
    }
}

/**
 * 
 * @param loginData 
 * @returns JSONWebToken
 */
export const createCookie = (loginData: loginDataType) => {

    let token = create(header, payload, key)
    return token
}

/**
 * 
 * @param token 
 * @return boolean
 */
export async function checkToken(token: any) {

    try {
        return await verify(token, key, 'HS512').then(() => {

            return true;
        });

    } catch {
        return false;
    }


}