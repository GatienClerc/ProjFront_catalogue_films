import { defineStore } from 'pinia'
import TMDBService from '@/services/TMDBService'

export const useMovieStore = defineStore('movies', {
    state: () => ({
        search_movies: [],
        search_loading: false,

        trending: {},
        trending_loading: false,

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

            this.loading = true

            try {
                const response = await TMDBService.searchMedia(type, query)
                this.search_movies = response.data.results
            } catch (error) {
                console.error('Erreur TMDB:', error)
                this.search_movies = []
            } finally {
                this.loading = false
            }
        },
        async getTrendingMedias(){
            this.trending_loading = true
            const response = await TMDBService.getTrendingMedias()
            this.trending = response.data.results
            this.trending_loading = true
        },
        async getMoviesInTheatre() {
            this.in_theater_loading = true
            const response = await TMDBService.getMoviesInTheatre()
            this.in_theater = response.data.results
            this.in_theater_loading = true
        }
    }
})
