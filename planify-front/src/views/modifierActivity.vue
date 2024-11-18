<template>
    <div class="containerbody font ">
        <div class="flex w-2/3 justify-start  mb-20 text-4xl">
            <p>Bonjour {{ user.username }},</p>
        </div>


        <div class="bodyTravel">
            <div class="flex w-full justify-between p-5">
                <p class="fontBolt">Creation de votre Planify</p>
                <div class="flex gap-2">
                    <p>Trier par : </p>
                    <select name="pets" id="pet-select">
                        <option value="">Le plus reçent</option>
                        <option value="dog">Le plus ancien</option>

                    </select>
                </div>
            </div>

            <div class="flex justify-around m-10">
                <form @submit.prevent="activity">
                    <div class="w-72">
                        <label class="text-sm">
                            <p class="mb-2 text-gray-600">Nom*</p>
                            <input type="text" v-model="nom" required
                                class="w-full mb-4 border border-gray-300 text-sm rounded-lg focus:outline-blue-500 block input p-2.5"
                                placeholder="Mon activité" />
                        </label>
                        <div class="flex gap-2">
                            <label class="text-sm w-full">
                                <p class="mb-2 text-gray-600">Date et Heure*</p>

                                <input type="datetime-local" v-model="date" required
                                    class="w-full mb-4 border border-gray-300 text-sm rounded-lg focus:outline-blue-500 marker:block input p-2.5" />
                            </label>
                        </div>

                        <label class="text-sm">
                            <p class="mb-2 text-gray-600">Lieu*</p>
                            <input type="text" v-model="lieu" required
                                class="w-full mb-4 border border-gray-300 text-sm rounded-lg focus:outline-blue-500 block input p-2.5"
                                placeholder="Paris" />
                        </label>

                        <div class="flex justify-center cursor-pointer">
                            <button @click="" type="submit" class="p-5 w-52 rounded-xl bg-blue-500 text-center">
                                Ajouter
                            </button>


                        </div>
                    </div>
                </form>
                <div>

                    <activityAddCom :key="refreshKey" />
                   <div class="flex justify-center ">

                       <div @click="recap" class="bg-purple-500 text-white w-36 p-5 ml-5 my-10  rounded-xl">Votre Planify</div>
                   </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import activityAddCom from '@/components/activityAddCom.vue';
import store from '@/store';
import router from '@/router';
import { useRoute, useRouter } from 'vue-router'
const apiUrl = process.env.API_URL;
const route = useRoute()
const user = computed(() => store.state.user || {});

const nom = ref();
const date = ref();
const lieu = ref();
const id_travel = ref();
const refreshKey = ref(0);  // Variable pour gérer le rafraîchissement

onMounted(() => {
    idtravel();
});

const recap = () => {
    router.push(`/votrePlanify/${route.params.id_travel}`)
}
const idtravel = async () => {
    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/travel/showTravel/${user.value.id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.log("ERREUR");
            alert("Erreur");
        }

        const result = await response.json();
        id_travel.value = result.listtravel[0].id_travel;
    } catch (err) {
        console.error('Error during fetch showtravel:', err);
    }
};

const activity = async () => {
    const data = {
        activity_name: nom.value,
        activity_date: date.value.replace('T', ' '),
        location: lieu.value,
    };
    
    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/activity/creationActivity/${id_travel.value}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erreur lors de la création du voyage:', errorData.message);
            return;
        }

        // Réinitialiser les champs du formulaire
        nom.value = '';
        date.value = '';
        lieu.value = '';

        // Incrémenter refreshKey pour rafraîchir le composant
        refreshKey.value += 1;

    } catch (error) {
        console.error('Erreur durant la création du voyage : ', error);
    }
};



</script>

<style lang="scss" scoped>
@import "@/style/variablecouleur.scss";
@import "@/style/variableFont.scss";

.font {
    font-family: $font-pop;
}

.fontBolt {
    font-family: $font-pop-bolt;
}

.containerbody {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    flex-grow: 0;
    position: relative;
    background-color: $gris;
    padding-top: 5vh;
}

.bodyTravel {
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 30px;
    min-height: 40%;
    width: 80%;
}
</style>