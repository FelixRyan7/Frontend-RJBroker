import type { UserLevel } from "./userProfile";

export type loginData = {
  username: string;
  password: string;
};

export type registerFormType = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
  username: string;
  hasPersonalData: boolean,
  fullName: string;
  permissions?: string; 
  userLevel: UserLevel;
}