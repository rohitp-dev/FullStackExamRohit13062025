import { registerUser, loginUser } from "../services/AuthService.js";
import { StatusCodes } from "http-status-codes";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const data = await registerUser(email, password,name);
    res.status(StatusCodes.CREATED).json({
      message: "User registered successfully",
      status: StatusCodes.CREATED,
      data,
    });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
      status: StatusCodes.BAD_REQUEST,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);
    res.status(StatusCodes.OK).json({
      message: "Login successful",
      status: StatusCodes.OK,
      data,
    });
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: err.message,
      status: "error",
    });
  }
};
