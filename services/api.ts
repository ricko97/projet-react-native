import {LoginRequest, LoginResponse, SignupRequest, SignupResponse} from "@/services/models";

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
        throw new Error(`Error: ${error}`);
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

        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        throw new Error(`Fetch error: ${error}`);
    }
};