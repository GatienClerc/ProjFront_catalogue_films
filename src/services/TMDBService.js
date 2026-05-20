/***********************************************************************************************************************
 * Program name :           TMDBService.js
 * Description :            Axios service to access TheMovieDB API
 * Author :                 Thierry Perroud
 * Creation date :          06.05.2026
 * Modified by :            Thierry Perroud
 * Modification date :      20.05.2026
 * Version :                0.3
 **********************************************************************************************************************/
/***********************************************************************************************************************
 * Imports
 **********************************************************************************************************************/
import axios from 'axios'

/***********************************************************************************************************************
 * API connexion
 **********************************************************************************************************************/
const apiClient = axios.create({
    baseURL: '/tmdb/3/',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
    }
})

/***********************************************************************************************************************
 * Functions
 **********************************************************************************************************************/
export default {
    /**
     * Returns the list of all supported languages
     * Route documentation: https://developer.themoviedb.org/reference/configuration-languages
     *
     * @returns The list of all supported languages
     */
    getLanguages() {
        return apiClient.get('/configuration/languages')
    },

    /**
     * Returns the list of all movie or TV genres in French
     * Route documentations: https://developer.themoviedb.org/reference/genre-movie-list
     *                       https://developer.themoviedb.org/reference/genre-tv-list
     *
     * @param type Enum(movie, tv)
     * @returns The list of all movie genres in French
     */
    getGenres(type) {
        return apiClient.get(`/genre/${type}/list?language=fr`)
    },

    /**
     * Searches and returns a list of movies or TV shows (or both) based on a query
     * Route documentations: https://developer.themoviedb.org/reference/search-movie
     *                       https://developer.themoviedb.org/reference/search-tv
     *                       https://developer.themoviedb.org/reference/search-multi
     *
     * @param type Enum (movie, tv, multi)
     * @param query String containing name filter
     * @returns A list of movies based on a query
     */
    searchMedia(type, query) {
        // A query is mandatory
        if (!query) return

        return apiClient.get(`/search/${type}?query=${query}&language=fr`)
    },

    /**
     * Filters the movie DB and returns a filtered movies or TV shows list
     * Route documentations: https://developer.themoviedb.org/reference/discover-movie
     *                       https://developer.themoviedb.org/reference/discover-tv
     *
     * @param type Enum (movie, tv)
     * @param params JSON with name and value of each params
     * @returns A filtered movie list
     */
    filterMedia(type, params) {
        let url = `/discover/${type}?language=fr`

        // Adds all the params to the URL
        for (let param in params) url += `&${param.name}=${param.value}`

        return apiClient.get(url)
    }
}