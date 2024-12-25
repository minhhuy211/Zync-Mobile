import { MediaType, PostMedia, Comment, PostModel } from "../models/PostModel";
import { Profile } from "../models/ProfileModel";
import { User } from "../models/User";

export const currentProfile = {
    id: "1",
    name: "John Doe",
    username: "johndoe@gmail.com",
    avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    dateOfBirths: new Date(),
    links:[ "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"],
    followers: 100,
    following: 100,
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    isPrivate: true,
    isVerify: false
} as Profile

export const followedUsers= [
    "2",
    "3",
    "4",
    "5",
]



//Data PostThread

// Mock dữ liệu User
export const users: User[] = [
    { id: "1", name: "Alice", username: "alice123", avatar: "https://example.com/alice.jpg", isFollow: true },
    { id: "2", name: "Bob", username: "bob456", avatar: "https://example.com/bob.jpg", isFollow: false},
    { id: "3", name: "Charlie", username: "charlie789", avatar: "https://example.com/charlie.jpg", isFollow: true },
  ];

// Mock dữ liệu PostMedia
export const postMedia: PostMedia[] = [
    { id: "media1", url: "https://example.com/media1.jpg", type: MediaType.IMAGE },
    { id: "media2", url: "https://example.com/media2.mp4", type: MediaType.VIDEO },
    { id: "media3", url: "https://example.com/media3.mp3", type: MediaType.AUDIO },
  ];

// Mock dữ liệu Comment
export const comments: Comment[] = [
    {
      id: "comment1",
      content: "Great post!",
      createdAt: new Date().toISOString(),
      createdBy: users[1],
      likes: 10,
      liked: true,
      mentions: [users[2]],
    },
    {
      id: "comment2",
      content: "I totally agree.",
      createdAt: new Date().toISOString(),
      createdBy: users[2],
      likes: 5,
      liked: false,
      mentions: [],
    },
  ];

export const postThread: PostModel[] = [
    {
      id: "post1",
      type: "reply",
      title: "My First Post",
      content: "This is the content of my first post.",
      createdAt: new Date().toISOString(),
      createdBy: users[0],
      likes: 100,
      numberOfComments: 2,
      media: [postMedia[0], postMedia[1]],
      liked: true,
      comments: comments,
      mentions: [users[1], users[2]],
    },
    {
      id: "post2",
      type: "thread",
      title: "Check out this cool video!",
      content: "Here's a cool video I found.",
      createdAt: new Date().toISOString(),
      createdBy: users[1],
      likes: 50,
      numberOfComments: 1,
      media: [postMedia[1]],
      liked: false,
      comments: [comments[0]],
      mentions: [users[0], users[2]],
    },
    {
      id: "post3",
      type: "repost",
      title: "Amazing Audio File",
      content: "Listen to this amazing audio file!",
      createdAt: new Date().toISOString(),
      createdBy: users[2],
      likes: 30,
      numberOfComments: 0,
      media: [postMedia[2]],
      liked: false,
      comments: [],
      mentions: [],
    },
  ];



