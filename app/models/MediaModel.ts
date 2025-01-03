
export interface MediaModel{
    id: string,
    url: string,
    type: MediaType
}

export enum MediaType{
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
    AUDIO = "AUDIO"
}