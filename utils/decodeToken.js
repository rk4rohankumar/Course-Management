import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/config.js';
export default function decodeToken(token) {
    try {
        return jwt.decode(token);
    } catch (err) {
        return false;
    }
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, jwtSecret);
    } catch (err) {
        return false;
    }
}
export { verifyToken }; 