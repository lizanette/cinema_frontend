<template>
    <div
      :style="{
        'background-image': `url(${background})`,
        'background-size': 'cover'
      }"
    >
        <UserHeaderBar />
        <br>
        <h1 class="text-center white--text">Boletos adquiridos: </h1>
        <br><br><br>
        <v-container>
            <v-row>
                <v-col
                    v-for="(boleto, idx) in boletos"
                    :key="idx"
                    cols="12"
                    md="6"
                    sm="12"
                >
                    <v-card
                        color="#F9F3EE"
                        width="420"
                        height="160"
                        class="boleto"
                    >
                        <v-row>
                            <v-col
                                cols="4"                
                            >
                                <v-col
                                    cols="3"                
                                >
                                    <v-img class="banda" src="../assets/bandaBoleto.png"></v-img>
                                </v-col>

                                <v-col
                                    class="right"
                                    cols="9"
                                >
                                    <v-col
                                        cols="12"
                                    >
                                        <v-img class="icon" src="../assets/ticketIcon.png"></v-img>
                                    </v-col>
                                    <v-col
                                        id="datos"
                                        cols="12"
                                    >
                                        <p class="informacion">
                                            <strong>Boleto: </strong>{{boleto.id_boleto}} <br>
                                            <strong>Función: </strong>{{funcion.id_funcion}} <br>
                                            <strong>Asiento: </strong>{{boleto.idAsiento}}
                                        </p>

                                        <barcode 
                                            v-model="idCompra"
                                            width="1"
                                            height="10"
                                            displayValue="true"
                                            fontSize="5"
                                            background="#F9F3EE"
                                        ></barcode>
                                    </v-col>
                                </v-col>
                                
                            </v-col>

                            <v-col
                                id="client-side"
                                cols="8"
                            >
                                <v-row>
                                    <v-col
                                        style="padding: 0"
                                        cols="6"
                                    >
                                        <v-col align="center"
                                            style="padding: 0;"
                                            cols="12"
                                        >
                                            <span style="font-size: 12px">⭐</span>
                                            <span style="font-size: 18px">⭐</span>
                                            <span style="font-size: 12px">⭐</span>

                                        </v-col>

                                        <v-col
                                            align="center"
                                            style="padding: 0; font-size: 10px;"
                                            cols="12"
                                        >
                                            <strong
                                                style="font-size: 12px"
                                            >{{nombrePelicula}}</strong>
                                            <br>
                                            
                                            <div style="position: absolute; bottom: 5px" align="left" class="px-3">
                                                <div class="mt-3">
                                                    <strong>Sala: </strong>7
                                                    <strong class="ml-2">Asiento: </strong>{{boleto.idAsiento}}
                                                </div>
                                                <div>
                                                    <strong>Fecha: </strong>{{funcion.fecha}}
                                                </div>
                                                
                                                <div>
                                                    <strong>Hora: </strong>{{funcion.hora}}
                                                    
                                                </div>
                                                <div>
                                                    <strong>Precio: </strong>$70
                                                </div>
                                            </div>
                                            
                                        </v-col>
                                        

                                    </v-col>

                                    <v-col
                                        cols="6"
                                    >
                                        <v-img class="ticketImg" src="../assets/ticketImg.png"></v-img>
                                    </v-col>
                                </v-row>
                                
                            </v-col>
                        </v-row>
                        
                        
                    </v-card>
                </v-col>
            </v-row>
            
            <v-row class="mt-10">
                <v-spacer></v-spacer>
                <v-btn
                    x-large
                    dark
                    color="#FA7DF3"
                    @click="regresar()"
                >Regresar al menú principal</v-btn>
            </v-row>

            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        </v-container>
        
    </div>
</template>

<script src="JsBarcode.all.min.js"></script>

<script>
    import moment from 'moment'
    import router from '../router';
    import VueBarcode from 'vue-barcode';
    import UserHeaderBar from '@/components/UserHeaderBar.vue'

    export default {
        name: 'Boletos',
        components: {
            'barcode': VueBarcode,
            UserHeaderBar
        },

        created() {
            this.getBoletos(); 
        },

        data() {
            return {
                id: '1',
                idCompra: '',
                boletos: [],
                funcion: {},
                nombrePelicula: '',
                background: require('../assets/background.jpg'),
            }
        },

        methods: {
            async getBoletos() {
                this.idCompra = this.$route.params.idCompra;
                try {
                    var route = '/boletos/' + this.idCompra;
                    const api_data = await this.axios.get(route);
                    this.boletos = api_data.data;      
                    this.getFuncion();
                } catch (error) {
                    console.log(error);
                }
            },

            async getFuncion(){
                try {
                    var route = '/funciones/' + this.boletos[0].idFuncion;
                    const api_data = await this.axios.get(route);
                    this.funcion = api_data.data[0];
                    this.funcion.fecha = moment(this.funcion.fecha).format("DD/MM/YYYY");    
                    this.getPelicula();  
                } catch (error) {
                    console.log(error);
                }
            },

            async getPelicula() {
                try {
                    var route = '/peliculas/' + this.funcion.idPelicula;
                    const api_data = await this.axios.get(route);
                    this.nombrePelicula = api_data.data[0].nombre;      
                } catch (error) {
                    console.log(error);
                }
            },

            regresar() {
                router.push({ path: '/home' });
            } 
        },
            
    }
</script>

<style scoped>
    .boleto {
        border-radius: 12px;
    }

    .banda {
        height: 160px;
        width: 30px;
        position: absolute;
        top: 0px;
        left: 10px;
    }

    .right {
        margin-left: 40px; 
        padding: 0;
    }

    .informacion {
        font-size: 10px;
        margin-bottom: 0px
    }

    .icon {
        height: 60px;
        width: 60px;
        position: absolute;
        top: 1px;
        left: 50px;
    }

    #client-side{
        border-left: dotted 2px black;

    }

    #datos {
        padding: 0px 0 0 10px;
    }

    .ticketImg {
        position: absolute;
        top: 0px;
        right: -5px;
        height: 150px;
        width: 150px;
    }


</style>