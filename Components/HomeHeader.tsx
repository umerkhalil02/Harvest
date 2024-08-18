import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const HomeHeader: React.FC = () => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.container}>
                <View style={{ flex: 2 }}>
                    <Image source={require("../assets/Logo.png")} style={{ width: 35, height: 32 }} />
                </View>
                <View style={styles.imgContainer}>
                    <Image source={require("../assets/Bell.png")} style={{ width: 24, height: 24, marginRight: 10 }} />
                    <Image source={require("../assets/Setting.png")} style={{ width: 19, height: 20 }} />
                </View>

            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: "white",
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
        elevation: 5,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end",
        flex: 1
    }
});
export default HomeHeader;