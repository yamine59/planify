<template>
    <div v-show="isVisible && items.length" class="select rounded-xl w-full absolute bg-white overflow-auto border-2 border-gray-500 max-h-48 pos">
        <div v-for="i in items" @click="validateItem(i.name)" class="p-2 hover:bg-gray-400 cursor-pointer">
            {{ i.name }}
        </div>
    </div>
</template>



<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { PropType } from 'vue';

defineProps({
    items: {
        type: Array as PropType<{ name: string }[]>,
        required: true,
    },
    isVisible: {
        type: Boolean,
        required: true,
    }
});

const emit = defineEmits(['validateItem', 'closeDropdown']);

const validateItem = (name: string) => {
    emit('validateItem', name);
    emit('closeDropdown');
};



const selectDropdown = ref<HTMLElement | null>(null);

const clickDehors = (event: MouseEvent) => {
    if (selectDropdown.value && !selectDropdown.value.contains(event.target as Node)) {
        emit('closeDropdown');
    }
};



onMounted(() => {
    document.addEventListener('click', clickDehors);
});
onBeforeUnmount(() => {
    document.removeEventListener('click', clickDehors);
});
</script>



<style scoped>
.pos {
    top: 73px;
}
</style>
