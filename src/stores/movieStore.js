import { defineStore } from 'pinia'
import TMDBService from '@/services/TMDBService'

export const useMovieStore = defineStore('movies', {
    state: () => ({
        search_movies: [],
        search_loading: false,

        trending: {},
        trending_loading: false,
        trending_banner: "",

        in_theater: {},
        in_theater_loading: false
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
        async getTrendingMedias(){
            this.trending_loading = true

            const response = await TMDBService.getTrendingMedias()
            this.trending = response.data.results

            // get random image for the banner
            const random_index = Math.floor(Math.random() * this.trending.length)
            const image_base_path = "https://media.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)"
            this.trending_banner = image_base_path+this.trending[random_index].backdrop_path

            this.trending_loading = false
        },
        async getMoviesInTheatre() {
            this.in_theater_loading = true

            const response = await TMDBService.getMoviesInTheatre()
            this.in_theater = response.data.results

            this.in_theater_loading = false
        }
    }
})
