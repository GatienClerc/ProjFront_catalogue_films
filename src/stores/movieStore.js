import { defineStore } from 'pinia'
import TMDBService from '@/services/TMDBService'

const banner_image_path = "https://media.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)"
const poster_image_path = "https://media.themoviedb.org/t/p/w220_and_h330_face/"

import mock_default_fl from '@/assets/mock_default_fl.webp'
import mock_default_ep from '@/assets/mock_default_ep.webp'
import mock_default_ac from '@/assets/mock_default_ac.webp'

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
        medias_loading: true
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
                    img: getImage(media.poster_path, poster_image_path, mock_default_fl)})
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
                    img: getImage(media.poster_path, poster_image_path, mock_default_fl)})
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
                                mock_default_ep
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
                            mock_default_ac
                        )
                    })
                }
            }
            this.media_loading = false
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

            console.log(filters.sort_by);

            filter.push(`sort_by=${sort[filters.type][filters.sort_by]+asc_desc}`)

            console.log(filter);

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
                    img:getImage(media.poster_path, poster_image_path, mock_default_fl)})
            }
            console.log(this.medias_results)

            this.medias_loading = false
        }
    }
})
