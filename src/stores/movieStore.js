import { defineStore } from 'pinia'
import TMDBService from '@/services/TMDBService'
import { useHistoryStore } from "@/stores/historyStore.js";

const banner_image_path = "https://media.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)"
const poster_image_path = "https://media.themoviedb.org/t/p/w220_and_h330_face/"

import placeholder_poster from '@/assets/placeholder_poster.webp'
import placeholder_episode from '@/assets/placeholder_episode.webp'
import placeholder_actor from '@/assets/placeholder_actor.webp'

/**
* Check if the image exists, and if not, use a generic image.
* */
function getImage(path, base, fallback) {
    if (!path || path === "null") return fallback
    return base + path
}

const sort = {
    tv : {
        date : "first_air_date",
        name : "name",
        popularity : "popularity",
        note : "vote_average"
    },
    movie : {
        date : "primary_release_date",
        name : "title",
        popularity : "popularity",
        note : "vote_average"
    }
}

export const useMovieStore = defineStore('movies', {
    state: () => ({
        search_movies: [],
        search_loading: true,

        trending: [],
        trending_loading: true,
        trending_banner: "",

        in_theater: [],
        in_theater_loading: true,

        media: {},
        isFavorite: false,
        trailer_link: "",
        director: {},
        actors: [],
        episodes: [],
        media_loading: true,

        type: "movie",
        genres: [],
        date: "",
        gte_lte: "after",
        duration: [0,400],
        note: [0,10],
        checkAdult: false,

        medias_results: [],
        medias_loading: true,

        accountId: -1,

        history: [],
        historyLoading: true,

        favoriteMovies: [],
        favoriteShows: [],
        favoritesLoading: true
    }),

    actions: {
        /**
         * search medias
         * @param type if it movie or series
         * @param query search text field
         * @returns {Promise<void>}
         */
        async searchMedia(type, query) {
            if (!query || !query.trim()) {
                this.search_movies = []
                return
            }

            if (type !== "movie" || type !== "tv") {
                type = "multi"
            }

            this.search_loading = true

            try {
                const response = await TMDBService.searchMedia(type, query)
                this.search_movies = response.data.results
            } catch (error) {
                console.error('Erreur TMDB:', error)
                this.search_movies = []
            } finally {
                this.search_loading = false
            }
        },
        /**
         * getTrendingMedias get trending medias and format them into a list and get a banner image
         * @returns {Promise<void>}
         */
        async getTrendingMedias(){
            this.trending_loading = true

            const response = await TMDBService.getTrendingMedias()
            this.trending = []
            for (let i = 0; i < response.data.results.length; i++) {
                const media = response.data.results[i]
                this.trending.push({
                    link: {
                        name: 'display',
                        params: { id: media.id },
                        query: { type: media.media_type, title: media.name || media.title }
                    },
                    title: media.name || media.title,
                    info: media.first_air_date || media.release_date,
                    img: getImage(media.poster_path, poster_image_path, placeholder_poster)})
            }

            // get random image for the banner
            const random_index = Math.floor(Math.random() * response.data.results.length)
            this.trending_banner = banner_image_path+response.data.results[random_index].backdrop_path

            this.trending_loading = false
        },
        /**
         * getMoviesInTheatre get movies in theater and format them into a list
         * @returns {Promise<void>}
         */
        async getMoviesInTheatre() {
            this.in_theater_loading = true

            const response = await TMDBService.getMoviesInTheatre()
            this.in_theater = []
            for (let i = 0; i < response.data.results.length; i++) {
                const media = response.data.results[i]
                this.in_theater.push({
                    link: {
                        name: 'display',
                        params: { id: media.id },
                        query: { type: "movie", title: media.name || media.title }
                    },
                    title: media.name || media.title,
                    info: media.first_air_date || media.release_date,
                    img: getImage(media.poster_path, poster_image_path, placeholder_poster)})
            }

            this.in_theater_loading = false
        },

        /**
         * getMediaById get a media by it's id
         * @param id the id of the media
         * @param type the type of the media (film or tv)
         * @returns {Promise<void>}
         */
        async getMediaById(id, type, name){
            this.media_loading = true

            this.media = {}
            this.trailer_link = ""
            this.actors = []
            this.director = {}
            // details
            {
                const response = await TMDBService.getMediaDetails(type, id)
                this.media = response.data
                if (type === "tv") {
                    this.episodes = []
                    for (let i = 0; i < response.data.episodes.length; i++) {
                        const episode = response.data.episodes[i]
                        this.episodes.push({
                            link: {
                                name: 'display',
                                params: { id: id },
                                query: { type: type, title: name }
                            },
                            title: episode.episode_number+". "+episode.name,
                            info: episode.air_date,
                            img: getImage(
                                episode.still_path,
                                "https://media.themoviedb.org/t/p/w227_and_h127_face/",
                                placeholder_episode
                            )

                        })
                    }
                }
            }
            // trailer
            {
                const response = await TMDBService.getVideos(type, id)
                for (let i = 0; i < response.data.results.length; i++) {
                    const video = response.data.results[i]
                    if (video.type === "Trailer") {
                        this.trailer_link = "https://www.youtube.com/watch?v="+video.key
                        break
                    }
                }
            }
            // credit
            {
                const response = await TMDBService.getMediaCredits(type, id)
                this.director = response.data.crew[0]
                for (let i = 0; i < response.data.cast.length; i++) {
                    const actor = response.data.cast[i]
                    this.actors.push({
                        link: {
                            name: 'display',
                            params: { id: id },
                            query: { type: type, title: name }
                        },
                        title: actor.name,
                        info: actor.character,
                        img: getImage(
                            actor.profile_path,
                            "https://media.themoviedb.org/t/p/w138_and_h175_face/",
                            placeholder_actor
                        )
                    })
                }
            }
            this.media_loading = false
        },

        /**
         * Fetches the user's account ID through the Axios API service.
         *
         * @returns {Promise<void>}
         */
        async getAccountId() {
            this.accountId = -1

            let accountDetails = await TMDBService.getAccountDetails()
            this.accountId = accountDetails.data.id
        },

        /**
         * Fetches the history stored in the browser's LocalStorage through the historyStore Pinia store and the Axios
         * API service
         *
         * @returns {Promise<void>}
         */
        async getHistory() {
            this.historyLoading = true

            if (this.history.length > 0) this.history = []
            let historyData = await useHistoryStore().items
            let response = []

            if (!historyData.length) return

            for (let i = 0; i < historyData.length; i++) {
                let media = await TMDBService.getMediaDetails(historyData[i].type, historyData[i].id)
                response.push(media)
            }

            for (let i = 0; i < response.length; i++) {
                const media = response[i].data
                this.history.push({
                    link: {
                        name: 'display',
                        params: { id: historyData[i].id },
                        query: { type: historyData[i].type, title: historyData[i].title }
                    },
                    title: historyData[i].title,
                    info: media.air_date || media.release_date,
                    img: poster_image_path + media.poster_path
                })
            }

            this.historyLoading = false
        },

        /**
         * Fetches both the favorited movies of the user and the favorited TV shows of the user through the Axios API
         * service.
         *
         * @returns {Promise<void>}
         */
        async getFavorites() {
            this.favoritesLoading = true

            if (this.favoriteMovies.length > 0) this.favoriteMovies = []
            if (this.favoriteShows.length > 0) this.favoriteShows = []

            let favoriteMoviesList = await TMDBService.getFavoriteMedia(this.accountId, "movies")
            let favoriteShowsList = await TMDBService.getFavoriteMedia(this.accountId, "tv")

            for (let i = 0; i < favoriteMoviesList.data.results.length; i++) {
                let movie = favoriteMoviesList.data.results[i]
                this.favoriteMovies.push({
                    link: {
                        name: 'display',
                        params: { id: movie.id },
                        query: { type: "movie", title: movie.name || movie.title }
                    },
                    title: movie.name || movie.title,
                    info: movie.first_air_date || movie.release_date,
                    img: poster_image_path + movie.poster_path
                })
            }

            for (let i = 0; i < favoriteShowsList.data.results.length; i++) {
                let show = favoriteShowsList.data.results[i]
                this.favoriteShows.push({
                    link: {
                        name: 'display',
                        params: { id: show.id },
                        query: { type: "tv", title: show.name || show.title }
                    },
                    title: show.name || show.title,
                    info: show.first_air_date || show.release_date,
                    img: poster_image_path + show.poster_path
                })
            }

            this.favoritesLoading = false
        },

        /**
         * Checks if the designated media is favorited by the user or not
         *
         * @param type Enum("movie", "tv")
         * @param mediaId Integer representing the ID of the movie or TV show (must be 0 or more)
         * @returns {Promise<void>}
         */
        async checkFavorite(type = "movie", mediaId) {
            this.isFavorite = false

            let response = await TMDBService.mediaAccountStates(type, mediaId)
            this.isFavorite = response.data.favorite
        },

        /**
         * get genre by type
         * @param type the type of medias
         * @returns {Promise<void>}
         */
        async fetchGenres(type) {
            try {
                const res = await TMDBService.getGenres(type)
                this.genres = res.data.genres
            } catch (error) {
                console.error(error)
            }
        },
        /**
         * search media with filter and sort
         * @param filters the filter param
         * @returns {Promise<void>}
         */
        async fetchMedias(filters) {
            this.medias_loading = true

            this.medias_results = []
            const filter = []

            if (filters.date) {
                if (filters.type === "tv") {
                    if (filters.gte_lte === "after") {
                        filter.push(`first_air_date.gte=${filters.date}`);
                    } else {
                        filter.push(`first_air_date.lte=${filters.date}`);
                    }
                } else {
                    if (filters.gte_lte === "after") {
                        filter.push(`primary_release_date.gte=${filters.date}`);
                    } else {
                        filter.push(`primary_release_date.lte=${filters.date}`);
                    }
                }
            }

            if (filters.genres?.length) {
                filter.push(`with_genres=${filters.genres.join(",")}`);
            }

            filter.push(`include_adult=${filters.checkAdult}`);

            filter.push(`vote_average.gte=${filters.note[0]}`);
            filter.push(`vote_average.lte=${filters.note[1]}`);

            filter.push(`with_runtime.gte=${filters.duration[0]}`);
            filter.push(`with_runtime.lte=${filters.duration[1]}`);

            const asc_desc = filters.asc ? ".asc" : ".desc";

            filter.push(`sort_by=${sort[filters.type][filters.sort_by]+asc_desc}`)

            const response = await TMDBService.filterMedia(filters.type, filter, filters.page);
            for (let i = 0; i < response.data.results.length; i++) {
                const media = response.data.results[i]
                this.medias_results.push({
                    link: {
                        name: 'display',
                        params: { id: media.id },
                        query: { type: "movie", title: media.name || media.title }
                    },
                    title: media.name || media.title,
                    info: media.first_air_date || media.release_date,
                    img:getImage(media.poster_path, poster_image_path, placeholder_poster)})
            }

            this.medias_loading = false
        }
    }
})
