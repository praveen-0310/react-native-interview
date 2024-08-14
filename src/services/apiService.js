/* eslint-disable prettier/prettier */
// services/api.js
import axios from 'axios';

const API_KEY = 'ffa9722f3c9c4f1594279941d445512c';
const BASE_URL = 'https://api.themoviedb.org/3';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmE5NzIyZjNjOWM0ZjE1OTQyNzk5NDFkNDQ1NTEyYyIsIm5iZiI6MTcyMzU1MDAyNC42MDE5NjQsInN1YiI6IjY2YmI0MzM2ZjM1MWQyMzQxMzNmMTFiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUrUe_UGlKepy8dU7RyipITDHsFwjq6aN2eohjjpNfY';

export const getMovies = async (page = 1) => {
  try {
    const response = await axios.get('https://try.readme.io/https://api.themoviedb.org/3/movie/popular', {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        authority: 'try.readme.io',
        Origin: 'https://developer.themoviedb.org',
        accept: 'application/json',
      },
      params: {
        // api_key: API_KEY,
        language: 'en-US',
        page: page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.log(error?.response);
    throw error;
  }
};
export const imageUrl = path => path ? `https://image.tmdb.org/t/p/w500/${path}` : null;
