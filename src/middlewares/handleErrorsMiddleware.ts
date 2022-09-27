import { NextFunction, Request, Response } from "express";
import {
	AppError,
	errorTypeToStatusCode,
	isAppError,
} from "../utils/errorUtils.js";

export default function handleErrorsMiddleware(err: Error | AppError, req: Request, res: Response, next: NextFunction) {
	if (isAppError(err)) {
		return res.status(errorTypeToStatusCode(err.type)).send(err.message);
	  }
	// if (err.type) {
	// 	return res.status(serviceErrorToStatusCode[err.type]).send(err.message);
	// }

	res.sendStatus(500);
}
