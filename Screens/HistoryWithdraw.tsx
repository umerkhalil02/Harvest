import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HistoryWithdrawProps {
    history: boolean;
}

const HistoryWithdrawScreen: React.FC<HistoryWithdrawProps> = ({ history }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{history ? "History" : "Withdraw"} Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        color: 'black',
        fontSize: 20,
    }
});

export default HistoryWithdrawScreen;