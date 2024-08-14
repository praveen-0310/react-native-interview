/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-quotes */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
// components/MovieList.js
import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Dimensions, Image, RefreshControl, Pressable, TouchableOpacity, StatusBar } from 'react-native';
import { getMovies, imageUrl } from '../services/apiService';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from '@rneui/base';

const PopularMovieList = () => {

    const navigation = useNavigation();
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(true);
    const [search, setSearch] = useState(null)
    const [refreshState, setRefreshState] = useState(false)

    // function for fetch the data
    const fetchMovies = async () => {
        try {
            const newMovies = await getMovies(page);
            if (!search) {
                setMovies([...movies, ...newMovies]);
            }
            else {
                const filter = newMovies?.filter(movie => movie?.title?.toLowerCase()?.includes(search?.toLowerCase()));
                setMovies(filter)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoad(false);
            setRefreshState(false);
            setLoading(false);
        }
    };

    // useEffect to call searchText value
    useEffect(() => {
        if (search === '' || (search?.trim() !== '')) {
            setLoad(true)
            const searchDebounceFunction = setTimeout(() => {
                fetchMovies();
            }, 1000);
            return () => clearTimeout(searchDebounceFunction);
        }
    }, [search]);

    // useEffect for fetch movie
    useEffect(() => {
        fetchMovies();
    }, [page]);

    //useEffect for fetch movie
    const loadMoreMovies = () => {
        setPage(page + 1);
    };

    //function for render footer
    const renderFooter = () => {
        return loading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={'white'} />
            </View>
        ) : null;
    };
    // function for onrefresh
    const onRefresh = () => {
        setPage(1);
        setRefreshState(true);
        setSearch(null);
    }
    // function for list empty component
    const ListEmpty = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontWeight: '700', fontSize: 15 }}>No movies found</Text>
            </View>
        )
    }
    //function for render the list
    const render = ({ item, index }) => (
        <View key={index} style={{ borderWidth: 1, flex: 0.5, marginTop: 10, marginHorizontal: 5, }}>
            <TouchableOpacity onPress={() => { navigation.navigate('movieDetail', { movieData: item }) }}>
                <View style={{ height: 200, borderWidth: 0.5, borderRadius: 10 }}>
                    <Image source={{ uri: imageUrl(item?.backdrop_path) }} resizeMode='cover' style={{ height: 150, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: '900', fontSize: 14, textAlign: 'center' }}>{item.title}</Text>
                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 13 }}>{item.release_date.split('-')[0]}</Text>
                        {/* <Text numberOfLines={2} style={{ color: 'white', fontSize: 12, fontWeight: '500' }}>{item.overview}</Text> */}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <StatusBar backgroundColor={'black'} barStyle={"light-content"} />
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <SearchBar
                    onChangeText={(text) => {
                        setSearch(text);
                    }}
                    placeholder='Search by popular movies'
                    value={search}
                    containerStyle={{ backgroundColor: 'black' }}
                    style={{ borderRadius: 20 }}
                />
                {!load ? <FlatList
                    data={movies}
                    numColumns={2}
                    renderItem={render}
                    scrollEnabled={true}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={() => {
                        if (movies?.length > 0) {
                            loadMoreMovies();
                            setLoading(true);
                        }
                    }}
                    contentContainerStyle={{ paddingBottom: 30, flex: movies?.length === 0 ? 1 : null }}
                    refreshControl={
                        <RefreshControl refreshing={refreshState} onRefresh={onRefresh} />
                    }
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<ListEmpty />}

                />
                    : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" />
                    </View>}
            </View>
        </KeyboardAvoidingView>
    );
};
export default PopularMovieList;



