import { MongoClient, MongoClientOptions } from "mongodb";
import { ClientFriendlyError } from "../errors";

const uri = process.env.MONGODB_URI as string;
if (!uri) {
  throw new ClientFriendlyError(
    "Unconfigured Environment",
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

const options: MongoClientOptions = {};

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

class Singleton {
  private static _instance: Singleton;
  private client: MongoClient;
  private clientPromise: Promise<MongoClient>;
  private constructor() {
    this.client = new MongoClient(uri, options);
    this.clientPromise = this.client.connect();
    if (process.env.NODE_ENV === "development") {
      // In development mode, use a global variable so that the value
      // is preserved across module reloads caused by HMR (Hot Module Replacement).
      global._mongoClientPromise = this.clientPromise;
    }
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new Singleton();
    }
    return this._instance.clientPromise;
  }
}
export const dbPromise = Singleton.instance;

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
