import {NextFunction, Request, Response} from "express";

export class CustomError extends Error {
    message!: string;
    status!: number;
    data!: any;

    constructor(message: string, status: number = 500, data: any = {}) {
        super(message)
        this.status = status;
        this.data = data
    }
}

export function handleError(error: any, req: Request, res: Response, next: NextFunction) {
    const customError: boolean = !(error.constructor.name === 'NodeError' || error.constructor.name === 'SyntaxError');

    res.status(error.statusCode || 500).json({
        response: 'Error',
        error: {
            type: customError === false ? 'UnhandledError' : error.constructor.name,
            path: req.path,
            statusCode: error.statusCode || 500,
            message: error.message
        }
    });
    next(error);
}
