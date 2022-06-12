<template>
    <div
      :style="{
        'background-image': `url(${background})`,
        'background-size': 'cover'
      }"
    >
        <AdminHeaderBar />
        <br>
        <h1 class="text-center white--text">Peliculas: </h1>
        <br>
        <v-container>
            <div>
                <v-btn @click="np_dialog = true" color='#FA7DF3'>Agregar Película</v-btn>
            </div>
            
            <!-- Diálogo para crear nueva película -->
            <v-dialog
                v-model="np_dialog"
                fullscreen
                transition="dialog-top-transition"
            >
                <v-card color="#F9F3EE">
                    <v-toolbar
                        dark
                        color="#84287B"
                    >
                        <v-btn
                            icon
                            dark
                            @click="cancelarNuevaPelicula()"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    <v-toolbar-title>Nueva Película</v-toolbar-title>
                    </v-toolbar>

                    <v-card-text>
                        <v-container>
                            <br>
                            <v-row>
                                <v-col cols='6'>
                                    <v-text-field 
                                        solo
                                        clearable 
                                        required 
                                        v-model="pelicula_nueva.nombre" 
                                        label='Título'
                                        prepend-inner-icon="mdi-movie-open"
                                    >
                                    </v-text-field>
                                </v-col>

                                <v-col cols='6'>
                                    <v-text-field
                                        solo 
                                        clearable 
                                        required 
                                        v-model="pelicula_nueva.director" 
                                        label='Director'
                                        prepend-inner-icon="mdi-account"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols='3'>
                                    <v-text-field
                                        solo 
                                        clearable 
                                        required 
                                        v-model="pelicula_nueva.duracion" 
                                        label='Duración' 
                                        type='number'
                                        prepend-inner-icon="mdi-clock-time-eight"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols='3'>
                                    <v-text-field 
                                        solo 
                                        clearable 
                                        required 
                                        v-model="pelicula_nueva.anio" 
                                        label='Año' 
                                        type='year'
                                        prepend-inner-icon="mdi-calendar-question"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols='3'>
                                    <v-text-field 
                                        solo 
                                        clearable
                                        required 
                                        v-model="pelicula_nueva.genero" 
                                        label='Género'
                                        prepend-inner-icon="mdi-arrow-projectile-multiple"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols='3'>
                                    <v-select
                                        :items="clasificacion"
                                        label="Clasificación"
                                        v-model="pelicula_nueva.clasificacion"
                                        solo
                                        required
                                        prepend-inner-icon="mdi-alpha-a-box"
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols='12'>
                                    <v-textarea
                                        solo
                                        name="input-7-4"
                                        label="Sinopsis"
                                        v-model="pelicula_nueva.sinopsis"
                                        clearable
                                        auto-grow
                                        required
                                        prepend-inner-icon="mdi-card-text"
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-file-input
                                    v-model="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    label="Póster de la película"
                                    solo
                                    required
                                    @change="archivoSeleccionado()"
                                ></v-file-input>
                            </v-row>
                            
                            <v-row>
                                <v-text-field 
                                    solo 
                                    clearable
                                    required 
                                    v-model="pelicula_nueva.trailer" 
                                    label='Tráiler'
                                    prepend-inner-icon="mdi-video-vintage"
                                >
                                </v-text-field>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn 
                            color="#FA7DF3"
                            @click="agregarPelicula()"
                        >
                            <v-icon>
                                mdi-movie-open-check
                            </v-icon>
                            Guardar
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>

            </v-dialog>

            <br>
            
            <!-- Cartas para mostrar cada película -->
            <v-row>
                <v-col
                    v-for="(pelicula, idx) in peliculas"
                    :key="idx"
                    cols="12"
                    md="6"
                    sm="12"
                >
                    <v-card min-height="410px" color="#F9F3EE">
                        <v-row>
                            <v-col
                                cols="4"
                            >
                                <v-img
                                    :src="getImg(idx)"
                                    class="ml-3"
                                >
                                </v-img>

                            </v-col>
                            <v-col
                                cols="8"
                            >
                                <v-card-title>{{pelicula.nombre}}</v-card-title>
                                <v-card-text>
                                    <v-row align="center">
                                        <v-col cols="12" md="4" class="text-subtitle-1">
                                            {{pelicula.duracion}} min
                                        </v-col>
                                        <v-col cols="12" md="8" class="text-subtitle-1">
                                            Clasificación: <strong>{{pelicula.clasificacion}}</strong>
                                        </v-col>
                                        
                                    </v-row>
                                    <v-row align="center">
                                        <v-col cols="12" md="4" class="text--primary">
                                            {{pelicula.genero}}
                                        </v-col>
                                        <v-col cols="12" md="2" class="text--primary">
                                            {{pelicula.anio}}
                                        </v-col>
                                        <v-col cols="12" md="6" class="text--primary">
                                            Director: {{pelicula.director}}
                                        </v-col>   
                                    </v-row>
                                </v-card-text>
                            </v-col>
                        </v-row>
                        <v-card-text>
                            <div class="text--primary">{{pelicula.sinopsis}}</div>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                class="mx-2"
                                fab
                                dark
                                color="cyan"
                                @click="abrirDialogEditar(pelicula)"
                            >
                                <v-icon>
                                    mdi-pencil
                                </v-icon>
                            </v-btn>

                            <v-btn
                                class="mx-2"
                                fab
                                dark
                                color="error"
                                @click="abrirDialogBorrar(pelicula)"
                            >
                                <v-icon>
                                    mdi-trash-can
                                </v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Diálogo para borrar película -->
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
                    <v-card-title class="text-h5">¿Estás seguro de que deseas borrar esta película? </v-card-title>
                    <v-card-text class="text-center">
                        "{{peliculaBorrar.nombre}}"
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="cyan" @click="borrar_dialog = false">Cancelar</v-btn>
                        <v-btn color="error" @click="borrarPelicula(peliculaBorrar)">Borrar</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- Diálogo para editar película -->
            <v-dialog
                v-model="editar_dialog"
                fullscreen
                transition="dialog-bottom-transition"
            >
                <v-card color="#F9F3EE">
                    <v-toolbar
                        dark
                        color="#84287B"
                    >
                        <v-btn
                            icon
                            dark
                            @click="editar_dialog = false"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    <v-toolbar-title>Editar Película</v-toolbar-title>
                    </v-toolbar>

                    <v-card-text>
                        <v-container>
                            <br>
                            <v-row>
                                <v-col cols='6'>
                                    <v-text-field 
                                        solo
                                        clearable 
                                        required 
                                        v-model="peliculaEditar.nombre" 
                                        label='Título'
                                        prepend-inner-icon="mdi-movie-open"
                                    >
                                    </v-text-field>
                                </v-col>

                                <v-col cols='6'>
                                    <v-text-field
                                        solo 
                                        clearable 
                                        required 
                                        v-model="peliculaEditar.director" 
                                        label='Director'
                                        prepend-inner-icon="mdi-account"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols='3'>
                                    <v-text-field
                                        solo 
                                        clearable 
                                        required 
                                        v-model="peliculaEditar.duracion" 
                                        label='Duración' 
                                        type='number'
                                        prepend-inner-icon="mdi-clock-time-eight"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols='3'>
                                    <v-text-field 
                                        solo 
                                        clearable 
                                        required 
                                        v-model="peliculaEditar.anio" 
                                        label='Año' 
                                        type='year'
                                        prepend-inner-icon="mdi-calendar-question"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols='3'>
                                    <v-text-field 
                                        solo 
                                        clearable
                                        required 
                                        v-model="peliculaEditar.genero" 
                                        label='Género'
                                        prepend-inner-icon="mdi-arrow-projectile-multiple"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols='3'>
                                    <v-select
                                        :items="clasificacion"
                                        label="Clasificación"
                                        v-model="peliculaEditar.clasificacion"
                                        solo
                                        prepend-inner-icon="mdi-alpha-a-box"
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols='12'>
                                    <v-textarea
                                        solo
                                        name="input-7-4"
                                        label="Sinopsis"
                                        v-model="peliculaEditar.sinopsis"
                                        clearable
                                        auto-grow
                                        prepend-inner-icon="mdi-card-text"
                                    ></v-textarea>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-text-field 
                                    solo 
                                    clearable
                                    required 
                                    v-model="peliculaEditar.trailer" 
                                    label='Trailer'
                                    prepend-inner-icon="mdi-video-vintage"
                                    >
                                    </v-text-field>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn 
                            color="#FA7DF3"
                            @click="editarPelicula(peliculaEditar)"
                        >
                            <v-icon>
                                mdi-movie-open-check
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
    import AdminHeaderBar from '@/components/AdminHeaderBar.vue'

    export default {
        name: 'Peliculas',
        components: {
            AdminHeaderBar
        },

        data () {
            return {
                peliculas: [],

                clasificacion: ['AA', 'A', 'B', 'B15', 'C', 'D'],
                
                np_dialog: false,
                borrar_dialog: false,
                editar_dialog: false,

                pelicula_nueva: {
                    nombre: '',
                    duracion: '',
                    anio: '',
                    sinopsis: '',
                    genero: '',
                    clasificacion: '',
                    director: '',
                    imagen: '',
                    trailer: ''
                },

                file: null,
                peliculaBorrar: {},
                peliculaEditar: {},

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

            cancelarNuevaPelicula() {
                this.pelicula_nueva = {};
                this.np_dialog = false;
            },

            cancelarPeliculaEditar() {
                this.peliculaEditar = {};
                this.editar_dialog = false;
            },

            archivoSeleccionado() {
                this.pelicula_nueva.imagen = this.file.name
            },

            async subirImagen() {
                try {
                    const formData = new FormData();
                    formData.append('image', this.file, this.file.name);
                    
                    await this.axios.post('/peliculas/subir_imagen/', formData);
                    console.log('File uploaded')
                    this.file = null

                } catch (error) {
                    console.log(error);
                }
            },

            async agregarPelicula() {
                try {
                    await this.axios.post('/peliculas/nueva_pelicula/', this.pelicula_nueva);
                    this.subirImagen();
                    this.getPeliculas();
                    this.cancelarNuevaPelicula();
                } catch (error) {
                    console.log(error.response)
                }
            },

            getImg(index) {
                var img = this.peliculas[index].imagen;
                var ruta = require('../../../cinema_backend/uploads/' + img);
                return ruta;
            },

            abrirDialogBorrar(peliculaABorrar) {
                this.borrar_dialog = true;
                this.peliculaBorrar = peliculaABorrar;
            },

            async borrarPelicula(pelicula) {
                try {
                    const body = {id_pelicula: pelicula.id_pelicula, imagen: pelicula.imagen};
                    await this.axios.post('/peliculas/eliminar_pelicula/', body);
                    this.borrar_dialog = false;
                    this.getPeliculas();
                    this.peliculaBorrar = {}
                } catch (error) {
                    console.log(error.response)
                }
            },

            abrirDialogEditar(peliculaAEditar) {
                this.editar_dialog = true;
                this.peliculaEditar = peliculaAEditar;
            },

            async editarPelicula(pelicula) {
                try {
                    await this.axios.post('/peliculas/editar_pelicula/', pelicula);
                    this.getPeliculas();
                    this.cancelarPeliculaEditar();
                } catch (error) {
                    console.log(error.response)
                }
            },

        },

    }
</script>
