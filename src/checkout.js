/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { Icon } from '@rneui/base';
import React, { useEffect, useContext, useState } from 'react';
import LottieView from 'lottie-react-native';
import { KeyboardAvoidingView, Platform, StatusBar, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import UserContext from './services/shared/userContext';
import { ScrollView } from 'react-native-gesture-handler';
const Checkout = (props) => {

    // Variable which is used to perform navigation
    const navigation = useNavigation();
    // Context variable which is used for gold balance
    const { setMyGoldBalance, myGoldBalance } = useContext(UserContext);
    // Variable which is used to store initial loading
    const [load, setLoad] = useState(true)

    //useEffect for initial modify the gold balance 
    useEffect(() => {
        if (props?.route?.params?.type === 'sell') {
            setMyGoldBalance((Number(myGoldBalance) - Number(props?.route?.params?.weight)).toFixed(2));
        }
        else {
            setMyGoldBalance((Number(myGoldBalance) + Number(props?.route?.params?.weight)).toFixed(2));
        }
        setTimeout(() => {
            setLoad(false)
        }, 1000)
    }, []);


    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS !== 'android' ? 'padding' : null} enabled>
            <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
            < View style={{ flex: 1, backgroundColor: '#262726', }}>
                <View style={{ flex: 1 }}>
                    {/* <Header
                    placement="left"
                    centerComponent={{ text: 'My Gold', style: { color: 'white' } }}
                    leftComponent={{
                        icon: 'chevron-left', iconStyle: { marginTop: -3 }, color: 'white', size: 25, onPress: () => {
                            navigation.navigate('home')
                        },

                    }}
                    rightComponent={< RightHeader />}
                    containerStyle={{
                        backgroundColor: 'black',
                        borderBottomColor: 'white',
                        borderBottomWidth: 0,
                    }}
                    backgroundColor='black'
                /> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'black', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
                            <Icon onPress={() => { navigation.navigate('home') }} name="chevron-left" size={24} color={'white'} style={{ marginTop: -1 }} />
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, paddingLeft: 5 }}>My Gold</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                            <Text style={{ color: '#6E6B6B', fontWeight: '700', fontSize: 12 }}>Refer & Earn</Text>
                            <Icon name="send" type="material" color={'#6E6B6B'} size={18} style={{ marginLeft: 5 }} />
                        </View>
                    </View>
                    {!load ?
                        <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                            <View style={{ backgroundColor: 'black', height: 540, borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }} >
                                <View style={{ alignSelf: 'center' }}>
                                    <LottieView
                                        source={require('../assets/Congrats.json')}
                                        autoPlay
                                        loop={false}
                                        style={{ width: 200, height: 200 }}
                                    />
                                </View>
                                <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Congratulation</Text>
                                    <Text style={{ color: '#6E6B6B', fontSize: 13, marginTop: 10, fontWeight: '600' }}>{`Transaction successful for gold ${props?.route?.params?.type === 'sell' ? 'sale' : 'purchase'}`}</Text>
                                </View>
                                <View style={{ height: 140, backgroundColor: '#585858', marginTop: 30, borderRadius: 30, width: 330, alignSelf: 'center' }}>
                                    <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 27 }}>
                                        <View>
                                            <Text style={{ color: '#959393', fontWeight: '500', fontSize: 12 }}>Purchased from</Text>
                                            <Text style={{ color: '#E4E0E0', fontWeight: '600', fontSize: 12 }}>{props?.route?.params?.selectedGold?.name}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 }}>
                                            <View>
                                                <Text style={{ color: '#959393', fontWeight: '500', fontSize: 12 }}>Order id</Text>
                                                <Text style={{ color: '#E4E0E0', fontWeight: '600', fontSize: 12 }}>{Math.floor(100000 + Math.random() * 900000)}</Text>
                                            </View>
                                            <View>
                                                <Text style={{ color: '#959393', fontWeight: '500', fontSize: 12 }}>Value</Text>
                                                <Text style={{ color: '#E4E0E0', fontWeight: '600', fontSize: 12 }}>₹{props?.route?.params?.amount}</Text>
                                            </View>
                                            <View>
                                                <Text style={{ color: '#959393', fontWeight: '500', fontSize: 12 }}>Weights</Text>
                                                <Text style={{ color: '#E4E0E0', fontWeight: '600', fontSize: 12 }}>{props?.route?.params?.weight}.mg</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ alignSelf: 'center', marginTop: 30 }}>
                                    <Text style={{ color: 'white', fontSize: 13, fontWeight: '600' }}>VIEW TRANSACTIONS</Text>
                                </View>
                            </View>
                            <View style={{ alignSelf: 'center', bottom: -50, position: 'relative' }}>
                                <TouchableOpacity onPress={() => { navigation.navigate('home'); }}>
                                    <View style={{ backgroundColor: '#7B7B7B', height: 85, width: 85, borderRadius: 85 / 2, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>HOME</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                        :
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color={'white'} />
                        </View>
                    }
                </View>
            </View>
        </KeyboardAvoidingView >
    );
};
export default Checkout;
