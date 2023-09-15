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


export interface Category {
    id: number,
    name: string,
    image: string,
    creationAt: string,
    updatedAt: string
}
export interface ProductResponse {
        id: number,
        title: string,
        price: number,
        description: string,
        images: Array<string>,
        creationAt: string,
        updatedAt: string,
        category: Category
    }
export interface editProductRequest {
    title: string,
    price: number,
    images: Array<string>
}
export interface AddProductRequest extends editProductRequest {
    description: string,
    categoryId: number,
}

export interface ErrorType {
    statusCode: string;
    message: [] | string; 
}