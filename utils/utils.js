const Crypto = require('crypto-js'),
      SHA256 = ('crypto-js/sha256');


const EKEY ="mySecretkey12314123u8dkl234";

module.exports = {

    encryptSHA2(data, key){
        if(!data) return null;
        key = key || EKEY;
        try{
            return Crypto.SHA256(data + key).toString();
        }catch(err){
            throw new Error("encryptSha256 Error");
        }
    },

    encrypt(data, key){
        return Crypto.AES.encrypt(data, key || EKEY).toString();
    },

    decrypt(data, key){
        return Crypto.AES.decrypt(data, key || EKEY).toString(Crypto.enc.Utf8);
    }
}