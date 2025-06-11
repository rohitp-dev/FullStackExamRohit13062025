import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/sql/User.js";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export async function registerUser(email, password, name) {
  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      const error = new Error("User already exists");
      error.statusCode = StatusCodes.BAD_REQUEST;
      throw error;
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    const userJson = user.toJSON();
    const { password: _password, ...userWithoutPassword } = userJson;

    return userWithoutPassword;
  } catch (err) {
    throw {
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    };
  }
}

export async function loginUser(email, password) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const error = new Error("Invalid credentials");
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    }

    const token = generateToken(user.id);
    return { token };
  } catch (err) {
    throw {
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    };
  }
}
