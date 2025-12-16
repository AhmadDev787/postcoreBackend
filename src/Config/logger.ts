import winston from "winston";
import "winston-daily-rotate-file";

const transport = new winston.transports.DailyRotateFile({
  filename: "logs/%DATE%-combined.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true, // compress old logs
  maxSize: "20m", // max 20 MB per file
  maxFiles: "28d", // keep logs for 14 days
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});
// Use everywhere in your code
// logger.info("Server started");
// logger.error("Stripe payment failed");
// logger.debug("AI job queue length:", 12);

export default logger;
