import {ActivityTitle} from "../../constants/notify/ActivityTitle";
import React from "react";
import {Alert, StyleSheet, Text, TouchableOpacity} from "react-native";

interface ButtonProps {
    title: ActivityTitle;
    isSelected: boolean;
    onClick: () => void;
}

const FilterButton = (buttonProps: ButtonProps) => {
    return (
        <TouchableOpacity style={[styles.button, buttonProps.isSelected && styles.selectedButton]}
                          onPress={buttonProps.onClick}>
            <Text style={[styles.buttonText, buttonProps.isSelected && styles.selectedText]}>{buttonProps.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
        minWidth: 120,
        paddingVertical: 6,
        borderStyle: 'solid',
        borderWidth: 1.5,
        borderColor: 'rgba(221,221,221,0.7)',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: '#000',
        fontFamily: 'SF Pro',
        fontWeight: 'bold',
        fontSize: 14,
    },

    selectedButton: {
        backgroundColor: '#000',
        borderColor: '#000',
    },

    selectedText: {
        color: '#fff',
        fontFamily: 'SF Pro',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default FilterButton;