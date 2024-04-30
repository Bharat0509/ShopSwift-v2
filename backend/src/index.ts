import { app } from "./app";
import initializeDatabaseConnection from "./db";

const PORT: number = parseInt(process.env.PORT || "4000");

// Start server
const server = app.listen(PORT, async () => {
    try {
        //Creating a connection to the database.
        await initializeDatabaseConnection();
        console.error("Server Listening on PORT ", PORT);
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
});

// Handling unhandled rejections
process.on("unhandledRejection", (error) => {
    console.error("Unhandled Promise Rejection:", error);
    server.close(() => {
        process.exit(1);
    });
});

// Handling uncaught exceptions
process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    console.log("Shutting down the server due to uncaught exception");
    process.exit(1);
});

// Handling SIGTERM and SIGINT signals for graceful shutdown
process.on("SIGTERM", () => {
    console.log("Received SIGTERM. Shutting down gracefully...");
    server.close(() => {
        console.log("Server closed.");
        process.exit(0);
    });
});

process.on("SIGINT", () => {
    console.log("Received SIGINT. Shutting down gracefully...");
    server.close(() => {
        console.log("Server closed.");
        process.exit(0);
    });
});
