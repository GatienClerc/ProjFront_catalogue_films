import { defineStore } from 'pinia'
import TMDBService from '@/services/TMDBService'

export const useMovieStore = defineStore('movies', {
    state: () => ({
        movies: [],
        loading: false,

        mock: [
            {
                id: 0,
                title: "Titre1",
                info: "01.01.2000",
                img: 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'
            },
            {
                id: 0,
                title: "Titre2",
                info: "01.01.2000",
                img: 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'
            },
            {
                id: 0,
                title: "Titre3",
                info: "01.01.2000",
                img: 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'
            },
            {
                id: 0,
                title: "Titre4",
                info: "01.01.2000",
                img: 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'
            },
            {
                id: 0,
                title: "Titre5",
                info: "01.01.2000",
                img: 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'
            },
            {
                id: 0,
                title: "Titre6",
                info: "01.01.2000",
                img: 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'
            },
            {
                id: 0,
                title: "Titre7",
                info: "01.01.2000",
                img: 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'
            },
            {
                id: 0,
                title: "Titre8",
                info: "01.01.2000",
                img: 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'
            },
            {
                id: 0,
                title: "Titre9",
                info: "01.01.2000",
                img: 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'
            },
        ]
    }),

    actions: {
        async searchMedia(type, query) {
            if (!query || !query.trim()) {
                this.movies = []
                return
            }

            if (type !== "movie" || type !== "tv") {
                type = "multi"
            }

            this.loading = true

            try {
                const response = await TMDBService.searchMedia(type, query)
                this.movies = response.data.results
            } catch (error) {
                console.error('Erreur TMDB:', error)
                this.movies = []
            } finally {
                this.loading = false
            }
        }
    }
})
