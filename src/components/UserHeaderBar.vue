<template>
    <v-tabs
        background-color="transparent"
        right
    >
        <v-tab>
            <router-link :to="{name: 'Home'}" class="white--text">
                Home
            </router-link>
        </v-tab>

        <v-tab class="ml-10">
            <router-link :to="{name: 'Cartelera'}" class="white--text">
                Cartelera 
            </router-link>
        </v-tab>

        <v-tab class="mx-10">
            <router-link :to="{name: 'Login'}" class="white--text">
                <v-btn
                    elevation="2"
                >Administrador</v-btn> 
            </router-link>
        </v-tab>
    </v-tabs>
</template>

<style scoped>
    .white--text {
        text-decoration: none;
    }
</style>