<template>
    <div class="containerbody flex flex-col pl-14 w-full h-full pt-10">
        <div class="flex w-full justify-start text-4xl">
            <p class="capitalize">Bonjour {{ user.username }}</p>
        </div>

        <div class="container flex flex-col bg-white rounded-xl p-5 my-10">
            <p class="fontBolt text-2xl mb-6">Creation de votre Planify</p>

            <div class="flex justify-between mb-10">
                <FormVoyage class="w-2/5" 
                    v-model:destination="destination" 
                    v-model:arrive="arrive"
                    v-model:depart="depart" 
                    v-model:nom="nom" 
                    v-model:participants="participants" 
                    v-model:prix="prix"
                    v-model:description="description" 
                />

                <div class="recap bg-blue-100 flex flex-col w-2/5 rounded-lg px-6 py-4 justify-between">
                    
                    <div>
                        <div class="flex items-center gap-1 justify-center">
                            <img src="../assets/img/icon.png" class="w-14 h-14">
                            <p class="text-center text-3xl">Votre planify</p>
                        </div>
                        
                        <div class="mb-4 flex justify-center items-center mt-2">
                            <p class="truncate text-xl underline-offset-2">{{ nom }}</p>
                        </div>

                        <div class="mb-4">
                            <IoOutlineAirplane class="text-3xl mb-1" v-if="destination" />
                            <p class="truncate text-sm">{{ destination }}</p>
                        </div>
                        <div class="mb-4">
                            <BsCalendar3 class="text-3xl mb-1" v-if="arrive" />
                            <div class="flex gap-5">
                                <p>{{ arrive }}</p>
                                <p v-if="arrive && depart">/</p>
                                <p>{{ depart }}</p>
                            </div>
                        </div>
    
                        <div class="mb-4">
                            <PhFillUsers class="text-3xl mb-1" v-if="participants" />
                            <div class="flex gap-2 items-center">
                                <p class="truncate text-sm">
                                    {{ participants }}
                                </p>
                                <p v-if="participants">Participants</p>
                            </div>
                        </div>
    
                        <div class="mb-4">
                            <AnOutlinedDollarCircle class="text-3xl mb-1" v-if="prix" />
                            <div class="flex gap-2 items-center">
                                <p class="truncate text-sm text-ellipsis whitespace-normal">
                                    {{ prix }}
                                </p>
                                <p v-if="prix">€</p>
                            </div>
                        </div>
    
                        <div>
                            <AkPaper class="text-3xl mb-1" v-if="description" />
                            <p class="truncate text-sm line-clamp-4 text-ellipsis whitespace-normal">{{ description }}</p>
                        </div>
                    </div>

                    <pdf v-if="destination || nom" :recapData="{ destination, arrive, depart, nom, participants, description, prix }"/>
                </div>
            </div>

            <div class="text-red-600 my-2 text-center text-xs">
                <p v-for="erreur in erreurs" :key="erreur">
                    {{ erreur }}
                </p>
            </div>

            <div class="flex justify-center cursor-pointer">
                <div @click="verify" class="p-5 w-52 rounded-xl bg-blue-500 text-center">
                    Suivant
                </div>
            </div>
        </div>

    </div>
</template>



<script setup lang="ts">
import { ref, computed } from 'vue'
import store from '@/store';
import router from '@/router';
import FormVoyage from '@/components/formVoyage.vue';
import { User } from '@/types/types';
import { IoOutlineAirplane, BsCalendar3, PhFillUsers, AkPaper, AnOutlinedDollarCircle } from '@kalimahapps/vue-icons';
import pdf from '@/components/pdf.vue';
import { useRoute } from 'vue-router'
const apiUrl = process.env.API_URL;
const route = useRoute()
const destination = ref('');
const arrive = ref('');
const depart = ref('');
const nom = ref('');
const participants = ref('');
const description = ref('');
const prix = ref('');

const erreurs = ref<string[]>([])

const user = computed(() => store.state.user || {} as User);
const userId = computed(() => store.state.user?.id || null);

const verify = (event: Event) => {
    event.preventDefault()
    erreurs.value = []

    if (!destination.value.length) {
        erreurs.value.push('Le champ destination est obligatoire !')
    }
    if (!arrive.value.length) {
        erreurs.value.push("Le champ date d'arrivé est obligatoire !");
    }
    if (!depart.value.length) {
        erreurs.value.push("Le champ date de départ est obligatoire !");
    }
    if (!nom.value.length) {
        erreurs.value.push("Le champ nom est obligatoire !");
    }
    if (!participants.value || isNaN(Number(participants.value)) || Number(participants.value) <= 0) {
        erreurs.value.push("Le champ participants est obligatoire et doit être un nombre positif !");
    }
    if (!description.value.length) {
        erreurs.value.push("Le champ description est obligatoire !");
    }

    if (erreurs.value.length === 0) {
        travel();
    } else {
        return;
    }
}

const travel = async () => {
    const data = {
        name: nom.value,
        destination: destination.value,
        persons: Number(participants.value),
        start_date: arrive.value,
        end_date: depart.value,
        description: description.value,
        amount: prix.value,
    }
    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/travel/creationTravel/${userId.value}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, /',
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erreur lors de la création du voyage:', errorData.message);
            return;
        }

        nom.value = ''
        destination.value = ''
        participants.value = ''
        arrive.value = ''
        depart.value = ''
        description.value = ''
        prix.value = ''

        router.push(`/createActivity`)
    } catch (error) {
        console.error('Erreur durant la création du voyage : ', error)
    }
}
console.log(route.params.id_travel);
</script>


<style lang="scss" scoped>
@import "@/style/variablecouleur.scss";
@import "@/style/variableFont.scss";

.containerbody {
    font-family: $font-pop;
    background-color: $gris;
}

.container {
    width: 95%;
}

.fontBolt {
    font-family: $font-pop-bolt;
}



.truncate {
    word-break: break-word;
}
</style>