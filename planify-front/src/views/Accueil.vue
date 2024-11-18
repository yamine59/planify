<template>
    <div class="nn">
        <div class="flex wfull flex-wrap items-center h-20 justify-between ">
            <a href="/" class="">
                <img src="../assets/img/logo.png" class="w-56">
            </a>
            <div @click="togglemenu" class=" sm:hidden">
                <AnOutlinedMenu class="h-16 w-10 mr-4"/>
            </div>

            <div v-if="open == false" class=" hidden sm:flex m-auto md:mr-6 md:pr-5  flex-row   mt-4  ">
                <button @click="register" class="btn p-2 mr-6 w-32 rounded-md">Inscription</button>
                <button @click="connexion" class="btn p-2 w-32 rounded-md">Connexion</button>
            </div>
            <div v-if="open == true" class=" z-10 flex flex-col w-full text-center nn mt-1  p-5 items-center">
                <button @click="register" class=" p-2 w-full  btn rounded-md my-2">Inscription</button>
                <button @click="connexion" class=" p-2 w-full  btn rounded-md "><a href="">Connexion</a></button>
            </div>
        </div>

        <div class="ban wfull flex-col-reverse lg:flex-row flex items-center flex-wrap justify-around">
            <div class="flex flex-col ">
                <p class="banFont  text-black text-3xl tracking-wider sm:text-7xl">
                    Voyager léger,<br>
                    en planifiant<br>
                    Vos voyages !
                </p>

                <div @click="register" class="m-auto my-10 sm:mt-10 flex">
                    <button class="banBtn p-3 w-36 rounded-lg text-white text-lg">
                        S'inscrire
                    </button>
                </div>
            </div>

            <div class=" mt-10">
                <img src="../assets/img/itinenaire.png" class="banImg ">
            </div>
        </div>

        <div class="flex wfull flex-wrap justify-center sm:gap-60 items-center my-10 ">
            <div class="flex flex-col flex-wrap justify-center items-center gap-10 mb-10  md:mr-14 ">
                <p class="bodyFontTitre text-center sm:text-left text-4xl   ">
                    Créez votre itinéraire<br> facilement
                </p>
                <div class="flex items-center gap-6 w-80">
                    <img src="../assets/img/accueilMap.png" class="iconBody px-2 py-2 rounded-xl w-14">
                    <p class="fontBodyIcon">Choisissez votre destination</p>
                </div>
                <div class="flex items-center gap-6 w-80">
                    <img src="../assets/img/accueilCalendrier.png" class="iconBody px-2 py-2 rounded-xl w-14">
                    <p class="fontBodyIcon">Choisissez vos dates</p>
                </div>
                <div class="flex items-center gap-6 w-80">
                    <img src="../assets/img/accueilNage.png" class="iconBody px-2 py-2 rounded-xl w-14">
                    <p class="fontBodyIcon">Rajoutez les activités de votre choix</p>
                </div>
            </div>
            <div class="bodyImg  rounded-xl">
                <img src="../assets/img/accueilCarte.png" class="w-96 h-full rounded-xl">
            </div>
        </div>

        <div class="flex-wrap wfull flex flex-col  justify-center my-16 ">
            <p class="fontBody2 uppercase text-4xl text-center">Nos services proposes</p>

            <div class="flex justify-center gap-2 sm:gap-10 flex-wrap items-center  ">
                <div class="w-auto p-10 m-1 sm:m-5 justify-center items-center hover:rounded-xl hover:bg-white hover:cursor-pointer">
                    <div class="flex justify-center items-center">
                        <img src="../assets/img/accueilBasCalendrier.png" class="w-36">
                    </div>
                    <p class="fontIconBas mt-2 text-center">
                        Gérer votre temps
                    </p>
                </div>
                <div class="w-auto p-10 m-1 sm:m-5  justify-center items-center hover:rounded-xl hover:bg-white hover:cursor-pointer">
                    <div class="flex justify-center items-center">
                        <img src="../assets/img/accueilBasDollar.png" class="w-36">
                    </div>
                    <p class="fontIconBas mt-2 text-center">
                        Economie
                    </p>
                </div>
                <div class="w-auto p-10 m-1 sm:m-5 justify-center items-center hover:rounded-xl hover:bg-white hover:cursor-pointer">
                    <div class="flex justify-center items-center">
                        <img src="../assets/img/accueilBasMondial.png" class="w-36">
                    </div>
                    <p class="fontIconBas mt-2 text-center">
                        Mondial
                    </p>
                </div>
                <div class="w-auto p-10 m-1 sm:m-5 justify-center items-center hover:rounded-xl hover:bg-white hover:cursor-pointer">
                    <div class="flex justify-center items-center">
                        <img src="../assets/img/accueilBasEngrenage.png" class="w-36">
                    </div>
                    <p class="fontIconBas mt-2 text-center">
                        Organisation
                    </p>
                </div>
            </div>
        </div>

        <div class="flex wfull flex-wrap flex-col md:flex-row bg-zinc-200 items-center justify-around h-auto ">
            <div class=" flex flex-col justify-start items-center mb-5 ">
                <img src="../assets/img/logo.png" class="w-60 my-6">
                <div class="flex gap-10 ">
                    <img src="../assets/img/footerInsta.png" class="h-10 w-10">
                    <img src="../assets/img/footerX.png" class="h-10 w-10">
                    <img src="../assets/img/footerMeta.png" class="h-10 w-10">
                </div>
            </div>
            <div class=" flex flex-col justify-center items-center ">
                <p class="py-4">Mentions Légales</p>
                <p class="py-4">Conditions générales</p>
                <p class="py-4">Politique de confdentialité</p>
            </div>
            <div class=" flex justify-center items-center">
                <p>© Copyright 2024,Tous droits réservés.</p>
            </div>
        </div>

    </div>

</template>


<script setup>
import { AnOutlinedMenu } from '@kalimahapps/vue-icons';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const open = ref(false)
const togglemenu = () =>{
    open.value = !open.value
}

const connexion = () => {
    router.push('/login')
}
const register = () => {
    router.push('/register')
}
</script>


<style scoped lang="scss">
@import "@/style/variablecouleur.scss";
@import "@/style/variableFont.scss";
.btn {
    background-color: $gris;
}

.nn{
    background-color: #efefef;
}
.btn:hover {
    background-color: $grisFonce;
}

.ban {
    background-color: $primary;
}

.banFont {
    font-family: $font-pop-bolt;
}

.banImg {
    width: 600px;
}

.banBtn {
    background-color: $btn;
}
.banBtn:hover {
    background-color: #131fa1;
}

.bodyFontTitre, .fontBodyIcon {
    font-family: $font-pop;
}
.iconBody {
    background-color: $primary;
}
.bodyImg {
    box-shadow: 0px 9px 22px -9px rgba(0,0,0,0.75);
}

.fontBody2, .fontIconBas {
    font-family: $font-pop-bolt;
}


</style>