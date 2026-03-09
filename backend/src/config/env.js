import "dotenv/config";

export default {
  PORT: Number(process.env.PORT) || 3000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  FRONTEND_URL: process.env.FRONTEND_URL,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};
