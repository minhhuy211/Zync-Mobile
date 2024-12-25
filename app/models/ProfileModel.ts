export interface Profile {
    id : string,
    name: string,
    username: string,
    avatar: string,
    dateOfBirths: Date | null,
    links: string[], 
    followers: number,
    following: number,
    bio: string | null,
    isPrivate: boolean, 
    isVerify: boolean,
}