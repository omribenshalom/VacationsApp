import jwt from 'jsonwebtoken';
import UserModel from '../models/user-model';
import crypto from 'crypto';
// import cacheModule from '../utils/cache-module';

const salt = 'MakeThingsGoRight'; // Hash salt.
const secretKey = 'AbraKadabraHokusFokus';

// Hash password:
function hash(plainText: string): string {
  if (!plainText) return null;

  // Hashing without salt:
  // const hashedText = crypto.createHash("sha512").update(plainText).digest("hex"); // hex --> convert to string

  // Hashing with salt:
  // HMAC = Hashed based Message Authentication Code
  const hashedText = crypto
    .createHmac('sha512', salt)
    .update(plainText)
    .digest('hex'); // hex --> convert to string

  return hashedText;
}

function getNewToken(user: UserModel): string {
  const payload = { user };

  const token = jwt.sign(payload, secretKey, { expiresIn: '2h' });

  // saving in cache userData. token as key.
  // cacheModule.set(token, user);
  // console.log("cyber. token - ", token);
  // console.log("cyber. user - ", user);

  return token;
}

function verifyToken(autorizationHeader: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (!autorizationHeader) {
      resolve(false);
      return;
    }

    const token = autorizationHeader.split(' ')[1];

    if (!token) {
      resolve(false);
      return;
    }

    jwt.verify(token, secretKey, (error) => {
      if (error) {
        resolve(false);
        return;
      }

      resolve(true);
    });
  });
}

function getUserFromToken(autorizationHeader: string): UserModel {
  const token = autorizationHeader.split(' ')[1];

  const payload: any = jwt.decode(token);

  const user = payload.user;

  return user;
}

export default {
  hash,
  getNewToken,
  verifyToken,
  getUserFromToken,
};
