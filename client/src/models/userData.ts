import { Drawing } from "./drawing";
import { User } from "./user";

export interface UserData extends User {
    username:string;
    email:string;
    password:string;
    submissionDate: string;
    drawings: [Drawing]
}