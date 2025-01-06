import {MediaModel} from "../models/MediaModel";
import api from "./api";
import {ImagePickerAsset} from "expo-image-picker";
import {Platform} from "react-native";

export default {
    getMedia: (ids: string[]) => api.get<MediaModel[]>(`/api/v1/media`, { params: { ids } }),

    upload: async (files: File[]) => {
        if (files.length == 0)
            return []
        let f = new FormData();
        files.forEach((file) => {
            f.append('files', file);
        });
        return await api.post<string[]>('/api/v1/media', f, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    },

    convertToFile: (f: ImagePickerAsset) => {

        let uri = Platform.OS === 'ios' ? f.uri.replace('file://', '') : f.uri;
        const fileName = f.fileName || "avatar.jpg";
        const fileType = f.type + '/' + getFileExtension(fileName) || "image/jpeg";
        return {uri, name: fileName, type: fileType} as unknown as File;

    }
}

function getFileExtension(filename: string) {
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop() : null;
}