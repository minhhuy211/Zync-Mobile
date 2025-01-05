
export interface MediaModel{
    id: string,
    url: string,
    type: MediaType,
    width: number,
    height: number,

}

export enum MediaType{
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
    AUDIO = "AUDIO"
}