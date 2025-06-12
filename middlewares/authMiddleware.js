import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'No token provided',
      status: 'error'
    });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Invalid or expired token',
      status: 'error'
    });
  }
};
