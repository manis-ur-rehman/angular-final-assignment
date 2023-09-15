export interface FileUploadResponse {
    filename: string;
    location: string;
    originalname: string;
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface LoginResponse {
    access_token: string;
    refresh_token: string;
}
export interface RegisterRequest extends LoginRequest {
name: string;
avatar: string
}
export interface RegisterResponse extends LoginRequest {
    name: string;
    avatar: string;
    role: string;
    id: number;
    creationAt: string;
    updatedAt: string;
}
export interface ErrorType {
    statusCode: string;
    message: [] | string; 
}