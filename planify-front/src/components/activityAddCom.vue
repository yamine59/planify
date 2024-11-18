<template>
    <div class="flex ">
        <div class="flex justify-center ">

            <div class="flex flex-col  scroll ">
                <div v-for="(list, index) in listActivity" :key="index" class="">
                    <div class="flex justify-between">
                        <div class="flex flex-col items-center justify-center">

                            <div
                                class="w-10 h-10 bl z-10 border-4 border-purple-500 rounded-full text-center content-center  text-white">
                                {{ index + 1 }}
                            </div>
                        </div>


                        <div class="bl text-white font h-auto text-xs w-64 rounded-lg mb-7 m-5 p-5 ">

                            <div class="flex justify-between items-center">
                                <div class="fontBolt text-base break-words">{{ list.activity_name }}</div>
                                <AnOutlinedDelete @click="deleteActivity(list.id_activity,index)"
                                    class="h-5 w-5 cursor-pointer hover:text-red-600 rounded-3xl" />
                            </div>
                            <div class="ligne"> </div>
                            <!-- Div pour la date formatée -->
                            <div class="flex ">
                                <p> Date : &nbsp </p> {{ formatDate(list.activity_date).date }}
                            </div>
                            <!-- Div pour l'heure formatée -->
                            <div class="flex">
                                <p>Heure :&nbsp </p> {{ formatDate(list.activity_date).time }}
                            </div>
                            <div class="flex">
                                <p>Lieu :&nbsp </p> {{ list.location }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" lignev bg-purple-500 absolute"></div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue'
import store from '@/store';
import { useRoute, useRouter } from 'vue-router'
import { AnOutlinedDelete } from '@kalimahapps/vue-icons';
const route = useRoute()
const user = computed(() => store.state.user || {});
const apiUrl = process.env.API_URL;
onMounted(() => {
    activity();

})
const listActivity = ref()
const deleteActivity = async (id_activity,index) => {

    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/activity/supprimerActivity/${route.params.id_travel}/${id_activity}`, {
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
        listActivity.value.splice(index,1)

    } catch (error) {
        console.error('Erreur durant la supression : ', error)
    }

}


const activity = async () => {

    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/activity/showActivity/${route.params.id_travel}`, {
            method: 'get',
            headers: {

                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.log("ERREUR")
            alert("erreur ")
        }

        const result = await response.json();
        listActivity.value = result.listActivity

    } catch (err) {
        console.error('Error during fetch showtravel:', err);
    }

}

// Fonction pour formater la date et l'heure en français
const formatDate = (datetime) => {
    const date = new Date(datetime);

    // Format de la date en français
    const formattedDate = new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date);

    // Format de l'heure en français
    const formattedTime = new Intl.DateTimeFormat('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);

    return {
        date: formattedDate,
        time: formattedTime
    };
};
</script>

<style scoped lang="scss">
@import "@/style/variablecouleur.scss";
@import "@/style/variableFont.scss";

.font {
    font-family: $font-pop;
}

.fontBolt {
    font-family: $font-pop-bolt;
}

.bl {
    background-color: $primary;
}

.ligne {
    height: 2px;
    width: 100%;
    background-color: black;
    margin: 10px 0;
}

.lignev {
    width: 5px;
    height: 500PX;
    margin-left: 17px;
}

.scroll {
    overflow-y: auto;
    height: 500px;
}

.scroll::-webkit-scrollbar {

    display: none;

}
</style>