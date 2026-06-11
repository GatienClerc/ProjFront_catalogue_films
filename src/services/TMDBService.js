/***********************************************************************************************************************
 * Program name :           TMDBService.js
 * Description :            Axios service to access TheMovieDB API
 * Author :                 Thierry Perroud
 * Creation date :          06.05.2026
 * Modified by :            Thierry Perroud
 * Modification date :      10.06.2026
 * Version :                0.8
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
     * @returns JSON
     */
    getLanguages() {
        return apiClient.get('/configuration/languages')
    },

    /**
     * Returns the list of all movie or TV genres in French
     * Route documentations: https://developer.themoviedb.org/reference/genre-movie-list
     *                       https://developer.themoviedb.org/reference/genre-tv-list
     *
     * @param type Enum("movie", "tv")
     * @returns JSON
     */
    getGenres(type = "movie") {
        if (type !== "movie" && type !== "tv") type = "movie"   // Defaults to movies

        return apiClient.get(`/genre/${type}/list?language=fr`)
    },

    /**
     * Searches and returns a list of movies or TV shows (or both) based on a query
     * Route documentations: https://developer.themoviedb.org/reference/search-movie
     *                       https://developer.themoviedb.org/reference/search-tv
     *                       https://developer.themoviedb.org/reference/search-multi
     *
     * @param type Enum ("movie", "tv", "multi")
     * @param query String containing name filter
     * @param page Integer representing the page number of the returned list (must be 1 or more)
     * @returns JSON
     */
    searchMedia(type = "movie", query, page = 1) {
        if (!query) return JSON.parse('{"error": "A query is mandatory."}')
        if (type !== "movie" && type !== "tv" && type !== "multi") type = "movie"   // Defaults to movies
        if (!page || page < 1) page = 1                                             // Defaults to page 1

        return apiClient.get(`/search/${type}?query=${query}&language=fr&page=${page}`)
    },

    /**
     * Filters the movie DB and returns a filtered movies or TV shows list
     * Route documentations: https://developer.themoviedb.org/reference/discover-movie
     *                       https://developer.themoviedb.org/reference/discover-tv
     *
     * @param type Enum ("movie", "tv")
     * @param filters JSON with name and value of each filter
     * @param page Integer representing the page number of the returned list (must be 1 or more)
     * @returns JSON
     */
    filterMedia(type = "movie", filters, page = 1) {
        if (type !== "movie" && type !== "tv") type = "movie"   // Defaults to movies
        if (!page || page < 1) page = 1                         // Defaults to page 1
        let url = `/discover/${type}?language=fr&page=${page}`

        // Adds all the params to the URL
        if (filters) for (let filter in filters) url += `&${filter.name}=${filter.value}`

        return apiClient.get(url)
    },

    /**
     * Returns a list of cast members for the movie or TV show
     * Route documentations: https://developer.themoviedb.org/reference/movie-credits
     *                       https://developer.themoviedb.org/reference/tv-series-credits
     *
     * @param type Enum("movie", "tv")
     * @param mediaId Integer representing the ID of the movie or TV show (must be 0 or more)
     * @returns JSON
     */
    getMediaCredits(type = "movie", mediaId) {
        if (mediaId === null || mediaId < 0) return JSON.parse('{"error": "Invalid media ID."}')
        if (type !== "movie" && type !== "tv") type = "movie"   // Defaults to movies

        return apiClient.get(`/${type}/${mediaId}/credits`)
    },

    /**
     * Returns the details of a specific movie or TV show based on its ID
     * Route documentations: https://developer.themoviedb.org/reference/movie-details
     *                       https://developer.themoviedb.org/reference/tv-series-details
     *
     * @param type Enum("movie", "tv")
     * @param mediaId Integer representing the ID of the movie or TV show (must be 0 or more)
     * @param season Integer representing a TV show's season number (must be 1 or more)
     * @returns JSON
     */
    getMediaDetails(type = "movie", mediaId, season = 1) {
        if (mediaId === null || mediaId < 0) return JSON.parse('{"error": "Invalid media ID"}')
        if (type !== "movie" && type !== "tv") type = "movie"   // Defaults to movies
        let url = `/${type}/${mediaId}`

        if (type === "tv") {
            // Defaults to season 1 if no season number is given, or if lower than 1
            if (!season || season < 1) season = 1
            url += `/season/${season}`
        }

        // Defaults to French
        url += `?language=fr`

        return apiClient.get(url)
    },

    /**
     * Returns a list of trending movie, TV shows and people based on the current day or current week
     * Route documentation: https://developer.themoviedb.org/reference/trending-all
     *
     * @param time Enum("day", "week")
     * @returns JSON
     */
    getTrendingMedias(time = "day") {
        if (time !== "day" && time !== "week") time = "day"

        return apiClient.get(`/trending/all/${time}`)
    },

    /**
     * Returns a list of movies that are currently in theatre
     * Route documentation: https://developer.themoviedb.org/reference/movie-now-playing-list
     *
     * @returns JSON
     */
    getMoviesInTheatre() {
        return apiClient.get(`/movie/now_playing`)
    },

    /**
     * Returns a list of TV shows that are airing today
     *
     * @returns JSON
     */
    getShowsAiringToday() {
        return apiClient.get(`/tv/airing_today`)
    },

    /**
     * Returns the TMDB account details
     * Route documentations: https://developer.themoviedb.org/reference/account-details
     *                       https://developer.themoviedb.org/docs/authentication-application (for bearer token only auth)
     *
     * @returns JSON
     */
    getAccountDetails() {
      return apiClient.get(`/account`)
    },

    /**
     * Adds/removes a movie or TV serie from favorites
     * Route documentation : https://developer.themoviedb.org/reference/account-add-favorite
     *
     * @param accountId Integer representing the ID of the account (must be 0 or more)
     * @param type Enum("movie", "tv")
     * @param mediaId Integer representing the ID of the movie or TV show (must be 0 or more)
     * @param choice Boolean
     * @returns JSON
     */
    manageFavorites(accountId, type = "movie", mediaId, choice = true) {
        return apiClient.post(
            `/account/${accountId}/favorite`,
            {
                media_type: type,
                media_id: mediaId,
                favorite: choice
            }
        )
    },

    /**
     * Returns whether or not a media is favorited, rated and added to the watchlist
     * Route documentations: https://developer.themoviedb.org/reference/movie-account-states
     *                       https://developer.themoviedb.org/reference/tv-series-account-states
     *
     * @param type Enum("movie", "tv")
     * @param mediaId Integer representing the ID of the movie or TV show (must be 0 or more)
     * @returns JSON
     */
    mediaAccountStates(type = "movie", mediaId) {
        return apiClient.get(`/${type}/${mediaId}/account_states`)
    },

    /**
     * Returns the list of favorited movies or TV shows
     * Route documentations: https://developer.themoviedb.org/reference/account-get-favorites
     *                       https://developer.themoviedb.org/reference/account-favorite-tv
     *
     * @param accountId Integer representing the ID of the account (must be 0 or more)
     * @param type Enum("movies", "tv")
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getFavoriteMedia(accountId, type = "movies") {
        return apiClient.get(`/account/${accountId}/favorite/${type}`)
    },

    /**
     * return the videos linked to the media
     * Route documentations: https://developer.themoviedb.org/reference/tv-series-videos
     *                       https://developer.themoviedb.org/reference/movie-videos
     *
     * @param type Enum("movie", "tv")
     * @param mediaId Integer representing the ID of the movie or TV show (must be 0 or more)
     * @returns {Promise<axios.AxiosResponse<any>>|any}
     */
    getVideos(type = "movie", mediaId) {
        if (mediaId === null || mediaId < 0) return JSON.parse('{"error": "Invalid media ID."}')
        if (type !== "movie" && type !== "tv") type = "movie"   // Defaults to movies

        return apiClient.get(`/${type}/${mediaId}/videos`)
    }
}