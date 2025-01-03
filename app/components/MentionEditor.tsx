import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    FlatList, NativeSyntheticEvent,
    StyleSheet,
    Text,
    TextInput,
    TextInputSelectionChangeEventData,
    TouchableOpacity,
    View,
} from 'react-native';
import User from "../models/User";
import {meApi} from "../api/meApi";
import Content from "./Content";


const MentionEditor: React.FC = () => {
    const [text, setText] = useState<string>(''); // Text shown in TextInput
    const [value, setValue] = useState<string>(''); // Text for submission
    const [isMentioning, setIsMentioning] = useState<boolean>(false);
    const [mentionSuggestions, setMentionSuggestions] = useState<User[]>([]);
    const [mentions, setMentions] = useState<User[]>([]);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null); // Reference for debounce timer
    const [selection, setSelection] = useState<{ start: number; end: number }>({ start: 0, end: 0 });

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
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {

        }, 500);
    };

    const handleSelectionChange = (event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
        const { selection } = event.nativeEvent;
        console.log(text)
        let word = getWordAtOrAfterCursor(text, selection.end)
        console.log(word)
        if (word.startsWith('@')) {
            setIsMentioning(true);
            filterUsers(word.substring(1));
        } else {
            setIsMentioning(false);
        }


    };

    const handleUserSelect = (user: User) => {
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

    const handleSubmit = () => {
        console.log('Submitted Text:', value);
        alert('Submitted Text: ' + value);
    };

    useEffect(() => {
        const newText = transformMentions(text);
        setValue(newText)
    }, [text]);

    const transformMentions = (text: string): string => {
        // Regex to find mentions in the format @username
        const mentionRegex = /@(\w+)/g;

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



    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                value={text}
                onChangeText={handleTextChange}
                placeholder="Type something..."
                multiline
                onSelectionChange={handleSelectionChange}

            />
            <Content value={value}/>
            <Text>{value}</Text>
            {isMentioning && (
                <FlatList
                    data={mentionSuggestions}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={styles.suggestionItem}
                            onPress={() => handleUserSelect(item)}
                        >
                            <Text style={styles.username}>@{item.username}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.suggestionsList}
                />
            )}
            <Text>Mentions: {JSON.stringify(mentions)}</Text>
            <Text>Values: {value}</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    textInput: {
        height: 100,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    suggestionsList: {
        marginTop: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        maxHeight: 150,
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
});

export default MentionEditor;
