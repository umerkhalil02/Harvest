import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface RowTextProps {
    firstText: string;
    secondText: string;
    signup: boolean;
}
const RowText: React.FC<RowTextProps> = ({ firstText, secondText, signup }) => {
    const styles = StyleSheet.create({
        forgotText: {
            fontSize: 12,
            textAlign: 'center',
            color: "#667085",
            alignSelf: "flex-start",
            fontFamily: "PublicSans-Bold",
            marginTop: -10
        },
        pinContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: signup ? "center" : "flex-start",
        },
    });

    return (
        <TouchableOpacity style={styles.pinContainer}>
            <Text style={styles.forgotText}>{firstText} </Text>
            <Text style={[styles.forgotText, { color: "#7081FF" }]}>{secondText} </Text>
        </TouchableOpacity>
    );
};



export default RowText;