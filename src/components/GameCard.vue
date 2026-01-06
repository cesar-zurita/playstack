<script setup>
    import { defineProps, defineEmits} from 'vue';
    import { useBackLogStore } from '../stores/backLogStore';
    import { useRoute } from 'vue-router';

    const backlogStore = useBackLogStore();

    const props = defineProps({
        /*
        gameTitle:{
            type: String,
            required: true
        },
        gameCover:{
            type: String,
            required: true
        },
        gameGenres:{
            type: Array,
            required: true
        },
        gameRating:{
            type: String,
            required: false
        },
        gameDateAdded:{
            type: String,
            required: false
        },
        */
        game:{
            type: Object,
            requiered: true
        },
        mode: {
                type: String,
                requiered: true
        },
        isInBacklog:{
            type: Boolean,
            default: false
        }
    });

    const emit = defineEmits(['add', 'update-status'])
    const currRoute = useRoute();

    const handleAdd = () => {
        emit('add', props.game);
    };

    const handleStatus = (status) => {
        emit('update-status', {
            id: props.game.id,
            status
        });
    };

    const handleDeleteButton = () =>{
        if(currRoute.name === "delete-page"){
            return true;
        }
        else{
            return false;
        }
    }

    const formatDate = (date) => {
        if(!date) return '';

        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };
</script>

<template>
    <div class="game-card">
        <div class="game-title">
            <p>{{ props.game.title || props.game.name}}</p>
        </div>
        <div class="game-cover">
            <img :src="props.game.cover || props.game.background_image" alt="Game Cover">
        </div>
        <div class="game-genres">
            <span v-for="genre in props.game.genres" :key="genre || genre.id">{{ genre.name || genre }}</span>
        </div>
        <div class="rating">
            <p>{{ game.esrb_rating?.name || game.esrb_rating || 'Not Rated' }}</p>
        </div>
        <div v-if = "mode === 'backlog'" class="game-date-added">
            <p>🕒 Added {{ formatDate(props.game.addedAt) }}</p>
        </div>
        <div class="game-actions">
            <button v-if = "mode === 'search'"
                            :disabled="isInBacklog" 
                            @click="handleAdd">{{ isInBacklog ? 'Already in Backlog' : 'Add to Backlog' }}
            </button>
        <div v-if="mode === 'backlog'">
            <button :disabled="props.game.status === 'playing'" @click="handleStatus('playing')">▶Playing</button>
            <button :disabled="props.game.status === 'completed'" @click="handleStatus('completed')">✅Completed</button>
            <button :disabled="props.game.status === 'backlog'" @click="handleStatus('backlog')">📦Backlog</button>
            <button v-if="handleDeleteButton()" @click="backlogStore.deleteItem(game.id)">:c Delete Game </button>
        </div>
    </div>
    </div>
    
</template>

<style scoped>
    .game-card {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: 12px;

        min-width: 320px;
        max-width: 360px;
        flex: 0 0 auto;

        scroll-snap-align: start;
        overflow: hidden;

        display: flex;
        flex-direction: column;

        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        transition:
        background 0.2s ease,
        transform 0.15s ease,
        box-shadow 0.2s ease;
}

@media (hover: hover) {
    .game-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
    }
}


    .game-card:hover{
        background: var(--bg-card-hover);
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        background: #e5e7eb
    }

    .game-cover img {
        width: 100%;
        height: 260px;
        object-fit: cover;
        display: block;
}

    .game-title {
        font-family: var(--font-title);
        color: var(--text-primary);

        padding: 12px 14px;
        font-weight: 600;
        font-size: 16px;
        line-height: 1.2;
}

    .game-genres {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding: 0 14px 10px;
}

    .game-genres span {
        background: rgba(124, 124, 255, 0.15); /* primary soft */
        color: var(--primary);

        padding: 4px 8px;
        border-radius: 999px;
        font-size: 15px;
        font-weight: 500;
}

    .rating {
        align-self: flex-start;

        margin: 0 14px 10px;
        padding: 4px 8px;

        font-size: 11px;
        font-weight: 600;

        border-radius: 6px;
        background: rgba(34, 211, 238, 0.15); /* accent soft */
        color: var(--accent);
}

    .game-date-added {
        margin: 0 14px 10px;
        font-size: 15px;
        

        display: flex;
        align-items: center;
        gap: 6px;
}

    .game-actions {
        margin-top: auto;
        padding: 12px 14px;

        display: flex;
        flex-wrap: wrap;
        gap: 8px;
}

.btn-active {
  box-shadow: 0 0 0 2px rgba(124, 124, 255, 0.4);
}
</style>