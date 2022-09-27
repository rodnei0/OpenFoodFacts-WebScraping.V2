type AppErrorTypes =
    | "not_found"

export interface AppError {
    type: AppErrorTypes;
    message: string;
}

export function errorTypeToStatusCode(type: AppErrorTypes) {
    if (type === "not_found") return 404;
    return 400;
}

export function isAppError(error: object): error is AppError {
    return (error as AppError).type !== undefined;
}

export function notFoundError(message?: string) {
	return {
		type: "not_found",
		message
	};
}