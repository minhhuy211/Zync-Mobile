// import { Relationship } from "../constants/FollowStatus";
// import { MediaType, MediaModel, PostModel, PostType } from "../models/PostModel";
// import { Profile } from "../models/ProfileModel";
// import { User } from "../models/UserModel";

// export const currentProfile = {
//     id: "1",
//     name: "John Doe",
//     username: "johndoe@gmail.com",
//     avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
//     dateOfBirths: new Date(),
//     links:[ "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"],
//     numberOfFollowers: 100,
//     numbeOfFollowings: 100,
//     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     isPrivate: true,
//     isVerify: false
// } as Profile

// export const followedUsers= [
//     "2",
//     "3",
//     "4",
//     "5",
// ]



// //Data PostThread

// // Mock dữ liệu User
// export const users: User[] = [
//     { id: "1", name: "Alice", username: "alice123", avatar: require("../../assets/logo.png"), relationship: Relationship.FOLLOWED },
//     { id: "2", name: "Bob", username: "bob456", avatar: require("../../assets/logo.png"), relationship: Relationship.FOLLOWING},
//     { id: "3", name: "Charlie", username: "charlie789", avatar: require("../../assets/logo.png"), relationship: Relationship.NONE},
//   ];

// // Mock dữ liệu PostMedia
// export const postMedia: MediaModel[] = [
//     { id: "media1", url: "https://example.com/media1.jpg", type: MediaType.IMAGE },
//     { id: "media2", url: "https://example.com/media2.mp4", type: MediaType.VIDEO },
//     { id: "media3", url: "https://example.com/media3.mp3", type: MediaType.AUDIO },
//   ];

// export const postThread: PostModel[] = [
//     {
//       id: "post1",
//       type: PostType.POST,
//       content: "This is the content of my first post.",
//       createdAt: new Date().toISOString(),
//       author: users[0],
//       likes: 100,
//       relies: 3,
//       reposts: 4,
//       media: [postMedia[0], postMedia[1]],
//       liked: true,
//     },
//     {
//       id: "post2",
//       type: PostType.REPOST,
//       content: "Here's a cool video I found.",
//       createdAt: new Date().toISOString(),
//       author: users[1],
//       likes: 50,
//       relies: 1,
//       reposts: 2,
//       media: [postMedia[1]],
//       liked: false,
//     },
//     {
//       id: "post3",
//       type: PostType.REPLY,
//       content: "Listen to this amazing audio file!",
//       createdAt: new Date().toISOString(),
//       author: users[2],
//       likes: 30,
//       relies: 3,
//       reposts: 4,
//       media: [postMedia[2]],
//       liked: false,
//     },
//   ];



