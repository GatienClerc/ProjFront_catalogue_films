import { defineStore } from 'pinia'
import TMDBService from '@/services/TMDBService'

export const useMovieStore = defineStore('movies', {
    state: () => ({
        movies: [],
        loading: false
    }),

    actions: {
        async searchMovies(query) {
            if (!query || !query.trim()) {
                this.movies = []
                return
            }

            this.loading = true

            try {
                const response = await TMDBService.searchMovies(query)
                this.movies = response.data.results ?? []
            } catch (error) {
                console.error('Erreur TMDB:', error)
                this.movies = []
            } finally {
                this.loading = false
            }
        }
    }
})
