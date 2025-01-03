export interface PostRequest {
    content: string;
    id: string;
    visibility: VisibilityEnum;
}

export enum VisibilityEnum {
    ANY = "ANY",
    FOLLOWING = "FOLLOWING",
    MENTIONED = "MENTIONED"
}