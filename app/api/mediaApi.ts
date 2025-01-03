import { MediaModel } from "../models/MediaModel";
import api from "./api";

export default {
    getMedia: (ids: string[]) => api.get<MediaModel[]>(`/api/v1/media`, { params: { ids } }),

    loadMedia: (files: File[]) => {
        let f = new FormData();
        files.forEach((file) => {
            f.append('files', file);
        });
        api.post('/api/v1/media', f)
    }
}