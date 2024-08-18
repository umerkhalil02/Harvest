import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './Home';
import HomeHeader from '../Components/HomeHeader';
import FundsHeader from '../Components/FundsHeader';
import FundsScreen from './Funds';
import HistoryWithdrawScreen from './HistoryWithdraw';

const HomeStack = () => {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{
            header: () => <HomeHeader />
          }}
        />
      </Stack.Navigator>
    );
  };
  
  const FundsStack = () => {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="funds"
          component={FundsScreen}
          options={({ navigation }) => ({
            header: () => <FundsHeader navigation={navigation} />
        })}
        />
      </Stack.Navigator>
    );
  };

const ThemeScreen: React.FC = () => {

    const _renderIcon = (routeName: string, selectedTab: string) => {
        return (
            <>
                {
                    routeName === 'Home' ?
                        <>

                            <Image source={require("../assets/Home.png")} style={{ width: 20, height: 20 }} tintColor={selectedTab === routeName ? '#7081FF' : 'gray'} />
                        </>
                        :
                        routeName === 'Funds' ?
                            <>

                                <Image source={require("../assets/Funds.png")} style={{ width: 20, height: 20 }} tintColor={selectedTab === routeName ? '#7081FF' : 'gray'} />
                            </>
                            :
                            routeName === 'History' ?
                                <>
                                    <Image source={require("../assets/History.png")} style={{ width: 15, height: 15, marginBottom: 5 }} tintColor={selectedTab === routeName ? '#7081FF' : 'gray'} />
                                </>
                                :
                                <>
                                    <Image source={require("../assets/Withdraw.png")} style={{ width: 14, height: 15, marginBottom: 5, marginTop: 3 }} tintColor={selectedTab === routeName ? '#7081FF' : 'gray'} />
                                </>
                }
                <Text style={{ color: routeName === selectedTab ? '#7081FF' : 'gray', fontSize: 12 }}>{routeName}</Text>

            </>
        );
    };

    return (
        <View style={styles.container}>
            <CurvedBottomBar.Navigator
                style={styles.bottomBar}
                type={"DOWN"}
                height={60}
                circleWidth={55}
                bgColor="#FFFFFF"
                borderTopLeftRight={true}
                screenOptions={{headerShown: false}}
                initialRouteName="Home"
                renderCircle={() => (
                    <TouchableOpacity style={styles.btnCircle}>
                        <Ionicons name="add-sharp" size={30} color={'white'} />
                    </TouchableOpacity>
                )}
                tabBar={({ routeName, selectedTab, navigate }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigate(routeName)}
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}
                        >
                            {_renderIcon(routeName, selectedTab)}
                        </TouchableOpacity>
                    );
                }}
            >
                <CurvedBottomBar.Screen
                    name="Home"
                    position="LEFT"
                    component={HomeStack}
                />
                <CurvedBottomBar.Screen
                    name="Funds"
                    position="LEFT"
                    component={FundsStack}
                />
                <CurvedBottomBar.Screen
                    name="History"
                    component={() => <HistoryWithdrawScreen history={true} />}
                    position="RIGHT"
                />
                <CurvedBottomBar.Screen
                    name="Withdraw"
                    component={() => <HistoryWithdrawScreen history={false} />}
                    position="RIGHT"
                />
            </CurvedBottomBar.Navigator>
        </View>
    );
};

export default ThemeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomBar: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 60,
        backgroundColor: 'transparent',
        borderColor: "black"
    },
    btnCircle: {
        width: 52,
        height: 52,
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7081FF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        bottom: 25,
    },
});
