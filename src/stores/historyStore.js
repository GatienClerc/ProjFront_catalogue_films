/***********************************************************************************************************************
 * Program name :           historyStore.js
 * Description :            Pinia store to manage the user's history locally
 * Author :                 Thierry Perroud
 * Creation date :          03.06.2026
 * Modified by :            -
 * Modification date :      -
 * Version :                0.1
 **********************************************************************************************************************/
/***********************************************************************************************************************
 * Imports
 **********************************************************************************************************************/
import { defineStore } from 'pinia'

/***********************************************************************************************************************
 * Store
 **********************************************************************************************************************/
export const historyStore = defineStore('history', {
    state: () => ({
        items: JSON.parse(localStorage.getItem('history')) || []
    }),

    actions: {
        /**
         * Adds a media (movie or TV show) into the history, in first position
         *
         * @param media JSON containing the media's ID, title and poster path
         */
        add(media) {
            this.items = this.items.filter(h => h.id !== media.id);     // Removes media from history if it's already in
            this.items.unshift(media);                                  // Adds media into history in front of the rest

            this.persist();
        },

        /**
         * Sets the content of the history (stored in the variable items) into the localStorage
         */
        persist() {
            localStorage.setItem('history', JSON.stringify(this.items))
        }
    }
});