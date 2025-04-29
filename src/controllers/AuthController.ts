import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import ApiError from "../utils/ApiError";
import { errorResponse, successResponse } from "../utils/webResponse";

export default class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const requestBody = req.body;
      await AuthService.register(requestBody);
      successResponse(res, 201, { message: "success created account" });
    } catch (error: any) {
      console.error("error di controller", error);
      errorResponse(res, error);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const requestBody = req.body;
      const result = await AuthService.login(requestBody);
      res.status(200).json({ token: result });
    } catch (error: any) {
      console.error("error di controller", error);
      errorResponse(res, error);
    }
  }
}
