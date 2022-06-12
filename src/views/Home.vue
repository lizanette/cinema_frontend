<template>
    <div
      :style="{
        'background-image': `url(${background})`,
        'background-size': 'cover'
      }"
    >
        <UserHeaderBar />
        <br><br><br>
        <v-container white--text>
            <v-row>
                <v-col
                    cols="12"
                    md="6"
                    sm="12"
                >
                    <br><br><br>
                    <h1>Magic Cinema</h1>
                    <br>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac risus sit amet ante finibus posuere non nec augue. Cras sed dapibus erat. Vivamus vehicula urna a sagittis iaculis.
                    </p>

                    <br>

                    <v-btn
                        x-large
                        dark
                        color="#FA7DF3"
                        @click="cartelera()"
                    >Comprar boletos</v-btn>
                </v-col>

                <v-col
                    cols="12"
                    md="6"
                    sm="12"
                >
                    <v-img
                        src="../assets/homeImg.png"
                        class="ml-10"
                    >
                        
                    </v-img>
                </v-col>
            </v-row>
            <br><br><br><br><br><br>
        </v-container>
    </div>
</template>

<script>
    import router from '../router';
    import UserHeaderBar from '@/components/UserHeaderBar.vue'
    export default {
        name: 'Home',
            components: {
                UserHeaderBar
            },

            data () {
                return {
                    background: require('../assets/background.jpg')
                }
            },

            methods: {
                cartelera() {
                    router.push({ path: '/cartelera' })
                }
            },
    }
</script>

<style scoped>
    h1 {
        font-size: 48px;
    }
    
    p {
        line-height: 2.2;
    }
</style>