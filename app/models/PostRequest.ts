export interface PostRequest {
    content: string;
    visibility: Visibility;
    mediaIds: string[]
}

export enum Visibility {
    ANY = "ANY",
    FOLLOWING = "FOLLOWING",
    MENTIONED = "MENTIONED"
}