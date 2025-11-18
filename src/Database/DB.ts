import mongoose from "mongoose";

const MAX_TRIES = 3;
const RETRY_INTERVAL = 5000; // 5 seconds

class DatabaseConnection {
  private retryCount: number;
  private isConnected: boolean;
  constructor() {
    this.retryCount = 0;
    this.isConnected = false;

    // mongoose config
    mongoose.set("strictQuery", true);

    mongoose.connection.on("connected", () => {
      console.log("MongoDB Connected Successfully!");
      this.isConnected = true;
    });
    mongoose.connection.on("error", () => {
      console.log("Error Occured While Connecting MongoDB!");
      this.isConnected = false;
    });
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB Disconnected Successfully!");
      this.isConnected = false;
      this.handleDisconnection();
    });

    process.on("SIGTERM", this.handleAppTermination.bind(this));
  }

  async ConnectDB() {
    try {
      if (!process.env.MONGODB_URI) {
        throw new Error("MongoDB Uri is not defined in env file!");
      }

      const connectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 6000,
        socketTimeoutMs: 50000,
        family: 4, // will use IPV 4
      };
      if (process.env.NODE_ENV === "development") {
        mongoose.set("debug", true);
      }
      await mongoose.connect(process.env.MONGODB_URI, connectionOptions);
      this.retryCount = 0;
    } catch (error) {
      console.log("Error while connecting Database", error);
      await this.handleConnectionError();
    }
  }

  async handleConnectionError() {
    if (this.retryCount < MAX_TRIES) {
      this.retryCount++;
      console.log(
        `Retrying Connection... Attempt ${this.retryCount} of ${MAX_TRIES}`
      );
      await new Promise<void>((resolve) =>
        setTimeout(() => {
          resolve();
        }, RETRY_INTERVAL)
      );
      return this.ConnectDB();
    } else {
      console.log(`Failed To Connect Database After ${MAX_TRIES} Attempts!`);
      process.exit(1);
    }
  }

  async handleDisconnection() {
    if (!this.isConnected) {
      console.log("Attempting to reconnect...");
      this.ConnectDB();
    }
  }

  async handleAppTermination() {
    try {
      await mongoose.connection.close();
      console.log("MongoDB Connection close through app termination");
      process.exit(0);
    } catch (error) {
      console.log("Error occured while closing database connection", error);
      process.exit(1);
    }
  }

  getConnectionStatus() {
    return {
      isConnected: this?.isConnected,
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      name: mongoose.connection.name,
    };
  }
}

// creating instance

const dbConnection = new DatabaseConnection();
export default dbConnection;
