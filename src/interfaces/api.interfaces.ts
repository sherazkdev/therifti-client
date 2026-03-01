export interface ApiError {
    success?: boolean;
    message: string;
    statusCode: number;
    data?: unknown;
}