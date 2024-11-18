<template>
    <div class="containerbody flex flex-col pl-14 w-full h-full pt-10">
        <div class="flex w-full justify-start text-4xl">
            <p>Bonjour {{ user.username }}</p>
        </div>

        <div class="container flex flex-col bg-white rounded-xl p-5 my-10">
            <div class="flex justify-between">
                <p class="fontBolt text-2xl mb-6">Creation de votre Planify</p>
                <p class="fontBolt text-2xl mb-6 ">Votre récap</p>
            </div>

            <div class="flex justify-between mb-10">
                <FormVoyage 
                class="w-2/5"
                v-model:destination="destination"
                v-model:arrive="arrive"
                v-model:depart="depart"
                v-model:nom="nom"
                v-model:participants="participants"
                v-model:prix="prix"
                v-model:description="description"
            />

            <div class="bg-blue-100 flex flex-col w-2/5 rounded-lg px-6 py-4 justify-between">
                    
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

                <pdf :recapData="{ destination, arrive, depart, nom, participants, description, prix }"/>
            </div>
            </div>

            <div class="text-red-600 my-2 text-center text-xs">
                <p v-for="erreur in erreurs" :key="erreur">
                    {{ erreur }}
                </p>
            </div>

            <div class="flex justify-between cursor-pointer">
                <div @click.prevent="deleteTrvael" class="p-5 w-52 rounded-xl bg-red-500 hover:bg-red-700 text-center">
                    Supprimer voyage
                </div>
                <div @click.prevent="verify" class="p-5 w-52 rounded-xl bg-blue-500 hover:bg-blue-700 text-center">
                    Suivant
                </div>
            </div>
        </div>

    </div>
</template>



<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import store from '@/store';
import FormVoyage from '@/components/formVoyage.vue';
import { User } from '@/types/types';
import { IoOutlineAirplane, BsCalendar3, PhFillUsers, AkPaper, AnOutlinedDollarCircle } from '@kalimahapps/vue-icons';
import pdf from '@/components/pdf.vue';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

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
        modifyTravel();
    } else {
        return;
    }
}



const formattedDateD = (date:any) => {
    return new Date(date).toLocaleDateString();
};

const travel = async () => {
    try {
        const response = await fetch(`http://localhost:3001/travel/showTheTravel/${route.params.id_travel}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, /',
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erreur lors de la recuperation du voyage:', errorData.message);
            return;
        }

        const result = await response.json();
        const travel = result.listtravel[0]
        
        nom.value = travel.name;
        destination.value = travel.destination;
        participants.value = travel.persons;
        arrive.value = formattedDateD(travel.start_date);
        depart.value = formattedDateD(travel.end_date);
        description.value = travel.description;
        prix.value = travel.amount;

       
    } catch (error) {
        console.error('Erreur durant la recherche de voyage : ', error)
    }
}

const modifyTravel = async () => {
    const data = {
        destination: destination.value,
        start_date: arrive.value,
        end_date: depart.value,
        description: description.value,
        persons: participants.value,
        name: nom.value,
    }

    try {
        const response = await fetch(`http://localhost:3001/travel/modifierTravel/${route.params.id_travel}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, /',
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erreur lors de la recuperation du voyage:', errorData.message);
            return;
        }
        
        router.push(`/modifierActivity/${route.params.id_travel}`)
        erreurs.value = []
       
    } catch (error) {
        console.error('Erreur durant la recherche de voyage : ', error)
    }
}

const deleteTrvael = async () => {
    try {
        const response = await fetch(`http://localhost:3001/travel/supprimerTravel/${route.params.id_travel}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, /',
                'Content-Type': 'application/json',
            }
        })
        if (!response.ok) {
            console.error('Erreur lors de la suppression');
            return;
        }
        console.log(response)
        
        router.push('/voyage')
    } catch (error) {
        console.error('Erreur durant la supression : ', error)
    }
}

onMounted(() => {
    travel()
})
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