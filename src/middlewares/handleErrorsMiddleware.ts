import { NextFunction, Request, Response } from "express";
import {
	AppError,
	errorTypeToStatusCode,
	isAppError,
} from "../utils/errorUtils.js";

export default function handleErrorsMiddleware(err: Error | AppError, req: Request, res: Response, next: NextFunction) {
	if (isAppError(err)) {
		return res.status(errorTypeToStatusCode(err.type)).send(err.message);
	} else {
		return res.status(500).send(err.message);
	}
}
