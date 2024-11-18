<template>
    <div class="tableContainer">
        <table>
            <thead>
                <tr class="">
                    <th>Destination</th>
                    <th>Nom</th>
                    <th>Date Début</th>
                    <th>Date fin</th>
                    <th>Description</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(list, index) in listTravel" :key="index" class="vfor"  >
                    <td @click="recap(list.id_travel)">{{ list.destination.slice(0, 15) + (list.destination.length > 15 ? '...' : '') }}</td>
                    <td @click="recap(list.id_travel)">{{ list.name.slice(0, 15) + (list.name.length > 15 ? '...' : '') }}</td>
                    <td @click="recap(list.id_travel)">{{ formattedDateD(list.start_date) }}</td>
                    <td @click="recap(list.id_travel)">{{ formattedDateD(list.end_date) }}</td>
                    <td @click="recap(list.id_travel)"
                        @mouseover="showTooltip(list.description)"
                        @mousemove="updatePosition"
                        @mouseleave="tooltipActive = false;"
                        style="text-overflow:ellipsis; overflow: hidden;">
                        {{ list.description.slice(0, 25) + (list.description.length > 25 ? '...' : '') }}
                    </td>
                    
                    <td class="py-5 pr-10">
                        <div
                            @click="update(list.id_travel)"
                            class="bg-blue-700 w-10 h-6 rounded-lg border-red-700 border-2 flex justify-center items-center">
                            <AkPencil class="text-white" />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div
            v-if="tooltipActive"
            :style="`left: ${mouseLeft}px; top: ${mouseTop}px;`"
            class="tooltip">
            {{ descriptionn }}
        </div>
    </div>
</template>


<script setup>
import { computed, onMounted, ref } from 'vue';
import { AkPencil } from '@kalimahapps/vue-icons';
import router from '@/router';

const props = defineProps({
    key: Number,
    listTravel: Array,
    id:Number,
});

const recap = (e) => {
    router.push(`/votrePlanify/${e}`)
}

let tooltipActive = ref(false);
let mouseLeft = ref(0);
let mouseTop = ref(0);
let descriptionn = ref('');



const update = (e) => {
    router.push(`/modifierTravel/${e}`)
}
const formattedDateD = (date) => {
    return new Date(date).toLocaleDateString();
};

const updatePosition = (e) => {
    mouseLeft.value = e.clientX - 470;
    mouseTop.value = e.clientY + 20;
};

const showTooltip = (desc) => {
    tooltipActive.value = true;
    descriptionn.value = desc;
};
</script>

<style scoped>
.tableContainer {
    table-layout: auto;
    width: 100%;
}

.vfor {
    overflow-y: auto;
    min-height: 100px;
}

.tooltip {
    position: absolute;
    width: 250px;
    height: auto;
    padding: 10px;
    text-align: center;
    border-radius: 6px;
    background-color: white;
    transition: .1s;
    box-shadow: 0px 0px 15px -1px rgba(0, 0, 0, 0.2);
    word-break: break-all;
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead th:nth-child(1) {
    width: 20%;
}

thead th:nth-child(2) {
    width: 20%;
}

thead th:nth-child(3) {
    width: 10%;
}

thead th:nth-child(4) {
    width: 10%;
}

thead th:nth-child(5) {
    width: 35%;
}

thead th:nth-child(6) {
    width: 5%;
}

th, td {
    text-align: center;
    height: 50px;
    border-bottom: 1px solid #ddd;
}
</style>
