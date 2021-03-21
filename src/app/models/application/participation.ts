import { User } from "./user";

export interface Participation {
    id: string,
    gameName: string,
    teamName: string,
    users: User[],
    requiredTeamSize: number,
    passwordProtected: boolean,
}