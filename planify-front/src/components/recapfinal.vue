<template>
    <div>
        <div >
            <form >
                <p class="mb-2 text-gray-600">Votre Destination</p>
                <div class="w-full mb-4 border border-gray-300 text-xl rounded-lg bl  text-white block input p-2.5">
                    {{ destination }}
                </div>

                <div class="flex gap-2">
                    <label class=" w-full">
                        <p class="mb-2 text-gray-600">Arrivée</p>
                        <div class="w-full mb-4 border border-gray-300 text-xl rounded-lg bl text-white block input p-2.5">
                            {{ arrive }}
                        </div>
                    </label>

                    <label class=" w-full">
                        <p class="mb-2 text-gray-600">Départ</p>
                        <div class="w-full mb-4 border border-gray-300 text-xl rounded-lg bl text-white block input p-2.5">
                            {{ depart }}
                        </div>
                    </label>
                </div>

                <label class="">
                    <p class="mb-2 text-gray-600">Nombre de participants</p>
                    <div class="w-full mb-4 border border-gray-300 text-xl rounded-lg bl text-white block input p-2.5">
                        {{ participants }}
                    </div>
                </label>

                <label class="">
                    <p class="mb-2 text-gray-600">Prix</p>
                    <div class="w-full mb-4 border border-gray-300 text-xl rounded-lg bl text-white block input p-2.5">
                        {{ prix }} €
                    </div>
                </label>

                <label class="">
                    <p class="mb-2 text-gray-600">Description</p>
                    <div class="w-full border border-gray-300 text-xl rounded-lg bl text-white block input p-2.5">
                        {{ description }}
                    </div>
                </label>
            </form>
        </div>

       
        
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(() => {
    travel();
});

const emit = defineEmits([
    'name'
])
const nom = ref();
const destination = ref();
const arrive = ref();
const depart = ref();
const participants = ref();
const prix = ref();
const description = ref();

const formattedDateD = (date) => {
    return new Date(date).toLocaleDateString();
};

const travel = async () => {
    try {
        const response = await fetch(`http://localhost:3001/travel/showTheTravel/${route.params.id_travel}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erreur lors de la recuperation du voyage:', errorData.message);
            return;
        }

        const result = await response.json();
        const travel = result.listtravel[0];

        nom.value = travel.name;
        destination.value = travel.destination;
        participants.value = travel.persons;
        arrive.value = formattedDateD(travel.start_date);
        depart.value = formattedDateD(travel.end_date);
        description.value = travel.description;
        prix.value = travel.amount;
        
        console.log('compname',travel.name);
        emit('name',travel.name)
    } catch (error) {
        console.error('Erreur durant la recherche de voyage : ', error);
    }
};
</script>

<style scoped lang="scss">
@import "@/style/variablecouleur.scss";
@import "@/style/variableFont.scss";

.template-section {
    background-color: #f5f5f5;
    padding: 20px;
    border: 1px solid #ddd;
}

.bl {
    background-color: $primary;
}

</style>
