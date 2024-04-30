import { whitelist } from "../config/corsOption";
import { Request, Response, NextFunction } from "express";

const credentials = (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin as string;
    if (whitelist.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Credentials", "true");
    }
    next();
};

export default credentials;
