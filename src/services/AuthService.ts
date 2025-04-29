import { db } from "../config/db";
import { UserLogin, UserRegister } from "../interfaces/Auth";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError";

const SECRET_KEY = process.env.SECRET_KEY || "";

export default class AuthService {
  static async register(user: UserRegister) {
    user.password = await bcrypt.hash(user.password, 10);

    const [rows] = await db.execute(
      "INSERT INTO users(email, username, password) VALUES(?,?,?)",
      [user.email, user.username, user.password]
    );

    return rows;
  }

  static async login(user: UserLogin): Promise<string> {
    const [rows] = await db.query(
      "SELECT id, email, username, password FROM users WHERE username = ?",
      [user.username]
    );

    const userData = (rows as any)[0];

    if (!userData) {
      throw new ApiError("Invalid Credentials", 401);
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      userData.password
    );

    if (!isPasswordValid) {
      throw new ApiError("Invalid Credentials", 401);
    }

    const token = jwt.sign(
      { id: userData.id, email: userData.email, name: userData.name },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return token;
  }
}
