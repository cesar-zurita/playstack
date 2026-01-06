<script setup>
    import { onMounted, watch } from 'vue';


    import SearchGame from '../components/SearchGame.vue';
    import { useGameStore } from '../stores/gamesStore';
    import { useBackLogStore } from '../stores/backLogStore';
    import CurrentBacklog from '../components/CurrentBacklog.vue';

    const gameStore = useGameStore();
    const backlogStore = useBackLogStore();

    console.log("holi");
</script>

<template>
    <div class="top">
        <h1>Welcome to PLAYSTACK</h1>
        <h2>Keep track of the games you are playing and those waiting for you</h2>
        <button @click="$router.push('/delete-page')">Delete a game? click me!</button>
    </div>    
    <SearchGame />
    <h2>Your Current backlog</h2>
    <CurrentBacklog />
</template>

<style scoped>
    .top{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h2{
        text-align: center;
        padding-top: -150px;
    }
</style>