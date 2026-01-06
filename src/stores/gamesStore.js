import {defineStore} from "pinia";
import { ref } from "vue";


export const useGameStore = defineStore("game", ()=>{
    const apiUrl = "https://api.rawg.io/api/games";
    const apiKey = "93219203a1f64b98b2b0a166d570b1b6";

    const games = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    const getGames = async (query) => {
        isLoading.value = true;  
        error.value = null;

        try{
            const response = await fetch(`${apiUrl}?key=${apiKey}&search=${encodeURIComponent(query)}`);

            if(!response.ok){
                throw new Error(`Response status: ${response.status}`)
            }

            const data = await response.json();
            games.value = data.results;
            console.log(games.value)
    } catch (err) {
            error.value = err.message;
            console.error(err);
            } finally {
            isLoading.value = false;
    }
};

    return {
        games,
        isLoading,
        error,
        getGames
    }
})