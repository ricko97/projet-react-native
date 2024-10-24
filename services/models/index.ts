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

export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface TaskUser {
    taskId: string;
    title: string;
    description: string;
    date: string;
    isDone: boolean;
    isOwner: boolean
    firstName?: string,
    lastName?: string,
}

export interface AllTasks {
    userId: string,
    tasks: TaskUser[]
}