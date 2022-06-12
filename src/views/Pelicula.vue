<template>
    <div
      :style="{
        'background-image': `url(${background})`,
        'background-size': 'cover'
      }"
    >
        <UserHeaderBar />
        <br><br>
        <v-container class="white--text">
            <v-row>
                <v-col
                    cols="12"
                    md="3"
                    sm="12"
                >
                    <v-img
                        :src="poster"
                    >
                    
                    </v-img>
                </v-col>
                <v-col
                    align="center"
                    cols="12"
                    md="9"
                    sm="12"
                >
                    <h1>{{pelicula.nombre}}</h1>
                    <br><br><br>
                    <v-row>
                        <v-col align="center" cols="12" md="4" class="font-weight-black">
                            <p class="font-weight-light">Duración</p>{{pelicula.duracion}} min
                        </v-col>
                        <v-col align="center" cols="12" md="4" class="font-weight-black">
                            <p class="font-weight-light">Clasificación</p>{{pelicula.clasificacion}}
                        </v-col>
                        <v-col align="center" cols="12" md="4" class="font-weight-black">
                            <p class="font-weight-light">Género</p>{{pelicula.genero}}
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-row>
                        <v-col cols="12" class="font-weight-black text-justify">
                            <p class="font-weight-light">Sinopsis</p>{{pelicula.sinopsis}}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <p class="font-weight-light">Tráiler</p>
                            <iframe width="560" height="315" 
                                :src="video" 
                                title="YouTube video player" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen
                            ></iframe>
                        </v-col>

                    </v-row>
                </v-col>
                <v-col
                    cols="12"
                    md="6"
                >

                    <ElegirAsientos
                        v-show="mostrar"
                        :idPelicula="pelicula.id_pelicula"
                        @elegirFuncion="elegirFuncion($event)"
                        @elegirSala="elegirSala($event)"
                        @elegirAsiento="elegirAsiento($event)"
                    />

                    <div v-show="mostrarCompra" class="center">
                        <v-btn @click="realizarCompra">Realizar compra</v-btn>
                    </div>
                    
                    <div class="center" v-show="reciboCompra">
                        <v-card class="center px-10" color="#F9F3EE"  width="340">
                            <div class="mt-5">
                                <span style="font-size: 16px">⭐</span>
                                <span style="font-size: 24px">⭐</span>
                                <span style="font-size: 16px">⭐</span>
                            </div>
                            <v-img  src="../assets/bandaRecibo.jpg"></v-img>
                            <v-card-title>Recibo de compra</v-card-title>
                            <v-card-text class="pb-0">
                                <p><span class="font-weight-black">Fecha: </span>{{compra.fechaHora}}</p>
                                <p><span class="font-weight-black">No. de Compra: </span>{{compra.id_compra}}</p>
                                <p><span class="font-weight-black">No. de Boletos: </span>{{compra.num_boletos}}</p>
                                <p><span class="font-weight-black">Total: $</span>{{compra.costoTotal}}</p>

                                <p class="text-center mt-10">¡Disfruta tu película!</p>
                            </v-card-text>
                            <v-img class="reciboIcon"  src="../assets/reciboIcon.png"></v-img>
                        </v-card>

                        <div class="center mt-5">
                            <v-btn @click="getBoletos()">Obtener boletos</v-btn>
                        </div>

                    </div>
                    
                </v-col>

                
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import moment from 'moment'
    import router from '../router';
    import UserHeaderBar from '@/components/UserHeaderBar.vue'
    import ElegirFuncion from '@/components/ElegirFuncion.vue'
    import ElegirAsientos from '@/components/ElegirAsientos.vue'

    export default {
        name: 'Pelicula',
        components: {
            UserHeaderBar,
            ElegirFuncion,
            ElegirAsientos
            
        },

        data () {
            return {
                pelicula: {},
                poster: '',
                video: '',

                boletos: {},
                id_funcion: '',
                asientos: [],
                idSala: '',
                compra: {},
                
                nuevaCompra: {
                    num_boletos: '',
                    costoTotal: ''
                },

                nuevoBoleto: {
                    precio: 70,
                    idFuncion: '',
                    idAsientos: '',
                    idCompra: ''
                },

                mostrar: true,
                mostrarCompra: false,
                reciboCompra: false,
                

                background: require('../assets/background.jpg'),
            }
        },

        created() {
            this.getPelicula();
            
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

            async getPelicula() {
                try {
                    var route = '/peliculas/' + this.$route.params.id;
                    const api_data = await this.axios.get(route);
                    this.pelicula = api_data.data[0];
                    var img = this.pelicula.imagen;
                    this.poster = require('../../../cinema_backend/uploads/' + img);    
                    this.video = this.pelicula.trailer             
                } catch (error) {
                    console.log(error);
                }
            },

            elegirFuncion(id_funcion) {
                this.id_funcion = id_funcion;
            },

            elegirSala(idSala) {
                this.idSala = idSala;
            },

            elegirAsiento(asiento) {
                this.asientos.push(asiento);
                this.mostrarCompra = true;
            },

            async realizarCompra() {
                this.nuevaCompra.num_boletos = this.asientos.length;
                this.nuevaCompra.costoTotal = this.asientos.length * 70;
                try {
                    const api_data = await this.axios.post('/compras/nueva_compra/', this.nuevaCompra);
                    this.compra = api_data.data[0];
                    this.compra.fechaHora = moment(this.compra.fechaHora).format("DD/MM/YYYY HH:MM");
                    this.nuevoBoleto.idCompra = this.compra.id_compra;
                    this.nuevoBoleto.idFuncion = this.id_funcion;
                    this.generarBoletos();
                } catch (error) {
                    console.log(error)
                }
            },

            apartarAsientos() {
                try {
                    this.nuevoBoleto.idAsientos.forEach(async (element) => {
                        var route = '/asientos/editar_asiento/' + this.idSala + '/' + element;
                        await this.axios.post(route);
                    });
                } catch (error) {
                    console.log(error.response)
                }
            },

            async generarBoletos() {
                this.nuevoBoleto.idAsientos = this.asientos;
                try {
                    await this.axios.post('/boletos/nuevo_boleto/', this.nuevoBoleto);
                    this.apartarAsientos();
                    this.mostrar = false;
                    this.mostrarCompra = false;
                    this.reciboCompra = true;
                    
                } catch (error) {
                    console.log(error)
                }
            },

            getBoletos() {
                router.push({ 
                    name: 'Boletos',
                    params: {idCompra: this.compra.id_compra}
                });
            }
        },
    }
</script>

<style scoped>
    h1 {
        font-size: 48px;
    }

    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .reciboIcon {
        margin-bottom: 15px;
        width: 40px;
        height: 40px;
    }
</style>