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

export interface GetTasks {
    userId: string,
    tasks: TaskUser[]
}

export interface UpdateTaskRequest {
    userId: string;
    taskId: string;
    title?: string;
    description?: string;
    isDone?: boolean;
}

export interface UpdateTaskResponse {
    message: string;
    taskId: string;
}

export interface AddTaskRequest {
    userId: string;
    title: string;
    description: string;
}

export interface AddTaskResponse {
    message: string;
    taskId: string;
    date: string;
}

export interface DeleteTaskRequest {
    userId: string;
    taskId: string;
}

export interface DeleteTaskResponse {
    message: string;
}