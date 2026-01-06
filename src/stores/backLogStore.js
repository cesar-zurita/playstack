import {defineStore} from "pinia";
import { ref } from "vue";

export const  useBackLogStore = defineStore ("backGame", () => {

        const readItem = () => {
        const data =localStorage.getItem('games');
        return data ? JSON.parse(data) : [];
    }

    const games = ref(readItem()); 

    const addItem = (game) => {
        const exists = games.value.some(existingGame => existingGame.title === game.title);
        if(exists){
            console.log("Game already in the list");
            return
        }
        games.value.push(game);
        console.log(games.value);
        localStorage.setItem('games', JSON.stringify(games.value))

    }

    const deleteItem = (id) => {
        const initialLength = games.value.length;

        games.value = games.value.filter(game => game.id !== id);

        if(games.value.length < initialLength){
            localStorage.setItem('games', JSON.stringify(games.value));
            console.log("Item deleted");
        }else{
            console.log("Not deleted")
        }
    }

    const updateItem = (id, newStatus) => {
        console.log("si funciono!!!")
        games.value = games.value.map(game =>
        game.id === id ? { ...game, status: newStatus } : game);
        localStorage.setItem('games', JSON.stringify(games.value));
};

    return{
    games,
    addItem,
    deleteItem,
    updateItem
    }
})