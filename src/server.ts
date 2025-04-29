import "dotenv/config";
import { initDb } from "./config/db";
import app from "./app";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server: ", error);
    process.exit(1);
  }
};

startServer();
