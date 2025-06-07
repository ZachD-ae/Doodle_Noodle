import { Drawing } from "./drawing";


export interface UserData {
    _id:string;
    username:string;
    email:string;
    submissionDate: string;
    drawings: [Drawing]
}

export type GetUserDataQuery = {
    getUserData: UserData
}