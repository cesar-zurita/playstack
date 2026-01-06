<script setup>
    import { useBackLogStore } from '../stores/backLogStore';
    import GameCard from './GameCard.vue';


    const backlogStore = useBackLogStore();
    console.log('STORE:', backlogStore);

</script>

<template>
    <div class="games-backlog">
        <GameCard v-for="game in backlogStore.games" :key="game.id"
            :game="game"
            mode="backlog"
            @update-status="({ id, status }) => backlogStore.updateItem(id, status)"
            />
    </div>
<!--
    <ul>
        <li v-for="game in backLogStore.games" :key="game.id">{{ game.title }}
            <img :src="game.cover" alt="fallaste we"/>
            <button :disabled="game.status === 'playing'" @click="backlogStore.updateItem(game.id, 'playing')">▶ Playing</button>
            <button :disabled="game.status === 'backlog'" @click="backlogStore.updateItem(game.id, 'backlog')">📦 Backlog</button>
            <button :disabled="game.status === 'completed'" @click="backlogStore.updateItem(game.id, 'completed')">✅ Completed</button>
        </li>
    </ul>
-->
</template>

<style scoped>

    
    .games-backlog{
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