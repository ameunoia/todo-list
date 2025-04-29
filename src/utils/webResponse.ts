import { Response } from "express";
import ApiError from "./ApiError";

export const successResponse = (
  res: Response,
  statusCode: number,
  data: any
) => {
  return res.status(statusCode).json(data);
};

export const errorResponse = (res: Response, error: Error) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({ message: error.message });
  } else {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
