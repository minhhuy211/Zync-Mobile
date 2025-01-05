export interface PostRequest {
    content: string;
    id: string;
    visibility: Visibility;
}

export enum Visibility {
    ANY = "ANY",
    FOLLOWING = "FOLLOWING",
    MENTIONED = "MENTIONED"
}