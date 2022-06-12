<template>
    <div
      :style="{
        'background-image': `url(${background})`,
        'background-size': 'cover'
      }"
    >
        <AdminHeaderBar />
        <br>
        <h1 class="text-center white--text">Funciones: </h1>
        <br>
        <v-container>
            <v-row>
                <v-spacer></v-spacer>
                <v-btn @click="nf_dialog = true" color='#FA7DF3'>Agregar Función</v-btn>
            </v-row>

            <v-row>
                <v-col
                    cols="12"
                    md="6"
                    sm="12"
                >
                    <v-select
                        :items="peliculasValores"
                        v-model="idPelicula"
                        label="Pelicula"
                        solo
                        required
                        @input="getFunciones()"
                        @change="getImg(idPelicula - 1)"
                    >
                        
                    </v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-img
                        :src="img"
                        max-width="300"
                        max-height="400"
                    >
                    </v-img>
                </v-col>
                <v-col
                    cols="12"
                    md="8"
                >
                    <v-data-table
                        :headers="encabezados"
                        :items="funciones"
                    >

                         <template v-slot:[`item.actions`]="{ item }">
                             <v-btn
                                class="mx-2"
                                small
                                fab
                                dark
                                color="cyan"
                                @click="abrirDialogEditar(item)"
                            >
                                <v-icon>
                                    mdi-pencil
                                </v-icon>
                            </v-btn>

                            <v-btn
                                class="mx-2"
                                small
                                fab
                                dark
                                color="error"
                                @click="abrirDialogBorrar(item)"
                            >
                                <v-icon>
                                    mdi-trash-can
                                </v-icon>
                            </v-btn>
                        </template>

                    </v-data-table>
                </v-col>
            </v-row>
            <br><br><br><br><br><br><br><br><br><br><br><br>

            <!-- Diálogo para agregar una función -->
            <v-dialog
                v-model="nf_dialog"
                max-width="600px"
            >
                <v-card color="#F9F3EE">
                    <v-toolbar
                            dark
                            color="#84287B"
                        >
                            <v-toolbar-title>Nueva Función</v-toolbar-title>
                    </v-toolbar>
                    <br>
                    <v-card-text>
                        <v-row>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-select
                                    :items="peliculasValores"
                                    v-model="funcion_nueva.idPelicula"
                                    label="Pelicula"
                                    solo
                                    required
                                    prepend-inner-icon="mdi-movie-open"
                                >
                                </v-select>
                            </v-col>

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
                                            v-model="funcion_nueva.fecha"
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
                                        v-model="funcion_nueva.fecha"
                                       @input="menuFecha = false"

                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-menu
                                    v-model="menuHora"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="funcion_nueva.hora"
                                            label="Hora"
                                            prepend-inner-icon="mdi-clock"
                                            readonly
                                            solo
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-time-picker
                                        color="#84287B"
                                        v-model="funcion_nueva.hora"
                                        @input="menuHora = false"
                                    ></v-time-picker>
                                </v-menu>
                            </v-col>

                             <v-col
                                cols="12"
                                md="6"
                            >
                                <v-select
                                        :items="formatos"
                                        label="Formato"
                                        v-model="funcion_nueva.formato"
                                        solo
                                        required
                                        prepend-inner-icon="mdi-folder-information"
                                ></v-select>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-select
                                    :items="salas"
                                    v-model="funcion_nueva.idSala"
                                    label="Sala"
                                    solo
                                    required
                                    prepend-inner-icon="mdi-bed-double-outline"
                                >
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn 
                            color="error"
                            @click="cancelarFuncionNueva()"
                        >
                            Cancelar
                        </v-btn>

                        <v-btn 
                            color="#FA7DF3"
                            @click="agregarFuncion()"
                        >
                            <v-icon>
                                mdi-play-box-outline
                            </v-icon>
                            Guardar
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>

            </v-dialog>

            <!-- Diálogo para borrar función -->
            <v-dialog
                v-model="borrar_dialog"
                persistent
                max-width="600"
            >
                <v-card color="#F9F3EE">
                    <v-toolbar
                        color="#84287B"
                        dark
                    ></v-toolbar>
                    <v-card-title class="text-h5">¿Estás seguro de que deseas borrar esta función? </v-card-title>
                    <br>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="cyan" @click="borrar_dialog = false">Cancelar</v-btn>
                        <v-btn color="error" @click="borrarFuncion(funcionBorrar)">Borrar</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- Diálogo para editar función -->
            <v-dialog
                v-model="editar_dialog"
                max-width="600px"
            >
                <v-card color="#F9F3EE">
                    <v-toolbar
                            dark
                            color="#84287B"
                        >
                            <v-toolbar-title>Editar Función</v-toolbar-title>
                    </v-toolbar>
                    <br>
                    <v-card-text>
                        <v-row>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-select
                                    :items="peliculasValores"
                                    v-model="funcionEditar.idPelicula"
                                    label="Pelicula"
                                    solo
                                    required
                                    prepend-inner-icon="mdi-movie-open"
                                >
                                </v-select>
                            </v-col>

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
                                            v-model="funcionEditar.fecha"
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
                                        v-model="funcionEditar.fecha"
                                       @input="menuFecha = false"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-menu
                                    v-model="menuHora"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="funcionEditar.hora"
                                            label="Hora"
                                            prepend-inner-icon="mdi-clock"
                                            solo
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-time-picker
                                        color="#84287B"
                                        v-model="funcionEditar.hora"
                                        @input="menuHora = false"
                                    ></v-time-picker>
                                </v-menu>
                            </v-col>

                             <v-col
                                cols="12"
                                md="6"
                            >
                                <v-select
                                        :items="formatos"
                                        label="Formato"
                                        v-model="funcionEditar.formato"
                                        solo
                                        required
                                        prepend-inner-icon="mdi-folder-information"
                                ></v-select>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-select
                                    :items="salas"
                                    v-model="funcionEditar.idSala"
                                    label="Sala"
                                    solo
                                    required
                                    prepend-inner-icon="mdi-bed-double-outline"
                                >
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn 
                            color="error"
                            @click="editar_dialog = false"
                        >
                            Cancelar
                        </v-btn>

                        <v-btn 
                            color="#FA7DF3"
                            @click="editarFuncion(funcionEditar)"
                        >
                            <v-icon>
                                mdi-play-box-outline
                            </v-icon>
                            Guardar
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>

            </v-dialog>
        </v-container>
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

        data () {
            return {
                encabezados: [
                    { text: 'Fecha', value: 'fecha' },
                    { text: 'Hora', value: 'hora' },
                    { text: 'Formato', value: 'formato' },
                    { text: 'Sala', value: 'idSala' },
                    { text: 'Acciones', value: 'actions'}
                ],
                peliculasValores: [],
                peliculas: [],
                img: '',
                salas: [],

                idPelicula: 0,
                funciones: [],
                funcion_nueva: {
                    fecha: '',
                    hora: '',
                    formato: '',
                    idPelicula: '',
                    idSala: ''
                },

                funcionBorrar: {},
                funcionEditar: {
                    fecha: '',
                    hora: '',
                    formato: '',
                    idPelicula: '',
                    idSala: ''
                },
                
                nf_dialog: false,
                borrar_dialog: false,
                editar_dialog: false,

                formatos: ['Español', 'Subtitulada'],

                menuFecha: false,
                menuHora: false,

                background: require('../assets/background.jpg')
            }
        },

        created() {
            this.getPeliculas();
            this.getSalas();
        },

        methods: {
            async getPeliculas() {
                try {
                    const api_data = await this.axios.get('/peliculas');
                    this.peliculas = api_data.data;
                    api_data.data.forEach((item) => {
                        this.peliculasValores.push({
                            text: item.nombre,
                            value: item.id_pelicula
                        });
                    })
                } catch (error) {
                    console.log(error)
                }
            },

            async getFunciones() {
                try {
                    var route = '/funciones/pelicula/' + this.idPelicula;
                    const api_data = await this.axios.get(route);
                    this.funciones = api_data.data;
                    for (var i = 0; i < this.funciones.length; i++)
                        this.funciones[i].fecha = moment(this.funciones[i].fecha).format("DD/MM/YYYY");
                } catch (error) {
                    console.log(error);
                }
            },

            async getSalas() {
                try {
                    const api_data = await this.axios.get('/salas');
                    api_data.data.forEach((item) => {
                        this.salas.push({
                            text: item.id_sala + " -> " + item.tipo,
                            value: item.id_sala
                        });
                    })
                } catch (error) {
                    console.log(error)
                }
            },

            getImg(index) {
                var img = this.peliculas[index].imagen;
                var ruta = require('../../../cinema_backend/uploads/' + img);
                this.img = ruta;
            },

            cancelarFuncionNueva() {
                this.funcion_nueva = {};
                this.nf_dialog = false;
            },

            cancelarEditarFuncion() {
                this.funcionEditar = {};
                this.editar_dialog = false;
            },

            async agregarFuncion() {
                try {
                    await this.axios.post('/funciones/nueva_funcion/', this.funcion_nueva);
                    this.idPelicula = this.funcion_nueva.idPelicula;
                    this.getFunciones();
                    this.cancelarFuncionNueva();
                } catch (error) {
                    console.log(error)
                }
            },

            abrirDialogBorrar(funcionABorrar) {
                this.borrar_dialog = true;
                this.funcionBorrar = funcionABorrar
            },

            async borrarFuncion(funcion) {
                try {
                    const body = {id_funcion: funcion.id_funcion};
                    await this.axios.post('/funciones/eliminar_funcion/', body);
                    this.borrar_dialog = false;
                    this.peliculaBorrar = {}
                    this.idPelicula = funcion.idPelicula;
                    this.getFunciones();
                } catch (error) {
                    console.log(error)
                }
            },

            abrirDialogEditar(funcionAEditar) {
                this.funcionEditar = funcionAEditar
                this.funcionEditar.fecha = moment(this.funcionEditar.fecha, "DD/MM/YYYY").format("YYYY-MM-DD");
                this.editar_dialog = true;
            },

            async editarFuncion(funcion) {
                try {
                    console.log(funcion)
                    await this.axios.post('/funciones/editar_funcion/', funcion);
                    this.idPelicula = funcion.idPelicula;
                    this.getFunciones();
                    this.cancelarEditarFuncion();
                } catch (error) {
                    console.log(error.response)
                }
            },
        },
    })
</script>

<style scoped>
  .background, .v-application--wrap {
    background-color: #F9F3EE;
  }
</style>
