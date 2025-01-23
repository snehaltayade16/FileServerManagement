<script setup>
    import Login from './components/login.vue';
    import Home from './components/Home.vue';
</script>

<template>
    <!-- <router-link to="/login">Login</router-link>
    <router-link to="/main">Main</router-link>
    <router-view></router-view> -->
    <!-- <Login /> -->
    <!-- <Home /> -->
    <router-view v-slot="{ Component, route }">
        <transition :enter-active-class="route.meta.enterClass" :leave-active-class="route.meta.leaveClass">
            <component :is="Component" class="!select-none" />
        </transition>
    </router-view>
</template>

<style scoped>

</style>