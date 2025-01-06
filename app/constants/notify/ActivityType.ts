export enum ActivityType{
    LIKE = "LIKE",             // User liked a post
    REPLY = "REPLY",            // Explicitly indicates a reply to a comment or post
    SHARE = "SHARE",            // User shared a post
    REPOST = "REPOST",           // User reposted a post
    FOLLOW = "FOLLOW",           // User followed another actor
    REQUEST_FOLLOW = "REQUEST_FOLLOW",   // User sent a follow request
    ACCEPT_FOLLOW = "ACCEPT_FOLLOW",    // User accepted a follow request
    UNFOLLOW = "UNFOLLOW",         // User unfollowed another actor
    MENTION = "MENTION",          // User mentioned another actor
    BOOKMARK = "BOOKMARK",         // User bookmarked a post
    REPORT = "REPORT",            // User reported a post
    RECOMMEND_USER = "RECOMMEND_USER",
    RECOMMEND_POST = "RECOMMEND_POST",
}