<template>

  <v-tabs
    
    background-color="transparent"
    right
    icons-and-text
  >
    <v-tab>
      <router-link :to="{name: 'Peliculas'}" class="white--text">
        Peliculas
      </router-link>
      <v-icon class="mb-3 white--text">mdi-movie-cog</v-icon>
    </v-tab>

    <v-tab class="ml-10">
      <router-link :to="{name: 'Funciones'}" class="white--text">
        Funciones 
      </router-link>
      <v-icon class="mb-3 white--text">mdi-play-box-outline</v-icon>
    </v-tab>

    <v-tab class="ml-10">
      <router-link :to="{name: 'Ventas'}" class="white--text">
        Ventas 
      </router-link>
      <v-icon class="mb-3 white--text">mdi-cash-multiple</v-icon>
    </v-tab>

    <v-tab class="mx-10">
      <router-link :to="{name: 'Login'}" class="white--text">
        <v-btn
          elevation="2"
        >Salir</v-btn> 
      </router-link>
    </v-tab>
  </v-tabs>
  
</template>

<style>
    .white--text {
        text-decoration: none;
    }

    .absolute {
        position: absolute;
        top: 0;
    }

</style>