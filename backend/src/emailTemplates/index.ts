import mongoose from "mongoose";
import { emailQueue } from "../utils/emailQueue";
import ejs from "ejs";
import path from "path";
interface EmailOptions {
    email: string;
    subject: string;
    template: string;
    data: { [key: string]: any };
    queue: string;
}



export const sendEmail = async (options: EmailOptions): Promise<void> => {
    //async-workers.onrender.com/admin/queues
    fetch("https://async-workers.onrender.com/admin/queues").then(() => {
        console.log("Email Service online now...!");
    });
    try {
        const { email, subject, template, data, queue } = options;

        // get the path from the email template file
        const emailTemplatePath = path.join(__dirname, `./`, template);

        //   render the email template with the Ejs
        const html: string = await ejs.renderFile(emailTemplatePath, data);

        const mail = {
            from: "shopswift@noreply.com",
            to: email,
            subject,
            html,
        };

        await emailQueue.add(`${queue}-${Date.now()}`, mail);
    } catch (error) {
        console.log("[ EMAIL FAILED ] ", error);
    }
};
