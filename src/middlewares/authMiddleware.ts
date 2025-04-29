import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "";

interface DecodedToken {
  id: number;
  name: string;
  iat: number;
  exp: number;
}

declare module "express" {
  export interface Request {
    user?: DecodedToken;
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || typeof authHeader !== "string") {
      res.status(401).json({ message: "need authentication" });
      return;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, SECRET_KEY) as DecodedToken;

    req.user = decoded;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
