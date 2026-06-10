import { defineStore } from 'pinia'
import TMDBService from '@/services/TMDBService'
import { useHistoryStore } from "@/stores/historyStore.js";

const banner_image_path = "https://media.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)"
const poster_image_path = "https://media.themoviedb.org/t/p/w220_and_h330_face/"

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

        accountId: -1,

        history: [],
        historyLoading: true,

        favoriteMovies: [],
        favoriteShows: [],
        favoritesLoading: true
    }),

    actions: {
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
                    img:poster_image_path+media.poster_path})
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
                    img:poster_image_path+media.poster_path})
            }

            this.in_theater_loading = false
        },

        /**
         * getMediaById get a media by it's id
         * @param id the id of the media
         * @param type the type of the media (film or tv)
         * @returns {Promise<void>}
         */
        async getMediaById(id, type){
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
                            link: "",
                            title: episode.episode_number+". "+episode.name,
                            info: episode.air_date,
                            img:"https://media.themoviedb.org/t/p/w227_and_h127_face/"+episode.still_path
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
                        link: "",
                        title: actor.name,
                        info: actor.character,
                        img:"https://media.themoviedb.org/t/p/w138_and_h175_face/"+actor.profile_path
                        })
                }
            }
            this.media_loading = false
        },

        async getAccountId() {
            this.accountId = -1

            let accountDetails = await TMDBService.getAccountDetails()
            this.accountId = accountDetails.data.id
        },

        /**
         * Fetches the history stored in the browser's LocalStorage through the historyStore Pinia store and the Axios
         * API service
         *
         * @returns JSON
         */
        async getHistory() {
            this.historyLoading = true

            if (this.history.length > 0) this.history = []
            let historyData = await useHistoryStore().items
            let response = []

            if (!historyData.length) return

            for (let i = 0; i < historyData.length; i++) {
                let media = await TMDBService.getMediaDetails(historyData[i].type, historyData[i].id)
                console.log(media)
                response.push(media)
            }

            for (let i = 0; i < response.length; i++) {
                const media = response[i].data
                console.log(media)
                this.history.push({
                    link: {
                        name: 'display',
                        params: { id: media.id },
                        query: { type: media.media_type, title: media.name || media.title }
                    },
                    title: media.name || media.title,
                    info: media.first_air_date || media.release_date,
                    img: poster_image_path + media.poster_path
                })
            }

            this.historyLoading = false
        },

        async getFavorites(type = "movies") {
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

        async checkFavorite(type = "movie", mediaId) {
            this.isFavorite = false

            let response = await TMDBService.isMediaFavorite(type, mediaId)
            this.isFavorite = response.data.favorite
        }
    }
})
