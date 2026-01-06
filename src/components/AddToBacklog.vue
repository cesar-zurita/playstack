<script setup>
    import { ref } from 'vue';
    import { useGameStore } from '../stores/gamesStore';
    import { useBackLogStore } from '../stores/backLogStore';

    const backLogStrore = useBackLogStore();

    
    backLogStrore.addItem(game);

</script>

<template>
    <p>{{ game }}</p>
</template>