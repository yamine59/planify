<template>
    <div class="tout flex justify-center items-center flex-col p-8">
        <div @click="accueil"><img src="../assets/img/logo.png" class="w-60 cursor-pointer"></div>

        <form class="form bg-white p-8 rounded-2xl mt-8">
            <p class="titre text-xl mb-6">Connexion</p>

            <label class="text-sm">
                <p class="mb-2 text-gray-600">Pseudo</p>
                <input type="text" v-model="username" class="mb-4 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block input p-2.5" placeholder="Pseudo" />
            </label>

            <label class="text-sm relative">
                <div class="flex justify-between">
                    <p class="mb-2 text-gray-600">Mot de passe</p>
                    <p class="mb-2 cursor-pointer text-blue-500 hover:text-blue-900">Oublié ?</p>
                </div>

                <div class="relative">
                    <input :type="isPasswordVisible ? 'text' : 'password'" v-model="password" class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 input p-2.5 pr-10" placeholder="Mot de Passe" />
                    
                    <button type="button" @click="togglePasswordVisibility" class="eye absolute text-gray-500">
                        <IconPassword :visible="isPasswordVisible" />
                    </button>
                </div>
            </label>

            <button @click.prevent="verify" class="w-full bg-blue-500 text-white px-20 py-3 rounded-lg mt-8">
                Connexion
            </button>

            <p class="text-gray-400 text-xs text-center mt-2">Pas encore de compte ? <span @click="register" class="cursor-pointer text-blue-500 hover:text-blue-900">S'inscrire</span></p>

            <div class="text-red-600 my-2 text-center text-xs">
                <p v-for="erreur in erreurs" :key="erreur">
                    {{ erreur }}
                </p>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IconPassword from "../components/iconPassword.vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();

const username = ref<string>('user');

const password = ref<string>('user');
const isPasswordVisible = ref(false);

const erreurs = ref<string[]>([])

const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
};

const accueil = () => {
    router.push('/')
}
const register = () => {
    router.push('/register')
}



const verify = (event: Event) => {
    event.preventDefault()
    erreurs.value = []

    if (!username.value.length) {
        erreurs.value.push('Le champ pseudo est obligatoire !')
    } 

    if (!password.value.length) {
        erreurs.value.push('Le champ mot de passe est obligatoire !');
    }

    if (erreurs.value.length === 0) {
        login();
    }
}

const setTokenStore = (token:string) => {
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
        const response = await fetch('http://localhost:3001/users/login', {
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
        router.push('/voyage')
    } catch (error) {
        console.error('Erreur durant la connexion : ', error)
    }
}


</script>

<style lang="scss" scoped>
@import "@/style/variablecouleur.scss";
@import "@/style/variableFont.scss";

.tout {
    font-family: $font-pop;
    background-color: #FAFBFF;
    height: 100vh;
}

.form {
    box-shadow: 0px 5px 13px -7px rgba(0, 0, 0, 0.75);
}

.titre {
    font-family: $font-pop-bolt;
}

.input {
    width: 17rem;
}

.eye {
    bottom: 4.3rem;
}
</style>
