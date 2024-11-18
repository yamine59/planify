<template>
    <div>
        <div class="bgn flex flex-col items-center" v-if="user.username">
            <div @click="logout" class="w-80 mb-20">
                <img src="./../assets/img/Logo_en_blanc.png">
            </div>
    
            <div class="flex flex-col h-full justify-between">
                <div>
                    <div @click="travel" class="flex hn rounded-lg items-center text-white gap-3 p-5 w-80 cursor-pointer">
                        <div class="flex gap-4">
                            <CgProfile class="h-6 w-6 " />
                            <p>Mes voyages</p>
                        </div>
                        <FlIOsArrowRtl class="h-4 w-4 " />
                    </div>
                    <div @click="createtravel" class="flex hn rounded-lg items-center text-white gap-3 p-5 w-80 cursor-pointer">
                        <div class="flex gap-4"> 
                            <img src="./../assets/img/wallet.png">
                            <p>Organiser un voyage</p>
                        </div>
                        <FlIOsArrowRtl class="h-4 w-4 " />
                    </div>
                    <div @click="contact" class="flex hn rounded-lg items-center text-white gap-3 p-5 w-80 cursor-pointer ">
                        <div class="flex gap-4">
                            <img src="./../assets/img/message.png">
                            <p>Contact</p>
                        </div>
                        <FlIOsArrowRtl class="h-4 w-4 " />
                    </div>
                </div>
    
                <div class="flex rounded-lg justify-between text-white p-4 w-80 ">
                    <div @click="profil" class="flex hn rounded-lg items-center text-white gap-3 p-5">
                        <div class="cursor-pointer">
                            <p>{{ user.username }}</p>
                        </div>
                        <div class="cursor-pointer">
                            <FlIOsArrowRtl class="h-4 w-4 "/>
                        </div>
                    </div>
    
                    <div @click="logout" class="hover:bg-red-500 rounded-lg text-white p-5 ">
                        <LuLogOut />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import router from '@/router';
import store from '@/store';
import { CgProfile, FlIOsArrowRtl, LuLogOut } from '@kalimahapps/vue-icons';
import { computed } from 'vue';
const user = computed(() => store.state.user || {});
const userId = computed(() => store.state.user?.id || null);
const travel = () => {
    router.push('/voyage')
}
const createtravel = () => {
    router.push('/createTravel')
}
const contact = () => {
    router.push('/contact')
}

const profil = () => {
    router.push(`/myProfil/${userId.value}`)
}

const logout = () => {
    store.dispatch('logout'); // Call the logout action in Vuex
    router.push('/'); // Redirect to the login page
};
</script>
<style scoped lang="scss">
@import "@/style/variablecouleur.scss";
@import "@/style/variableFont.scss";

.bgn {
    font-family: $font-pop;
    background-color: $primary;
    width: 350px;
    min-height: 100vh;
    height: 100%;
}

.hn:hover {
    background-color: $btn;
}
</style>