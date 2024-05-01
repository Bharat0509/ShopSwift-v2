import mongoose, { Connection } from "mongoose";

let globalConnection: Connection | null = null;

const initializeDatabaseConnection = async (): Promise<void> => {
    if (!process.env.MONGO_URI) {
        throw new Error("Authorization Failed: MONGO_URI is not defined.");
    }

    if (!globalConnection) {
        mongoose.set("strictQuery", true);
        const mongoDbURL = `${process.env.MONGO_URI}/${process.env.MONGO_NAME}`;
        await mongoose
            .connect(mongoDbURL)
            .then((db) => {
                globalConnection = db.connection;
                console.log(
                    `🟢 Database Connected , Host: ${globalConnection.host}`
                );
            })
            .catch((err) => {
                console.error("Error connecting to MongoDB:", err);
                process.exit(1);
            });
    }
};

export default initializeDatabaseConnection;
