import { defineStore } from 'pinia'

export const useMockMovieStore = defineStore('mockMovies', {
    state: () => ({
        movies: [
            {
                id: 1,
                title: "Film 1",
                info: "01.01.2000",
                img: "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
            },
            {
                id: 2,
                title: "Film 2",
                info: "2005",
                img: "https://media.themoviedb.org/t/p/w227_and_h127_face/6SGsPDrZlNoMz1QLMEvkJHcksGg.jpg"
            },
            {
                id: 3,
                title: "Acteur",
                info: "Rôle",
                img: "https://media.themoviedb.org/t/p/w138_and_h175_face/6CkZLwEJxfqqcJHyeXegMAvOlPh.jpg"
            },
            {
                id: 4,
                title: "Film 4",
                info: "2020",
                img: "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
            },
            {
                id: 5,
                title: "Film 5",
                info: "2022",
                img: "https://media.themoviedb.org/t/p/w227_and_h127_face/6SGsPDrZlNoMz1QLMEvkJHcksGg.jpg"
            },
            {
                id: 6,
                title: "Film 6",
                info: "2020",
                img: "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
            },
            {
                id: 7,
                title: "Film 7",
                info: "2022",
                img: "https://media.themoviedb.org/t/p/w227_and_h127_face/6SGsPDrZlNoMz1QLMEvkJHcksGg.jpg"
            },
            {
                id: 8,
                title: "Film 8",
                info: "2020",
                img: "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
            },
            {
                id: 9,
                title: "Film 9",
                info: "2022",
                img: "https://media.themoviedb.org/t/p/w227_and_h127_face/6SGsPDrZlNoMz1QLMEvkJHcksGg.jpg"
            }
        ]
    })
})
