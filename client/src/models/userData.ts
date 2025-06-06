import { Drawing } from "./drawing";
import { User } from "./user";

export interface UserData extends User {
    username:string;
    email:string;
    submissionDate: string;
    drawings: [Drawing]
}

export type GetUserDataQuery = {
    getUserData: UserData
}