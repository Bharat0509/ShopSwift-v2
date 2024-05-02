import { Queue } from "bullmq";

export const emailQueue = new Queue("email-Q", {
    connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
    },
});
