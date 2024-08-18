import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ToastAndroid } from 'react-native';
import axios from 'axios';
import RowText from '../Components/rowText';
import Icon from "react-native-vector-icons/Ionicons"
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { setToken } from '../slices/userSlice';
import { Api } from '../Backend/Endpoints';


type RootStackParamList = {
    Home: undefined;
    Theme: undefined;
  };
  
  interface Props {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  }

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState<string>('');
    const [pin, setPin] = useState<string>('');
    const [showPin, setShowPin] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    const togglePinVisibility = () => {
        setShowPin(!showPin);
    };

    const login = async () => {
        if(email.length === 0 || pin.length === 0) {
            ToastAndroid.show("Please fill in all fields", ToastAndroid.SHORT);
            return;
        }
        const response = await axios.post(Api.baseURL + Api.login, {
            email: email,
            password: pin,
        });
        if (response?.status == 201) {
            try {
                const access_token = response?.data?.access_token;
                const token = access_token.replace("Bearer ", "");
                dispatch(setToken(token));
                ToastAndroid.show("Logged in successfully", ToastAndroid.SHORT);
                navigation.navigate("Theme");
            }
            catch (e) {
                ToastAndroid.show("Couldn't log in", ToastAndroid.SHORT);
                console.log(e);
                return;
            }
        }
        else {
            ToastAndroid.show("Invalid credentials", ToastAndroid.SHORT);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.loginText}>Login</Text>

            <TextInput
                style={styles.emailInput}
                placeholder="Email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={"#667085"}
                
            />

            <View style={styles.pinContainer}>
                <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Login pin"
                    value={pin}
                    onChangeText={setPin}
                    secureTextEntry={!showPin}
                    placeholderTextColor={"#667085"}

                />
                <TouchableOpacity onPress={togglePinVisibility} style={styles.iconContainer}>
                    <Icon name={showPin ? 'eye' : 'eye-off'} size={24} color="gray" />
                </TouchableOpacity>
            </View>


            <RowText firstText='Forgot pin?' secondText='reset' signup={false} />

            <TouchableOpacity style={styles.buttonStyle} onPress={() => { login() }}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <RowText firstText='Dont have an account?' secondText='Sign up' signup={true} />


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    loginText: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
        color: "black",
        alignSelf: "flex-start",
        fontFamily: "PublicSans-Bold"
    },
    forgotText: {
        fontSize: 12,
        textAlign: 'center',
        color: "#667085",
        alignSelf: "flex-start",
        fontFamily: "PublicSans-Bold",
        marginTop: -10
    },
    emailInput: {
        paddingHorizontal: 10,
        fontSize: 16,
        color: "black",
        backgroundColor: "#F9FAFB",
        height: 60,
        borderColor: '#D0D5DD',
        borderWidth: 0.5,
        borderRadius: 12,
        marginBottom: 10,
    },
    input: {
        paddingHorizontal: 10,
        fontSize: 16,
        color: "black",
    },
    pinContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#F9FAFB",
        height: 60,
        borderColor: '#D0D5DD',
        borderWidth: 0.5,
        borderRadius: 12,
        marginBottom: 20,
    },
    iconContainer: {
        padding: 10,
    },
    buttonStyle: {
        backgroundColor: "#7081FF",
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: 10,
        alignSelf: "center",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 16,
        color: "#fff",
        fontFamily: "PublicSans-Medium"
    },
});

export default LoginScreen;
