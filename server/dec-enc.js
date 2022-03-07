const JSRSASign = require('jsrsasign');

const GenerateJWT = (header, claims, algorithm, key) => {
    let sHeader = JSON.stringify(header);
    let sPayload = JSON.stringify(claims);
    let token = JSRSASign.jws.JWS.sign('HS512', sHeader, sPayload, key);
    return token;
}

const ValidateJWT = (header, token, key) => {
    return JSRSASign.jws.JWS.verifyJWT(token, key, {alg: [algorithm]});
}

const DecodeJWT = token => {
    const aJWT = token.split('.');
    const uHeader = JSRSASign.b64utos(aJWT[0]);
    const uClaim = JSRSASign.b64utos(aJWT[1]);
    const pHeader = JSRSASign.jws.JWS.readSafeJSONString(uHeader);
    const pClaim = JSRSASign.jws.JWS.readSafeJSONString(uClaim);
    return pClaim;
}

module.exports = {
    GenerateJWT,
    ValidateJWT,
    DecodeJWT
}