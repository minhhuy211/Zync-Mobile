import React, {useEffect, useRef, useState} from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    NativeSyntheticEvent,
    StyleSheet,
    Text,
    TextInput,
    TextInputSelectionChangeEventData,
    TouchableOpacity,
    useWindowDimensions,
    View
} from 'react-native';
import {UserModel} from "../models/UserModel";
import {Relationship} from "../constants/FollowStatus";
import {Ionicons} from "@expo/vector-icons";
import userApi from "../api/userApi";
import {v} from "convex/values";

export interface MentionEditorProps {
    placeholder?: string
    onChangeValue?: (text: string) => void
    onChangeDisplayText?: (text: string) => void

}

const users = [
    {
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPwR6tIEfnompxuUzDWwfa8k0vdecg2wLLsg&s",
        id: "01JGPMFCT7VC5MHV49BPK5RQRC",
        isPrivate: false,
        name: "Jang",
        relationship: Relationship.NONE,
        username: "__callmehlt",
        verified: false
    },
    {
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPwR6tIEfnompxuUzDWwfa8k0vdecg2wLLsg&s",
        id: "01JGPMFCT7VC5MHV49BPK5RQRH",
        isPrivate: false,
        name: "Diep Thi Ngoc Le",
        relationship: Relationship.NONE,
        username: "diepthingocle",
        verified: false
    },
    {
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPwR6tIEfnompxuUzDWwfa8k0vdecg2wLLsg&s",
        id: "01JGPMFCT7VC5MHV49BPK5RQRR",
        isPrivate: false,
        name: "Huy Nguyen",
        relationship: Relationship.NONE,
        username: "__callmehuy",
        verified: false
    }
]



const MentionEditor = ({onChangeValue, placeholder}: MentionEditorProps) => {
    const [text, setText] = useState<string>(''); // Text shown in TextInput
    const [isMentioning, setIsMentioning] = useState<boolean>(false);
    const [mentions, setMentions] = useState<UserModel[]>([]);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null); // Reference for debounce timer
    const [selection, setSelection] = useState<{ start: number; end: number }>({start: 0, end: 0});
    const {width} = useWindowDimensions();
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [mentionSuggestions, setMentionSuggestions] = useState<UserModel[]>([]);
    const [page, setPage] = useState(0);
    const [keyword, setKeyword] = useState("")
    const handleTextChange = (input: string) => {
        setText(input);
        const detectedMentions = [...input.matchAll(/@(\w+)/g)].map((match) => match[1]);
        const updatedMentions = mentions.filter((user) =>
            detectedMentions.includes(user.username)
        );
        setMentions(updatedMentions);

    };

    const filterUsers = (query: string) => {
        // Apply debouncing
        setKeyword(query)
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        if (loading)
            return
        debounceTimeout.current = setTimeout(() => {
            setLoading(true)
            userApi.searchFollowingsUsers(query, 10, 0)
                .then(value => {
                    setMentionSuggestions(value)
                    setHasMore(value.length != 0)
                })
                .finally(() => setLoading(false))
            setPage(0)
        }, 300);
    };

    const handleSelectionChange = (event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
        const {selection} = event.nativeEvent;
        setSelection(selection)

    };

    useEffect(() => {
        let word = getWordAtOrAfterCursor(text, selection.end)
        if (word.startsWith('@')) {
            setIsMentioning(true);
            filterUsers(word.substring(1));
        } else {
            setIsMentioning(false);
        }
    }, [selection]);

    const handleUserSelect = (user: UserModel) => {
        const words = text.split(' ');
        words.pop(); // Remove the last word (mention query)
        const newDisplayText = words.join(' ') + ` @${user.username} `;
        setMentions([user, ...mentions])
        setText(newDisplayText);
        setIsMentioning(false);
        setMentionSuggestions([]);
        setMentions((prev) => {
            const exists = prev.find((mention) => mention.id === user.id);
            return exists ? prev : [...prev, user];
        });
    };


    useEffect(() => {
        const newText = transformMentions(text);
        console.log(newText)
        onChangeValue && onChangeValue(newText)
    }, [text]);

    const transformMentions = (text: string): string => {
        // Regex to find mentions in the format @username
        const mentionRegex = /@([\w.]+)/g;
        // Replace mentions with the desired format
        return text.replace(mentionRegex, (_, username) => {
            const user = mentions.find((user) => user.username === username);
            return user ? `@[${user.username}](${user.id})` : `@${username}`;
        });
    };

    /**
     * Finds the word at or immediately after a given cursor position in a text string.
     * This version includes "@" as part of the word.
     *
     * @param text - The full text string.
     * @param cursorPosition - The current cursor position (index in the string).
     * @returns The word at or after the cursor position, or an empty string if no word is found.
     */
    function getWordAtOrAfterCursor(text: string, cursorPosition: number): string {
        // Match words including @, treating it as part of the word
        const regex = /([A-Za-z0-9@#_]+)/g; // Matches words with letters, digits, and @, #, _
        let match;

        // Iterate through the matches
        while ((match = regex.exec(text)) !== null) {
            const wordStart = match.index;
            const wordEnd = regex.lastIndex;

            // Check if the cursor is at or after the current word's start
            if (cursorPosition <= wordEnd && cursorPosition >= wordStart) {
                return match[0]; // Return the word at or after the cursor
            }

            // Special case: Cursor is between two words, and we pick the next word
            if (cursorPosition < wordStart) {
                return match[0];
            }
        }

        return ''; // Return an empty string if no word is found
    }


    function loadMore() {
        if (loading || hasMore)
            return
        setLoading(true)
        userApi.searchFollowingsUsers(keyword, 10, page * 10)
            .then(value => {
                setHasMore(value.length != 0)
                setMentionSuggestions([...mentionSuggestions, ...value])
                setPage(page + 1)
            })
            .catch((e) => console.log(e))
            .finally(() => setLoading(false))
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                value={text}
                onChangeText={handleTextChange}
                placeholder={placeholder}
                multiline
                onSelectionChange={handleSelectionChange}
                spellCheck={false}

            />

            {isMentioning && (
                <View style={{...styles.suggestionsList, width: width - 40}}>
                    <FlatList
                        data={mentionSuggestions}
                        keyExtractor={(item) => item.id}
                        renderItem={({item, index}) => (
                            <UserItem user={item} onSelect={handleUserSelect}
                                      isLast={index == mentionSuggestions.length - 1}/>
                        )}
                        pagingEnabled
                        onEndReached={loadMore}
                        onEndReachedThreshold={0.5} // Trigger when the end of the list is within 50% of the visible area
                        ListFooterComponent={
                            loading ? <ActivityIndicator size="large" color="blue" /> : null // Show loading spinner at the bottom
                        }
                    />

                    <TouchableOpacity onPress={event => setIsMentioning(false)} style={{
                        width: 28,
                        height: 28,
                        position: "absolute",
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        right: 10,
                        top: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 42,
                    }}>
                        <Ionicons name="close-outline" color="#fff" size={20}/>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

interface UserItemProps {
    user: UserModel,
    onSelect: (user: UserModel) => void,
    isLast?: boolean
}

const UserItem = ({user, onSelect, isLast}: UserItemProps) => {
    return (
        <TouchableOpacity style={styles.itemContainer} onPress={() => onSelect(user)}>
            <Image source={{uri: user.avatar}} style={styles.itemAvatar}/>
            <View style={[styles.itemRight, {borderBottomWidth: isLast ? 0 : 1}]}>
                <Text style={styles.itemUsername}>
                    {user.username}
                </Text>
                <Text style={styles.itemName}>
                    {user.name}
                </Text>
            </View>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({

    textInput: {
        marginBottom: 8,
        fontSize: 16
    },
    suggestionsList: {
        position: "absolute",
        backgroundColor: '#fff',
        borderRadius: 12,
        maxHeight: 400,
        zIndex: 100,
        left: -50,
        top: "100%",
        width: "120%",
        boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
        minHeight: 290

    },
    suggestionItem: {
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    username: {
        fontSize: 16,
        color: '#333',
    },
    container: {
        position: "relative",
    },
    itemContainer: {
        display: "flex",
        flexDirection: "row",
        paddingLeft: 10,
        gap: 16,
        alignItems: "center"

    },
    itemUsername: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 4

    },
    itemRight: {
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
        paddingVertical: 8,
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: "400",
        color: "#B8B8B8"
    },
    itemAvatar: {
        width: 38,
        height: 38,
        borderRadius: 100,
    }

});

export default MentionEditor;
