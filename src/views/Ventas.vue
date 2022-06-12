<template>
    <div
      :style="{
        'background-image': `url(${background})`,
        'background-size': 'cover'
      }"
    >
        <AdminHeaderBar />
        <br>
        <h1 class="text-center white--text">Ventas: </h1>
        <br>
        <v-container>
            <v-row>
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-menu
                        v-model="menuFecha"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="fecha"
                                label="Fecha"
                                prepend-inner-icon="mdi-calendar"
                                solo
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>

                        <v-date-picker
                            color="#84287B"
                            v-model="fecha"
                            @input="menuFecha = false"
                            @change="getVentas()"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>

            <v-row>
                <v-col
                    cols="12"
                >
                    <v-data-table
                        :headers="encabezados"
                        :items="ventas"
                        :items-per-page="5"
                    >
                    </v-data-table>
                    <hr>
                    <v-card class="text-center">
                        <v-row>
                            <v-col
                                cols="6"
                            >
                                <p><span class="font-weight-black">Ventas realizadas: </span>{{ventas.length}}</p>
                            </v-col>

                            <v-col
                                cols="6"
                            >
                                <p><span class="font-weight-black">Total de ingresos: </span>${{total.suma}}</p>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <br><br><br><br><br><br><br><br><br><br><br><br>
    </div>
</template>

<script>
    import moment from 'moment'
    import AdminHeaderBar from '@/components/AdminHeaderBar.vue'

    export default ({
        name: 'Funciones',
        components: {
            AdminHeaderBar
        },

        data() {
            return {
                encabezados: [
                    { text: 'ID', value: 'id_compra' },
                    { text: '# de boletos', value: 'num_boletos' },
                    { text: 'Costo', value: 'costoTotal' },
                ],

                ventas: [],
                menuFecha: false,
                fecha: '',
                total: {
                    suma: ''
                },

                background: require('../assets/background.jpg')
            }
        },

        methods: {
            async getVentas() {
                try {
                    var route = '/compras/ventas/' + this.fecha;
                    const api_data = await this.axios.get(route);
                    this.ventas = api_data.data;
                    this.getTotal();
                } catch (error) {
                    console.log(error);
                }
            },

            async getTotal() {
                try {
                    var route = '/compras/ventas/total/' + this.fecha;
                    const api_data = await this.axios.get(route);
                    this.total = api_data.data;
                } catch (error) {
                    console.log(error);
                }
            }
        },
    })

</script>