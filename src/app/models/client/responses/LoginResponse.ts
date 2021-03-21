import { ResponseUser } from "./ResponseUser";

export interface LoginResponse {
    token: string,
    expiration: string,
    user: ResponseUser
}