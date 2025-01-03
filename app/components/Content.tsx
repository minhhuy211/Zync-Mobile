

import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface MentionParserProps {
    value: string;
}

const Content: React.FC<MentionParserProps> = ({ value }) => {
    // Function to parse text and separate mentions and plain text
    const parseText = (text: string) => {
        const mentionRegex = /@\[(.+?)\]\((.+?)\)/g;
        const parts: { type: 'mention' | 'text'; content: string }[] = [];
        let lastIndex = 0;

        // Match all mentions
        text.replace(mentionRegex, (match, name, id, index) => {
            if (lastIndex < index) {
                parts.push({ type: 'text', content: text.slice(lastIndex, index) });
            }
            parts.push({ type: 'mention', content: `@${name}` });
            lastIndex = index + match.length;
            return match;
        });

        // Add remaining text
        if (lastIndex < text.length) {
            parts.push({ type: 'text', content: text.slice(lastIndex) });
        }

        return parts;
    };

    const parsedText = parseText(value);

    return (
        <Text style={styles.text}>
            {parsedText.map((part, index) =>
                part.type === 'mention' ? (
                    <Text key={index} style={styles.mention}>
                        {part.content}
                    </Text>
                ) : (
                    <Text key={index}>{part.content}</Text>
                )
            )}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: '#000',
    },
    mention: {
        color: '#1E90FF', // Different color for mentions
        fontWeight: 'bold',
    },
});

export default Content;

// Usage Example:
// <MentionParser value="Hello @[john_doe](01H7V9XJ5FHDPNC9B1XG7XV8RV) @[jane_doe](01H7V9XJ5JYZT1DJY0VGMPQ5FR)! " />

