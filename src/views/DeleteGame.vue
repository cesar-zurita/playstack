<script setup>
    import CurrentBacklog from '../components/CurrentBacklog.vue';
    import { useBackLogStore } from '../stores/backLogStore';


    const backlogStore = useBackLogStore();
    console.log(backlogStore.games);

</script>

<template>
    <h1>Welcome to the Delete page</h1>
    <CurrentBacklog />
</template>

<style scoped>
    h1{
        text-align: center;
    }
</style>