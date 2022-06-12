<template>
    <div
      :style="{
        'background-image': `url(${background})`,
        'background-size': 'cover'
      }"
    >
        <UserHeaderBar />
        <v-container class="white--text">
            <v-row>
                <v-col>
                    <br>
                    <h1>Películas disponibles</h1>
                </v-col>
            </v-row>

            <v-row>
                <v-col
                    v-for="(pelicula, idx) in peliculas"
                    :key="idx"
                    cols="12"
                    md="3"
                    sm="6"
                >
                    <router-link :to="{name: 'Pelicula', params: {id: pelicula.id_pelicula}}" class="white--text">
                        <v-img
                            :src="getImg(idx)"
                            min-height="400px"
                        > 
                        </v-img>
                    </router-link>
                </v-col>
            </v-row>
            <br><br><br><br><br><br><br><br><br>
        </v-container>
    </div>
</template>

<script>
    import UserHeaderBar from '@/components/UserHeaderBar.vue'
    export default {
        name: 'Cartelera',
        components: {
            UserHeaderBar
        },
        data () {
            return {
                peliculas: [],

                background: require('../assets/background.jpg')
            }
        },

        created() {
            this.getPeliculas();
        },

        methods: {
            async getPeliculas() {
                try {
                    const api_data = await this.axios.get('/peliculas');
                    this.peliculas = api_data.data;
                } catch (error) {
                    console.log(error.response)
                }
            },

            getImg(index) {
                var img = this.peliculas[index].imagen;
                var ruta = require('../../../cinema_backend/uploads/' + img);
                return ruta;
            },

        }
    }
</script>