import { Drawing } from "./drawing";


export interface UserData {
    username:string;
    email:string;
    submissionDate: string;
    drawings: [Drawing]
}

export type GetUserDataQuery = {
    getUserData: UserData
}