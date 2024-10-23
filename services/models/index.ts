export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignupRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface LoginResponse {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface SignupResponse {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
}