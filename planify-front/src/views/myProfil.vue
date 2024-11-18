<template>
    <div class="containerbody flex flex-col px-14 w-full h-full py-10">
        <div class="flex w-full justify-center text-4xl">
            <p class="capitalize">A votre écoute {{ user.username }} 😃</p>
        </div>

        <div class="flex justify-center items-center flex-col mt-8">

            <form  class="w-2/5 bg-white rounded-xl p-5">
                <div class="text-green-600 my-2 text-center" v-if="succes">
                    {{succes}}
                </div>
        
                <div class="text-red-600 my-2 text-center">
                    <p v-for="erreur in erreurs" :key="erreur">
                        {{ erreur }}
                    </p>
                </div>
                <div class="flex gap-2">
                    
                    <label class="text-sm w-full">
                        <p class="mb-2 text-gray-600">Nom</p>
                        <input type="text"
                            class="w-full mb-4 border border-gray-300 text-sm rounded-lg focus:outline-blue-500 marker:block input p-2.5"  v-model="username"/>
                    </label>
    
                    
                </div>
    
                <label class="text-sm">
                    <p class="mb-2 text-gray-600">Nouveau Mot de passe</p>
                    <input type="email" 
                        class="w-full mb-4 border border-gray-300 text-sm rounded-lg focus:outline-blue-500 block input p-2.5"
                        v-model="password">
                </label>
                <label class="text-sm">
                    <p class="mb-2 text-gray-600">Comfirmer Mot de passe</p>
                    <input type="email" 
                        class="w-full mb-4 border border-gray-300 text-sm rounded-lg focus:outline-blue-500 block input p-2.5"
                        v-model="password2">
                </label>
             

                <div class="flex justify-center cursor-pointer mt-8">
                    <div @click="updateProfil" class="p-5 w-52 rounded-xl bg-blue-500 text-center">
                        Modifier
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>



<script setup>
import { ref, onMounted, computed } from 'vue'
import store from '@/store';
import router from '@/router';
import { useRoute } from 'vue-router'
const route = useRoute();
const apiUrl = process.env.API_URL;
const destination = ref('');
const arrive = ref('');
const depart = ref('');
const nom = ref('');
const participants = ref('');
const description = ref('');
const prix = ref('');
const user = computed(() => store.state.user || {} );
const userId = computed(() => store.state.user?.id || null);

const erreurs = ref([])
const succes = ref('')
const username = ref(user.value.username)

const password = ref()
const password2 = ref()

const updateProfil = async () => {
    const data = {
        username: username.value,
        password: password.value,
    }
   if (password.value !== password2.value ){
    erreurs.value.push('les mots de passes sont pas identiques !')
    return
   }
    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/users/modifierProfile/${userId.value}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain,/',
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            console.error('Erreur lors de la connexion:', response.statusText);
            erreurs.value.push('Email ou mot de passe invalides !')
            return;
        }

        succes.value = "Informations modifiées avec succès !"

        store.dispatch('logout'); 
        login()
        // router.push('/login')
    } catch (error) {
        console.error('Erreur durant la modifiation des infos : ', error)
    }
}
const setTokenStore = (token) => {
  const user = JSON.parse(atob(token.split('.')[1]));
  store.commit('setUser', user);
  store.commit('setToken', token);
  store.commit('createToken', token);

};
const login = async () => {
    const data = {
        username: username.value,
        password: password.value,
    }

    try {
        const response = await fetch('${process.env.VUE_APP_URL}/users/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, /',
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            console.error('Erreur lors de la connexion:', response.statusText);
            erreurs.value.push('Email ou mot de passe invalides !')
            return;
        }

        const result = await response.json()
        setTokenStore(result.token);
        
    } catch (error) {
        console.error('Erreur durant la connexion : ', error)
    }
}



console.log("Utilisateur dans le store :", store.state.user);


const verify = (event) => {
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


console.log("User ID:", userId.value);

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

        router.push('/')
    } catch (error) {
        console.error('Erreur durant la création du voyage : ', error)
    }
}
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

.recap {
    background-color: $gris;
}

.truncate {
    word-break: break-word;
}
</style>