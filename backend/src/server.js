import app from "./app.js";
import { connectDb } from "./config/db.js";
import env from "./config/env.js";
import logger from "./config/logger.js";

async function startServer() {
  try {
    await connectDb();
    app.listen(env.PORT, () => {
      logger.info(`Server is running on port ${env.PORT}.`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
