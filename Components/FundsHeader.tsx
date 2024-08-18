import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Home: undefined;
    Theme: undefined;
};

interface Props {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>; // Change to 'Funds' since it's used in the Funds stack
}

const FundsHeader: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Icon name='arrow-back-ios-new' size={18} color="#667085" />
            </TouchableOpacity>
            <Text style={[styles.text, { fontWeight: 500 }]}>Mutual Funds</Text>
        </View>

    )
}
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-start",
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "white",
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    imgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end",
        flex: 1
    },
    text: {
        color: "black",
        fontFamily: "Inter",
        fontSize: 20,
        marginLeft: 10
    }
});
export default FundsHeader;