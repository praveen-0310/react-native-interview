/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { useIsFocused, useNavigation } from '@react-navigation/core';
import { Icon } from '@rneui/base';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, Text, View, Animated, TouchableOpacity, Pressable, Keyboard, ActivityIndicator, ToastAndroid } from 'react-native';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
// Component
import UserContext from './services/shared/userContext';
// Service
import { getBuyPrice, getSellPrice } from '././services/ApiService';
import { PopularMovieList } from './screen/PopularMovieList';

const Home = () => {

    // Variable which is used to perform navigation
    const navigation = useNavigation();
    // Variable which is hold useIfFocused
    const isFocused = useIsFocused()
    // Context variable which is used for gold balance
    const { myGoldBalance } = useContext(UserContext);
    // Variable which is used to store Static gold data
    const [goldData, setGoldData] = useState([
        { name: 'Muthoot Gold', id: 2, varient: 'Gold' },
        { name: 'Malabar Gold', id: 1, varient: '99.9% 24K Pure Gold' },
        { name: 'Josalukas Gold', id: 3, varient: '91.6 GOLD' }])
    // Variable which is used to store buy price of gold
    const [buyPrice, setBuyPrice] = useState(null);
    // Variable which is used to store sell price of gold
    const [sellPrice, setSellPrice] = useState(null);
    // Variable which is used to store gold amount value
    const [goldAmount, setGoldAmount] = useState('');
    // Variable which is used to store gold weight 
    const [goldWeight, setGoldWeight] = useState('')
    // Variable which is used to store selected gold
    const [selectedGold, setSelectedGold] = useState(goldData[1])
    // Variable which is used store initial loading
    const [load, setLoad] = useState(true)
    // Variable is used to store the flat list movement
    const listRef = useRef(null);
    // Variable which is used to store header scrolling animation movement
    const scrollRef = useRef(null)
    // Variable which is used to store initial animation value
    const animtedValue = useRef(new Animated.Value(0)).current
    // Variable which is stored initial value for animation gold coin
    const spinValue = useRef(new Animated.Value(0)).current;
    // Variable which is stored interpolate input range for gold coin animation
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    // Variable which is used to store interpolate value for left header name
    const frontName = animtedValue.interpolate({
        inputRange: [0, 250],
        outputRange: [1, 0],
    })
    // Variable which is used to store interpolate value for header name
    const backName = animtedValue.interpolate({
        inputRange: [0, 400],
        outputRange: [0, 1],
    })

    // useEffect for animation purpose when keyboard open/close
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            scrollRef?.current?.scrollToEnd({ animated: true })

        });
        Keyboard.addListener('keyboardDidHide', () => {
            scrollRef?.current?.scrollToEnd({ animated: true })

        })
    }, [])

    // useEffect which is used for fetch sell and buy price of gold
    useEffect(() => {
        setLoad(true)
        setGoldAmount('')
        setGoldWeight('')
        fetchGoldPrices()
    }, [isFocused])

    // useEffect which used for spin gold coin  
    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            })
        ).start();
    }, [spinValue]);

    // Function which is used for fetch gold prices
    const fetchGoldPrices = async () => {
        try {
            const buyPriceData = await getBuyPrice();
            const sellPriceData = await getSellPrice();
            setBuyPrice(buyPriceData.current_price);
            setSellPrice(sellPriceData.current_price);
            setLoad(false)
        } catch (err) {
            ToastAndroid.show(
                'Failed to get gold price details, Try after some time',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
            )
            console.log('Failed to fetch gold price details');
        }
    };

    // Function which is used for gold conversion 
    const goldConversion = (value, type) => {
        if (/^\d+(\.\d+)?$/.test(value)) {
            if (type === 'amount') {
                setGoldWeight((Number(value) / (Number(buyPrice) / 1000)).toFixed(2))
                console.log('Number(value) / Number(buyPrice)', (Number(value) / Number(buyPrice)).toFixed(2))
            }
            else {
                setGoldAmount(((value) * (buyPrice / 1000)).toFixed(2))
            }
        }
    }

    // Function which is used for navigate checkout screen
    const checkout = (val) => {
        if ((!selectedGold) || (goldAmount <= 0.0)) {
            ToastAndroid.show(
                'Please enter the gold amount or mg',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
            )
        }
        else if ((/^\d+(\.\d+)?$/.test(goldWeight) && /^\d+(\.\d+)?$/.test(goldAmount))) {
            navigation.navigate('checkout', { selectedGold: selectedGold, amount: goldAmount, weight: goldWeight, ...val === 'sell' && { type: 'sell' } })
        }
        else {
            ToastAndroid.show(
                'Enter valid number',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
            )
        }
    }

    // Function which is used to render the gold list
    const render = ({ item, index }) => {
        return (
            <View style={{ flex: 1, height: 200, width: 210, backgroundColor: '#D4B89E', marginHorizontal: 10, borderRadius: 30, zIndex: -1 }}>
                {item?.id === selectedGold?.id && <View style={{ height: 30, width: 30, borderRadius: 30 / 2, position: 'absolute', backgroundColor: '#E7CF8D', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', zIndex: 7, right: 20, top: -15 }}>
                    <Icon name="check-bold" type="material-community" size={16} color={'green'} />
                </View>
                }
                <Pressable style={{ flex: 1 }} onPress={() => {
                    listRef?.current?.scrollToOffset({ offset: index * 150, animated: true })
                    setSelectedGold(item)
                }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ height: 100, backgroundColor: '#B29B85', borderTopLeftRadius: 30, borderTopRightRadius: 30, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ justifyContent: 'center', flex: 1, alignSelf: 'flex-start', alignContent: 'center', marginLeft: 30 }}>
                                < Text style={{ color: 'white', fontWeight: 'bold' }}>{item.name}</Text>
                                < Text style={{ color: 'white', fontSize: 12, fontWeight: 'medium' }}>{item.varient}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', flex: 1, }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-between', marginHorizontal: 27 }}>
                                <View style={{}}>
                                    <Text style={{ color: 'white' }}>Today</Text>
                                    <Text style={{ color: 'white', fontSize: 12 }}>₹{Math.floor((buyPrice / 1000) * 100) / 100} / mg</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: 12 }}>2%</Text>
                                    <Icon name="arrow-up" type="foundation" size={15} color={'white'} style={{ marginLeft: 4 }} />
                                </View>
                            </View>
                        </View>
                    </View>
                </Pressable>
            </View >
        )
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS !== 'android' ? 'padding' : null} enabled>
            <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
            <View style={{ flex: 1, backgroundColor: '#262726' }}>
                {/* <Header
                    placement="left"
                    centerComponent={{ text: 'My Gold', style: { color: 'white', fontWeight: '900' } }}
                    leftComponent={{
                        icon: 'chevron-left', iconStyle: { marginTop: -3 }, color: 'white', size: 24, onPress: () => {

                        },
                    }}
                    containerStyle={{
                        backgroundColor: 'black',
                        borderBottomColor: 'white',
                        borderBottomWidth: 0,
                    }}
                    backgroundColor="black"
                /> */}
                <View style={{ backgroundColor: 'black', flexDirection: 'row', padding: 5 }}>
                    <Icon name="chevron-left" size={24} color={'white'} style={{ marginTop: -1 }} />
                    <Animated.Text style={{ opacity: frontName, color: 'white', fontWeight: 'bold', fontSize: 15, paddingLeft: 5 }}>My Gold</Animated.Text>
                    <Animated.Text style={{ opacity: backName, color: 'grey', fontWeight: 'bold', fontSize: 15, textAlign: 'center', width: '55%' }}>{selectedGold?.name}</Animated.Text>
                </View>
                {!load ?
                    <ScrollView ref={scrollRef} contentContainerStyle={{ paddingBottom: 60 }}
                        showsVerticalScrollIndicator={false}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: animtedValue } } }],
                            { useNativeDriver: false }
                        )}>
                        <View style={{ backgroundColor: 'black', height: 390, borderBottomLeftRadius: 50, borderBottomRightRadius: 50, zIndex: -1 }} >
                            <View style={{ marginTop: 20, }}>
                                <FlatList
                                    ref={listRef}
                                    data={goldData}
                                    renderItem={render}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}
                                    contentContainerStyle={{ padding: 25 }}
                                    keyExtractor={(item => (item.id))}
                                />
                            </View>
                            <View style={{ marginTop: 27, alignSelf: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>My Gold Balance</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Animated.Image
                                        source={require('../assets/gold_coin.png')}
                                        style={{
                                            width: 30,
                                            height: 30,
                                            transform: [{ rotate: spin }],
                                        }}
                                    />
                                    <Text style={{ color: 'white' }}>{myGoldBalance}mg</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={{ color: '#6E6B6B', alignSelf: 'center', marginTop: 70, fontSize: 12 }}>Choose your value</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: "center", marginHorizontal: 10, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 22, color: '#A1A2A1', }}>₹</Text>
                            <TextInput
                                value={goldAmount}
                                keyboardAppearance="dark"
                                onChangeText={(text) => {
                                    setGoldAmount(text.replace(/[^\d.]/g, ''));
                                    goldConversion(text === '.' ? '0.00' : text.replace(/[^\d.]/g, ''), 'amount')
                                }}
                                keyboardType="numeric"
                                placeholder="0.00"
                                placeholderTextColor={'#A1A2A1'}
                                onEndEditing={() => {
                                    if (/^\d+(\.\d+)?$/.test(goldAmount)) {
                                        setGoldAmount(Number(goldAmount).toFixed(2))
                                    }
                                }}
                                style={{ fontSize: 22, textAlign: 'right', color: '#A1A2A1', fontWeight: '600' }}
                            />
                            <Text style={{ fontSize: 22, color: '#A1A2A1', fontWeight: '600' }}>/</Text>
                            <TextInput
                                value={goldWeight}
                                onChangeText={(text) => {
                                    setGoldWeight(text);
                                    goldConversion(text === '.' ? '0.00' : text.replace(/[^\d.]/g, ''),)
                                }}
                                keyboardType="number-pad"
                                placeholder="0.0"
                                placeholderTextColor={'#A1A2A1'}
                                style={{ fontSize: 22, textAlign: 'left', color: '#A1A2A1', fontWeight: '600' }}
                                onEndEditing={() => {
                                    if (/^\d+(\.\d+)?$/.test(goldWeight)) {
                                        setGoldWeight(Number(goldWeight).toFixed(2))
                                    }
                                }}
                            />
                            <Text style={{ fontSize: 22, color: '#A1A2A1', fontWeight: '600' }}>mg</Text>
                        </View>
                        {/* <Text style={{ color: '#A1A2A1', alignSelf: 'center', marginTop: 10, fontSize: 22, fontWeight: 'bold' }}>₹ 0.00 / 0.0 mg</Text> */}
                        <View style={{ flexDirection: 'row', marginHorizontal: 95, marginTop: 30, justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => {
                                checkout()

                            }}>
                                <View style={{ backgroundColor: '#7B7B7B', height: 85, width: 85, borderRadius: 85 / 2, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>BUY</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                if (goldWeight > myGoldBalance) {
                                    ToastAndroid.show(
                                        'Maximum limit exceeded',
                                        ToastAndroid.LONG,
                                        ToastAndroid.BOTTOM,
                                    )
                                }
                                else {
                                    checkout('sell')
                                }
                            }}>
                                <View style={{ backgroundColor: '#7B7B7B', height: 85, width: 85, borderRadius: 85 / 2, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>SELL</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 40, alignSelf: 'center', }}>
                            <Text style={{ color: '#A1A2A1', fontSize: 12, fontWeight: 'bold' }}>Buying price ₹{Math.floor((buyPrice / 1000) * 100) / 100} / mg<Text style={{ color: '#6E6B6B' }}> (including Tax/GST)</Text></Text>
                        </View>
                    </ScrollView>
                    :
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color={'white'} />
                    </View>
                }
            </View >
        </KeyboardAvoidingView >
    );
};
export default Home;
