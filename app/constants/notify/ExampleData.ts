import {ActivityType} from "./ActivityType";
import {Relationship} from "../Relationship";
import ActivityModel from "../../models/ActivityModel";

export const data: ActivityModel[] = [
    {
        "id": "01JGKYJ31EFNFPPJBK00981ZN3",
        "type": ActivityType.MENTION,
        "actor": {
            "id": "01JEDNK58VN4MZ624EBB8NXR9P",
            "username": "robert_brown",
            "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
            "name": "Ja Khang",
            "relationship": Relationship.FOLLOWING,
            "isPrivate": false,
            "isVerified": false
        },
        "post": {
            "id": "01JGKYJ2FVHMA29JV6SSMJG57C",
            "author": {
                "id": "01JEDNK58VN4MZ624EBB8NXR9P",
                "username": "robert_brown",
                "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
                "name": "Ja Khang",
                "relationship": Relationship.FOLLOWING,
                "isPrivate": false,
                "isVerified": false
            },
            "type": "REPLY",  // Giữ nguyên type ở đây
            "content": "@[emily_johnson](01JFY426B3DDKY4S1NVJ8JZ9Y2) Happy new year !!!",
            "createdAt": "2025-01-02T23:46:11.538809",
            "likes": 0,
            "replies": 0,
            "reposts": 0,
            "media": [],
            "time": {
                "value": 15,
                "unit": "HOURS"
            },
            "liked": false,
            "reposted": false,  // Trường reposted thêm vào
            "parent": {
                "id": "01JGH8P24C2RT36R24GQ4M3N0X",
                "author": {
                    "id": "01JFY426B3DDKY4S1NVJ8JZ9Y2",
                    "username": "emily_johnson",
                    "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
                    "name": "Rose Johnson Emily",
                    "relationship": Relationship.NONE,
                    "isPrivate": false,
                    "isVerified": false
                },
                "type": "POST",  // Giữ nguyên type ở đây
                "content": "Happy new year ",
                "createdAt": "2025-01-01T22:45:24.665695",
                "likes": 1,
                "replies": 14,
                "reposts": 0,
                "media": [],
                "time": {
                    "value": 1,
                    "unit": "DAYS"
                },
                "liked": false,
                "reposted": false  // Trường reposted thêm vào
            }
        },
        "time": {
            "value": 15,
            "unit": "HOURS"
        }
    },
    {
        "id": "01JGKYGGQDQQS92Y4MN7450D04",
        "type": ActivityType.MENTION,
        "actor": {
            "id": "01JEDNK58VN4MZ624EBB8NXR9P",
            "username": "robert_brown",
            "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
            "name": "Ja Khang",
            "relationship": Relationship.FOLLOWING,
            "isPrivate": false,
            "isVerified": false
        },
        "post": {
            "id": "01JGKYGEVMJSKS4BV03TSPKQVR",
            "author": {
                "id": "01JEDNK58VN4MZ624EBB8NXR9P",
                "username": "robert_brown",
                "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
                "name": "Ja Khang",
                "relationship": Relationship.FOLLOWING,
                "isPrivate": false,
                "isVerified": false
            },
            "type": "REPLY",  // Giữ nguyên type ở đây
            "content": "@[emily_johnson](01JFY426B3DDKY4S1NVJ8JZ9Y2) Happy new year !!!",
            "createdAt": "2025-01-02T23:45:18.718543",
            "likes": 0,
            "replies": 0,
            "reposts": 0,
            "media": [],
            "time": {
                "value": 15,
                "unit": "HOURS"
            },
            "liked": false,
            "reposted": false,  // Trường reposted thêm vào
            "parent": {
                "id": "01JGH8P24C2RT36R24GQ4M3N0X",
                "author": {
                    "id": "01JFY426B3DDKY4S1NVJ8JZ9Y2",
                    "username": "emily_johnson",
                    "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
                    "name": "Rose Johnson Emily",
                    "relationship": Relationship.NONE,
                    "isPrivate": false,
                    "isVerified": false
                },
                "type": "POST",  // Giữ nguyên type ở đây
                "content": "Happy new year ",
                "createdAt": "2025-01-01T22:45:24.665695",
                "likes": 1,
                "replies": 14,
                "reposts": 0,
                "media": [],
                "time": {
                    "value": 1,
                    "unit": "DAYS"
                },
                "liked": false,
                "reposted": false  // Trường reposted thêm vào
            }
        },
        "time": {
            "value": 15,
            "unit": "HOURS"
        }
    },
    {
        "id": "01JGKXAWFP54EWNB2QA063J1AT",
        "type": ActivityType.MENTION,
        "actor": {
            "id": "01JEDNK58VN4MZ624EBB8NXR9P",
            "username": "robert_brown",
            "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
            "name": "Ja Khang",
            "relationship": Relationship.FOLLOWING,
            "isPrivate": false,
            "isVerified": false
        },
        "post": {
            "id": "01JGKXAWA6ZVR6GREXW89R13GK",
            "author": {
                "id": "01JEDNK58VN4MZ624EBB8NXR9P",
                "username": "robert_brown",
                "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
                "name": "Ja Khang",
                "relationship": Relationship.FOLLOWING,
                "isPrivate": false,
                "isVerified": false
            },
            "type": "REPLY",  // Giữ nguyên type ở đây
            "content": "@[emily_johnson](01JFY426B3DDKY4S1NVJ8JZ9Y2) Happy new year !!!",
            "createdAt": "2025-01-02T23:24:47.187851",
            "likes": 0,
            "replies": 0,
            "reposts": 0,
            "media": [],
            "time": {
                "value": 15,
                "unit": "HOURS"
            },
            "liked": false,
            "reposted": false,  // Trường reposted thêm vào
            "parent": {
                "id": "01JGH8P24C2RT36R24GQ4M3N0X",
                "author": {
                    "id": "01JFY426B3DDKY4S1NVJ8JZ9Y2",
                    "username": "emily_johnson",
                    "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
                    "name": "Rose Johnson Emily",
                    "relationship": Relationship.NONE,
                    "isPrivate": false,
                    "isVerified": false
                },
                "type": "POST",  // Giữ nguyên type ở đây
                "content": "Happy new year ",
                "createdAt": "2025-01-01T22:45:24.665695",
                "likes": 1,
                "replies": 14,
                "reposts": 0,
                "media": [],
                "time": {
                    "value": 1,
                    "unit": "DAYS"
                },
                "liked": false,
                "reposted": false  // Trường reposted thêm vào
            }
        },
        "time": {
            "value": 15,
            "unit": "HOURS"
        }
    },
    {
        "id": "01JGKYJ31EFNFPPJBK00981ZN4",
        "type": ActivityType.FOLLOW,
        "actor": {
            "id": "01JEDNK58VN4MZ624EBB8NXR9P",
            "username": "robert_brown",
            "avatar": "../../../assets/logo.png",
            "name": "Ja Khang",
            "relationship": Relationship.FOLLOWING,
            "isPrivate": false,
            "isVerified": false
        },
        "post": undefined,  // Trường post là undefined vì type là FOLLOW
        "time": {
            "value": 10,
            "unit": "HOURS"
        }
    },
    {
        "id": "01JGKYJ31EFNFPPJBK00981ZN5",
        "type": ActivityType.FOLLOW,
        "actor": {
            "id": "01JEDNK58VN4MZ624EBB8NXR90",
            "username": "whoami",
            "avatar": "../../../assets/logo.png",
            "name": "Ja Khang",
            "relationship": Relationship.FOLLOWING,
            "isPrivate": false,
            "isVerified": false
        },
        "post": undefined,  // Trường post là undefined vì type là FOLLOW
        "time": {
            "value": 2,
            "unit": "DAYS"
        }
    },
    {
        "id": "01JGKYJ31EFNFPPJBK00981ZN7",
        "type": ActivityType.REPLY,
        "actor": {
            "id": "01JEDNK58VN4MZ624EBB8NXR9P",
            "username": "robert_brown",
            "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
            "name": "Ja Khang",
            "relationship": Relationship.FOLLOWING,
            "isPrivate": false,
            "isVerified": false
        },
        "post": {
            "id": "01JGKYJ2FVHMA29JV6SSMJG57G",
            "author": {
                "id": "01JEDNK58VN4MZ624EBB8NXR9P",
                "username": "robert_brown",
                "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
                "name": "Ja Khang",
                "relationship": Relationship.FOLLOWING,
                "isPrivate": false,
                "isVerified": false
            },
            "type": "REPLY",  // Giữ nguyên type ở đây
            "content": "Hello there !!!",
            "createdAt": "2025-01-02T23:46:11.538809",
            "likes": 0,
            "replies": 0,
            "reposts": 0,
            "media": [],
            "time": {
                "value": 15,
                "unit": "HOURS"
            },
            "liked": false,
            "reposted": false,  // Trường reposted thêm vào
            "parent": {
                "id": "01JGH8P24C2RT36R24GQ4M3N0X",
                "author": {
                    "id": "01JFY426B3DDKY4S1NVJ8JZ9Y2",
                    "username": "emily_johnson",
                    "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
                    "name": "Rose Johnson Emily",
                    "relationship": Relationship.NONE,
                    "isPrivate": false,
                    "isVerified": false
                },
                "type": "POST",  // Giữ nguyên type ở đây
                "content": "Happy new year ",
                "createdAt": "2025-01-01T22:45:24.665695",
                "likes": 1,
                "replies": 14,
                "reposts": 0,
                "media": [],
                "time": {
                    "value": 1,
                    "unit": "DAYS"
                },
                "liked": false,
                "reposted": false  // Trường reposted thêm vào
            }
        },
        "time": {
            "value": 15,
            "unit": "HOURS"
        }
    },
];
