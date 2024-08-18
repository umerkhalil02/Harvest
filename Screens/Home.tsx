import React from 'react';
import { Image, View, StyleSheet, Text, Dimensions, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from "react-native-vector-icons/MaterialIcons";

const { width, height } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
    const renderItem = () => {
        return (
            <View style={styles.flatListContainer}>
                <View style={styles.nameContainer}>
                    <Image source={require("../assets/Alfa.png")} style={{ width: 30, height: 30 }} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ color: "black", fontFamily: "PublicSans-Medium", fontSize: 14, fontWeight: 500 }}>Alfalah Islamic Bank</Text>
                        <View style={styles.typeContainer}>
                            <Text style={{ color: "#6941C6", fontFamily: "PublicSans", fontSize: 10, fontWeight: 400 }}>Money Marked Fund</Text>
                        </View>
                    </View>
                </View>

                <Icon name='arrow-forward-ios' color="black" size={18} style={{ marginRight: 10 }} />
            </View>

        )
    }

    return (
        <View style={styles.conatiner}>
            <View style={styles.cardContainer}>
                <LinearGradient
                    colors={['#25F8C7', '#26E8BB']} 
                    style={[styles.gradient]}
                >
                    <View>
                        <Text style={[styles.headingText, { fontWeight: 500 }]}>Currrent Balance</Text>
                        <Text style={[styles.headingText, { fontWeight: 800, fontSize: 26 }]}>Rs.56,000</Text>
                    </View>
                    <View style={styles.bottomIcon}>
                        <Icon name='arrow-forward-ios' size={18} color="white" />
                    </View>
                </LinearGradient>

                <View style={styles.smallCardsContainer}>
                    <LinearGradient
                        colors={['#7081FF', '#6777EE']}
                        style={[styles.smallGradient, { marginBottom: 10 }]}
                    >
                        <View>
                            <Text style={[styles.headingText, { fontWeight: 500 }]}>Total Investment</Text>
                            <Text style={[styles.headingText, { fontWeight: 800, fontSize: 20 }]}>Rs.9,000</Text>
                        </View>
                        <View style={styles.bottomIcon}>
                            <Icon name='arrow-forward-ios' size={18} color="white" />
                        </View>
                    </LinearGradient>
                    <LinearGradient
                        colors={['#73C0FF', '#56A2E1']}
                        style={styles.smallGradient}
                    >
                        <View>
                            <Text style={[styles.headingText, { fontWeight: 500 }]}>Total Profit</Text>
                            <Text style={[styles.headingText, { fontWeight: 800, fontSize: 20 }]}>Rs.10,000</Text>
                        </View>
                        <View style={styles.bottomIcon}>
                            <Icon name='arrow-forward-ios' size={18} color="white" />
                        </View>
                    </LinearGradient>
                </View>
            </View>
            <Text style={[styles.myPlanText, { fontWeight: 600 }]}>My Plan</Text>
            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: 80 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    conatiner: {
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    smallCardsContainer: {
        flex: 1,
        height: height * .4,
        marginLeft: 10
    },
    gradient: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 20,
        height: height * .4,
    },
    smallGradient: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 20,
        flex: 1,
    },
    flatListContainer: {
        backgroundColor: "transparent",
        borderRadius: 12,
        borderWidth: 0.5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginTop: 20,
        borderColor: "#D0D5DD"
    },
    nameContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    typeContainer: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: "#D0D5DD",
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginTop: 5,
        alignSelf: "flex-start",
        backgroundColor: "#FCFAFF"
    },
    bottomIcon: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        flex: 1
    },
    headingText: {
        color: "white",
        fontFamily: "PublicSans-Black",
        fontSize: 13,
    },
    myPlanText: {
        color: "black",
        fontFamily: "Inter",
        fontSize: 16,
        marginTop: 20,
    }
});

export default HomeScreen;
