export type ApiSuccess<T> = {
    message: string;
    data: T;
};

export type ApiError = {
    message: string;
};