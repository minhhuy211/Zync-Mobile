import api from "./api";
import { Principal } from "../models/Authentication";
import { Profile } from "../models/ProfileModel";
import { currentProfile, followedUsers } from "./mock";

export default {
  // getProfile: () => api.get<Profile>('/api/v1/me/profile'),
  getPrincipal: (data: Principal) =>
    api.post<string>("/api/v1/me/principal", data),
  getProfile: () => Promise.resolve(currentProfile as Profile),
  // isFollowed: (userId: string) => api.get<boolean>(`/api/v1/me/following/${userId}`),
  isFollowed: (userId: string) =>
    Promise.resolve(followedUsers.includes(userId)),

  // Follow người dùng
  follow: (userId: string) => {
    followedUsers.push(userId); // Thêm userId vào danh sách người đang theo dõi
    return Promise.resolve(true); // Trả về thành công
  },

  // Unfollow người dùng
  unfollow: (userId: string) => {
    const index = followedUsers.indexOf(userId);
    if (index !== -1) {
      followedUsers.splice(index, 1); // Xóa userId khỏi danh sách
    }
    return Promise.resolve(false); // Trả về thành công
  },
};
