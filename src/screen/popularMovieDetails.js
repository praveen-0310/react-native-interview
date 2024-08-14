/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { imageUrl } from "../services/apiService";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "react-native";
const PopularMovieDetail = (props) => {
    // Variable holds the navigation
    const navigation = useNavigation();
    // Variable to store intial load
    const [load, setLoad] = useState(true);
    // useEffect which is used for false the initial load
    useEffect(() => {
        setTimeout(() => {
            setLoad(false);
        }, 2000);
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <StatusBar backgroundColor={'black'} barStyle={"light-content"} />
            {!load ?
                <View style={{ flex: 1 }}>
                    <View style={{ position: 'absolute', zIndex: 2, alignSelf: 'flex-end', flexDirection: 'row' }}>
                        <Icon name="fit-to-screen-outline" type="material-community" size={22} color={'white'} style={{
                            marginRight: 15, marginTop: 5,
                        }} />
                        <Icon name="close" type="antdesign" size={20} color={'white'} style={{
                            marginRight: 5, marginTop: 5,
                        }}
                            onPress={() => { navigation.goBack(); }} />

                    </View>
                    <View style={{ position: 'absolute', marginTop: 100, zIndex: 2, alignSelf: "center" }}>
                        <Icon name="playcircleo" type="antdesign" size={35} color={'white'} style={{
                            marginRight: 5, marginTop: 5,
                        }} />
                    </View>
                    <Image source={{ uri: imageUrl(props?.route?.params?.movieData?.backdrop_path) }} height={250} />
                    <View style={{ marginHorizontal: 5 }}>
                        < Text style={{ fontWeight: '700', fontSize: 15, color: 'white' }}>{props?.route?.params?.movieData?.title}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                            <Text style={{ color: 'green', fontWeight: 'bold' }}>95% match <Text style={{ color: 'white', fontWeight: 400 }}>{props?.route?.params?.movieData?.release_date.split('-')[0]}</Text></Text>
                            <Icon name="dolby" type="material-community" size={20} color={'#494545'} style={{ marginLeft: 4 }} />
                            <Icon name="hd" type="material" size={20} color={'#494545'} />
                            <Icon name="subtitles-outline" type="material-community" size={20} color={'#494545'} style={{ marginLeft: 4 }} />
                        </View>
                        <View style={{ backgroundColor: "white", padding: 8, marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: "center" }}>
                                <Icon name="play" type="font-awesome" size={17} style={{ marginRight: 10 }} />
                                <Text style={{ color: 'black', fontWeight: '900', }}>Play</Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: "#2d2d2d", padding: 8, marginTop: 8 }}>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: "center" }}>
                                <Icon name="download" type="octicon" size={17} color={'white'} style={{ marginRight: 10 }} />
                                <Text style={{ color: 'white', fontWeight: '900', }}>Download</Text>
                            </View>
                        </View>
                        < Text style={{ fontWeight: '500', fontSize: 12, marginTop: 10, color: 'white' }}>{props?.route?.params?.movieData?.overview}</Text>
                        <Text style={{ fontSize: 11, fontWeight: 500 }}>Cast: Manav kaul,Tilotama Shoma,Subhrajyoli Barat...more</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, width: 300, paddingHorizontal: 10, justifyContent: 'space-between' }}>
                        <View>
                            <Icon name="plus" type="ant-design" size={25} color={'white'} />
                            <Text style={{ fontSize: 12, fontWeight: "700", color: 'white' }}>My List</Text>
                        </View>
                        <View>
                            <Icon name="like2" type="ant-design" size={25} color={'white'} />
                            <Text style={{ fontSize: 12, color: 'white', fontWeight: "700" }}>Rate</Text>
                        </View>
                        <View >
                            <Icon name="send" type="feather" size={25} color={'white'} />
                            <Text style={{ fontSize: 12, color: 'white', fontWeight: "700" }}>Share</Text>
                        </View>
                        <Icon />
                    </View>
                </View>
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            }
        </View >
    );
};
export default PopularMovieDetail;