import {
  getDailyRevenue,
  getTopSpenders,
  getSalesByCategory,
} from "../services/ReportService.js";
import { StatusCodes } from "http-status-codes";

export const sqlReports = async (req, res) => {
  try {
    const revenue = await getDailyRevenue();
    const topSpenders = await getTopSpenders();

    res.status(StatusCodes.OK).json({
      message: "SQL reports fetched successfully",
      status: "success",
      data: { revenue, topSpenders },
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message,
      status: "error",
    });
  }
};

export const mongoReports = async (req, res) => {
  try {
    const categorySummary = await getSalesByCategory();
    res.status(StatusCodes.OK).json({
      message: "MongoDB reports fetched successfully",
      status: "success",
      data: categorySummary,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message,
      status: "error",
    });
  }
};
