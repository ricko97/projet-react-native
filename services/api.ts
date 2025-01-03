import {
    AddTaskRequest, AddTaskResponse, DeleteTaskRequest, DeleteTaskResponse,
    GetTasks,
    LoginRequest,
    LoginResponse,
    SignupRequest,
    SignupResponse,
    UpdateTaskRequest, UpdateTaskResponse
} from "@/services/models";

const API_URL = "https://server-1-t93s.onrender.com";

export const signupAction = async ({
                                       firstName,
                                       lastName,
                                       email,
                                       password,
                                   }: SignupRequest): Promise<SignupResponse> => {
    try {
        const res = await fetch(`${API_URL}/api/user/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstName, lastName, email, password})
        })

        return await res.json();
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const loginAction = async ({
                                      email,
                                      password,
                                  }: LoginRequest): Promise<LoginResponse> => {
    try {
        const res = await fetch(`${API_URL}/api/user/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })

        return await res.json();
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const getTasks = async (userId: string): Promise<GetTasks> => {
    try {
        const res = await fetch(`${API_URL}/api/tasks-management/get-tasks/${userId}`)

        return await res.json();
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const updateTask = async ({
                                     userId,
                                     taskId,
                                     title,
                                     description,
                                     isDone
                                 }: UpdateTaskRequest): Promise<UpdateTaskResponse> => {
    try {
        const res = await fetch(`${API_URL}/api/tasks-management/update-task`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId, taskId, title, description, isDone})
        })

        return await res.json();
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const addTask = async ({
                                  userId,
                                  title,
                                  description,
                              }: AddTaskRequest): Promise<AddTaskResponse> => {
    try {
        const res = await fetch(`${API_URL}/api/tasks-management/add-task`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId, title, description})
        })

        return await res.json();
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const deleteTask = async ({
                                     userId,
                                     taskId,
                                 }: DeleteTaskRequest): Promise<DeleteTaskResponse> => {
    try {
        const res = await fetch(`${API_URL}/api/tasks-management/remove-task`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId, taskId})
        })

        return await res.json();
    } catch (error) {
        throw new Error(`${error}`);
    }
};

