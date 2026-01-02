export type UserLevel = "BASIC" | "INTERMEDIATE" | "ADVANCED";

export interface UserProfileResponse {
  id: number;
  fullName: string;
  personalData: boolean;
  userLevel: UserLevel;
}