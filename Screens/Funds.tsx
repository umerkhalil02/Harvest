import React, { useEffect, useState } from 'react';
import { View, Image, Text, TextInput, StyleSheet, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Icons from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Api } from '../Backend/Endpoints';

const { width, height } = Dimensions.get('window');

const FundsScreen: React.FC = () => {
    const [search, setSearch] = useState<string>('');
    const token = useSelector((state: RootState) => state.user.token);
    const [filteredData, setFilteredData] = useState<Item[]>([]);

    const fetchData = async () => {
        if (!token) {
            throw new Error('No token available');
        }
        const { data } = await axios.get(Api.baseURL + Api.allFunds, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return data;
    };

    const { isPending, error, data, refetch } = useQuery({
        queryKey: ['funds'],
        queryFn: fetchData,
        enabled: false,
    });

    useEffect(() => {
        if (token) {
            refetch();
        }
    }, [token, refetch]);

    useEffect(() => {
        if (data) {
            const filtered = data.filter((item: Item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredData(filtered);
        }
    }, [search, data]);

    interface Item {
        name: string;
        YTD: string;
    }

    const renderItem = ({ item }: { item: Item }) => {
        return (
            <View style={styles.fundsContainer}>
                <View style={styles.nameContainer}>
                    <View style={styles.imageNameContainer}>
                        <Image source={require("../assets/Alfa.png")} style={{ width: 30, height: 30, }} />
                        <View style={styles.nameTextContainer}>
                            <Text style={[styles.nameText, { fontWeight: 500 }]}>{item?.name}</Text>
                        </View>
                    </View>
                    <View style={styles.annualReturn}>
                        <Text style={[styles.annualReturnText, { fontWeight: 400}]}>Annual Return</Text>
                        <View style={styles.percentageContainer}>
                            <MaterialIcons name='arrow-upward' color="#027A48" size={12} />
                            <Text style={styles.percentageText}>+{item?.YTD}%</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => { }}>
                    <Text style={styles.buttonText}>View Details</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {
                isPending ?
                    <ActivityIndicator size="large" color="black" style={{ marginTop: height / 4 }} />
                    :
                    filteredData.length > 0 ?
                    <>
                        <View style={styles.rowContainer}>
                            <View style={styles.search}>
                                <Icons name='search' color="#667085" size={24} />
                                <View style={{ marginLeft: 10 }}>
                                    <TextInput
                                        placeholder="Search Funds"
                                        value={search}
                                        onChangeText={setSearch}
                                        style={{ color: "black" }}
                                        autoCapitalize="none"
                                        placeholderTextColor={"#667085"}
                                    />
                                </View>
                            </View>
                            <View style={styles.filter}>
                                <Image source={require("../assets/Filter.png")} style={{ width: 18, height: 18, marginRight: 10 }} />
                                <Icon name='arrow-down' size={12} color="#667085" />
                            </View>
                        </View>
                        <Text style={styles.totalFunds}>Total Funds ({filteredData.length})</Text>
                        <FlatList
                            data={filteredData}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ paddingBottom: 80 }}
                        />
                    </>
                    :
                    filteredData.length === 0 ?
                    <View style={styles.noFundsContainer}>
                        <Text style={styles.noFunds}>No Funds Found</Text>
                    </View>
                    :
                    <View style={styles.noFundsContainer}>
                        <Text style={styles.noFunds}>Something Went Wrong</Text>
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "white"
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
    },
    search: {
        borderRadius: 12,
        borderWidth: 0.5,
        paddingLeft: 10,
        borderColor: "#D0D5DD",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 4
    },
    filter: {
        flex: 1,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: "#D0D5DD",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        marginLeft: 10
    },
    totalFunds: {
        color: "#667085",
        fontFamily: "PublicSans-Black",
        fontSize: 12,
        marginTop: 20,
        marginBottom: 10
    },
    percentageContainer: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: "#D0D5DD",
        paddingVertical: 3,
        marginRight: 10,
        backgroundColor: "#F6FEF9",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    percentageText: {
        color: "#027A48",
        fontFamily: "PublicSans",
        fontSize: 10,
        marginHorizontal: 5,
        textAlign: "center"
    },
    buttonStyle: {
        backgroundColor: "#F9FAFB",
        borderRadius: 8,
        paddingVertical: 10,
        marginTop: 10,
        alignSelf: "center",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.5,
        borderColor: "#D0D5DD"
    },
    buttonText: {
        fontSize: 12,
        color: "#667085",
        fontFamily: "PublicSans-Regular",
    },
    fundsContainer: {
        backgroundColor: "transparent",
        borderRadius: 12,
        borderWidth: 0.5,
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 20,
        borderColor: "#D0D5DD",
    },
    nameContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    imageNameContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        flexWrap: "wrap",
        flex: 3
    },
    nameTextContainer: {
        marginLeft: 10,
        flex: 0.75
    },
    nameText: {
        color: "black",
        fontFamily: "PublicSans-Medium",
        fontSize: 14,
        flexWrap: "wrap",
        lineHeight: 20
    },
    annualReturn: {
        marginLeft: 10,
        flex: 1,
        alignSelf: "flex-end"
    },
    annualReturnText: {
        color: "#667085", 
        fontFamily: "PublicSans-Black", 
        fontSize: 10, 
        lineHeight: 20 
    },
    noFundsContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    noFunds: {
        color: "black", 
        fontFamily: "PublicSans-Black", 
        fontSize: 20, 
    },
});

export default FundsScreen;
