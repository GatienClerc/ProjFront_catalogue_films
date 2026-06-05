import { defineStore } from 'pinia'
import TMDBService from '@/services/TMDBService'

const banner_image_path = "https://media.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)"
const poster_image_path = "https://media.themoviedb.org/t/p/w220_and_h330_face/"

export const useMovieStore = defineStore('movies', {
    state: () => ({
        search_movies: [],
        search_loading: false,

        trending: [],
        trending_loading: false,
        trending_banner: "",

        in_theater: [],
        in_theater_loading: false,

        filtered: [],
        filtered_loading: false,
        genres: [],
        currentType: 'movie'
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
         * get trending medias and format them into a list and get a banner image
         * @returns {Promise<void>}
         */
        async getTrendingMedias(){
            this.trending_loading = true

            const response = await TMDBService.getTrendingMedias()
            for (let i = 0; i < response.data.results.length; i++) {
                const media = response.data.results[i]
                this.trending.push({
                    link: "/display/"+media.id,
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
         * get movies in theater and format them into a list
         * @returns {Promise<void>}
         */
        async getMoviesInTheatre() {
            this.in_theater_loading = true

            const response = await TMDBService.getMoviesInTheatre()

            for (let i = 0; i < response.data.results.length; i++) {
                const media = response.data.results[i]
                this.in_theater.push({
                    link: "/display/"+media.id,
                    title: media.name || media.title,
                    info: media.first_air_date || media.release_date,
                    img:poster_image_path+media.poster_path})
            }

            this.in_theater_loading = false
        },

        /**
         * get movies genre
         * @returns {Promise<void>}
         */
        async getGenres(type) {
            try {
                const response = await TMDBService.getGenres(type)
                this.genres = response.data.genres
                this.currentType = type
            } catch (error) {
                console.error(error)
                this.genres = []
            }
        },

        /**
         * get movies genre
         * @returns {Promise<void>}
         */
        async filterMedia(filters) {
            this.filtered_loading = true

            try {
                const response = await TMDBService.filterMedia(this.currentType, filters)
                this.filtered = response.data.results
            } catch (error) {
                console.error(error)
                this.filtered = []
            } finally {
                this.filtered_loading = false
            }
        }
    }
})
