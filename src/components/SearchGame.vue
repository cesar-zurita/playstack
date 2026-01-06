<script setup>
    import { ref } from 'vue';
    import { useGameStore } from '../stores/gamesStore';
    import { useBackLogStore } from '../stores/backLogStore';
    import GameCard from './GameCard.vue';

    
    const gameStore = useGameStore();
    const backlogStore = useBackLogStore();

    const gameTitle = ref("");

    const handleGameSearch = () => {
        gameStore.getGames(gameTitle.value);
        console.log(gameTitle.value);
        
    }

    const addToBacklog = (game) => {
        const backlogGame ={
            id: crypto.randomUUID(),
            apiID: game.id,
            title: game.name,
            cover: game.background_image,
            esrb_rating: game.esrb_rating ? game.esrb_rating.name : null,
            genres: game.genres.map(g => g.name),
            status: 'backlog',
            addedAt: new Date().toISOString()
        }
        backlogStore.addItem(backlogGame);
    }

    const isInBacklog = (apiID) => {
        return backlogStore.games.some(game => game.apiID === apiID);
    };

</script>

<template>
    <div class="search-game">    
        <h1>Busca un juego</h1>
        <form @submit.prevent="handleGameSearch">
        <input v-model="gameTitle" placeholder="Escribe el nombre del juego" />
        <button>Buscar</button>
        </form>
    </div>

        <div class="results">
        <GameCard v-for="game in gameStore.games" :key="game.id"
            :game="game"
            mode="search"
            :is-in-backlog="isInBacklog(game.id)"
            @add="addToBacklog"/>
        </div>
<!--
        <div class="results">
        <GameCard v-for="game in gameStore.games" :key="game.id"
            :game="game"
            :game-title="game.name" :game-cover="game.background_image"
            :game-genres="game.genres ? game.genres.map(g => g.name) : []"
            :game-rating="game.esrb_rating ? game.esrb_rating.name : null"
            :is-in-backlog="isInBacklog(game.id)"
            @add="addToBacklog(game)"/>
        </div>
-->
</template>

<style scoped>
    .search-game{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: -8px;
    }
    .results{
        display: flex;
        gap: 16px;
        padding: 20px;

        overflow-x: auto;
        overflow-y: hidden;

        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;

        max-width: 1000px;
        margin: 0 auto;
    }

    button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    }
</style>