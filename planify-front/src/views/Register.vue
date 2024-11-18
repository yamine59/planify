<template>
    <div class="tout flex justify-center items-center flex-col p-8">
        <div @click.prevent="accueil"><img src="../assets/img/logo.png" class="w-60 cursor-pointer"></div>

        <form class="form bg-white p-8 rounded-2xl mt-8">
            <p class="titre text-xl mb-6">S'inscrire</p>

            <label class="text-sm">
                <p class="mb-2 text-gray-600">Pseudo</p>
                <input type="text" v-model="username"
                    class="mb-6 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block input p-2.5"
                    placeholder="Pseudo" />
            </label>

            <label class="text-sm relative">
                <div class="flex justify-between">
                    <p class="mb-2 text-gray-600">Mot de passe</p>
                </div>

                <div class="relative">
                    <input :type="isPasswordVisible ? 'text' : 'password'" v-model="password"
                        class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 input p-2.5 pr-10 mb-6"
                        placeholder="Mot de Passe" />

                    <button @click.prevent="togglePasswordVisibility" class="eye absolute text-gray-500">
                        <IconPassword :visible="isPasswordVisible" />
                    </button>
                </div>
            </label>

            <label class="text-sm relative">
                <div class="flex justify-between">
                    <p class="mb-2 text-gray-600">Confirmation de mot de passe</p>
                </div>

                <div class="relative">
                    <input :type="isPasswordVisible2 ? 'text' : 'password'" v-model="password2"
                        class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 input p-2.5 pr-10"
                        placeholder="Confirmez votre mot de passe" />

                    <button @click.prevent="togglePasswordVisibility2" class="eye2 absolute text-gray-500">
                        <IconPassword :visible="isPasswordVisible2" />
                    </button>
                </div>
            </label>

            <button @click.prevent="verify" class="w-full bg-blue-500 text-white px-20 py-3 rounded-lg mt-8">
                S'inscrire
            </button>

            <p class="text-gray-400 text-xs text-center mt-2">Dèjà un compte ? <span @click="connexion"
                    class="cursor-pointer text-blue-500 hover:text-blue-900">Connexion</span></p>

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
import { useRouter } from 'vue-router';

const router = useRouter()

const username = ref<string>('');

const password = ref<string>('');
const isPasswordVisible = ref(false);
const password2 = ref<string>('');
const isPasswordVisible2 = ref(false);

const erreurs = ref<string[]>([])

const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
};
const togglePasswordVisibility2 = () => {
    isPasswordVisible2.value = !isPasswordVisible2.value;
};

const accueil = () => {
    router.push('/')
}
const connexion = () => {
    router.push('/login')
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

    if (password.value !== password2.value) {
        erreurs.value.push('Les mot de passe ne correspondent pas !');
    }

    if (erreurs.value.length === 0) {
        register();
    } else {
        return;
    }
}



const register = async () => {
    const data = {
        username: username.value,
        password: password.value,
        password2: password.value
    }

    try {
        const response = await fetch('http://localhost:3001/users/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, /',
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erreur lors de l\'inscription:', errorData.message);
            return;
        }

        username.value = ''
        password.value = ''
        password2.value = ''
        isPasswordVisible.value = false

        router.push('/login')
    } catch (error) {
        console.error('Erreur durant l\'inscription : ', error)
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
    bottom: 5.8rem;
}

.eye2 {
    bottom: 4.3rem;
}
</style>
