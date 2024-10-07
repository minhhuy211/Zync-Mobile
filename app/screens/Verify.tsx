import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {NavigationProp, ParamListBase, RouteProp} from "@react-navigation/native";
import {authenticationApi} from "../api/authenticationApi";

interface ScreenParams extends ParamListBase{
    Verify: {
        email: string
    }
}

const Verify = ({ navigation, route }: { navigation: NavigationProp<any>, route: RouteProp<ScreenParams, "Verify" > }) => {
    const {email} = route.params
    const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
    const inputRefs = useRef<Array<TextInput | null>>([]); // Refs to input fields
    const [enableRequest, setEnableRequest] = useState(true)

    const handleCodeChange = (index: number, value: string) => {
        const newCode = [...code];
        newCode[index] = value;

        // If value is entered, move to the next input
        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // If input is cleared, move to the previous input
        if (!value && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        setCode(newCode);
    };

    useEffect(() => {
        handleRequestCode();
    }, []);

    const handleRequestCode = () => {
        console.log(email)
        authenticationApi.requestVerificationCode(email).then(() => {
            setEnableRequest(false)
            setTimeout(() => {
                setEnableRequest(true)
            }, 10000)
        })
    }

    function handleVerify() {
        const value = code.join("");
        if (value.length < code.length)
            return;
        authenticationApi.verify({code: value, email: email})
            .then(() => {
                navigation.navigate("LOGIN")
            })
    }

    return (
        <View style={styles.container}>
            {/* Image */}
            <Image
                source={require("../../assets/logo.png")}
                style={styles.image}
            />

            {/* Title */}
            <Text style={styles.title}>Phone Verification</Text>

            {/* Subtitle */}
            <Text style={styles.subtitle}>
                We need to register your phone number before getting started!
            </Text>

            {/* Code Input Fields */}
            <View style={styles.codeInputContainer}>
                {code.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => inputRefs.current[index] = ref} // Set ref for each input
                        value={digit}
                        onChangeText={(value) => handleCodeChange(index, value)}
                        style={styles.codeInput}
                        keyboardType="numeric"
                        maxLength={1}
                        returnKeyType="next"
                    />
                ))}
            </View>

            {/* Verify Button */}
            <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
                <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>

            {/* Edit phone number */}
            <Text style={styles.editPhoneText}>Edit phone number?</Text>

            {/* Send Again */}
            <TouchableOpacity disabled={!enableRequest} onPress={handleRequestCode}>
                <Text style={styles.sendAgainText}>Send again</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        color: '#7e7e7e',
    },
    codeInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    codeInput: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        textAlign: 'center',
        fontSize: 20,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    verifyButton: {
        backgroundColor: '#000',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 5,
        marginBottom: 20,
    },
    verifyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    editPhoneText: {
        color: '#7e7e7e',
        marginBottom: 10,
    },
    sendAgainText: {
        color: '#000',
        fontWeight: 'bold',
    },
});

export default Verify;

