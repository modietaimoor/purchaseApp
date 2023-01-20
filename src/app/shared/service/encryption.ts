import * as CryptoJS from 'crypto-js';

export function EncryptAES(plaintext: string): string {
  const key = CryptoJS.enc.Utf8.parse('7061737323313233');
  const iv = CryptoJS.enc.Utf8.parse('7061737323313233');
  const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plaintext), key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return encrypted;
}

export function DecryptAES(ciphered: string): string {
  const key = CryptoJS.enc.Utf8.parse('7061737323313233');
  const iv = CryptoJS.enc.Utf8.parse('7061737323313233');

  const decrypted = CryptoJS.AES.decrypt(ciphered, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}
