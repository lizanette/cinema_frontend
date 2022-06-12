<template>
    <transition name="fade">
        <div v-if="eligioFuncion">
            <v-col>
                <p class="font-weight-light">Funciones</p>
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
                        @change="getFunciones()"
                    ></v-date-picker>
                </v-menu>
            </v-col>
            <v-row v-show="funcionesEs.length > 0" class="ml-3 font-weight-black">Español:</v-row>
            <v-row class="ml-3" id="funciones">
                <v-col
                    v-for="funcion in funcionesEs"
                    :key="funcion.id_funcion"
                    cols="2"
                    class="funcion"
                >
                    <v-btn small @click="elegirFuncion(funcion.id_funcion)">{{funcion.hora}}</v-btn>
                </v-col>
            </v-row>
            <v-row><br></v-row>
            <v-row v-show="funcionesSub.length > 0" class="ml-3 font-weight-black">Subtitulada:</v-row>
            <v-row class="ml-3" id="funciones">
                <v-col
                    v-for="funcion in funcionesSub"
                    :key="funcion.id_funcion"
                    cols="2"
                    class="funcion"
                >
                    <v-btn small @click="elegirFuncion(funcion.id_funcion)">{{funcion.hora}}</v-btn>
                </v-col>
            </v-row>
        </div>
    </transition>
    
</template>

<script>
import moment from 'moment'
export default {
    props: {
        idPelicula: Number
    },

    data () {
        return {
            funcionesSub: {},
            funcionesEs: {},
            menuFecha: false,
            fecha: '',

            eligioFuncion: true
        }
    },

    methods: {
        getFunciones() {
            this.getFuncionesSub();
            this.getFuncionesEs();
        },

        async getFuncionesSub() {
            try {
                var route = '/funciones/sub/' + this.idPelicula + '/' + this.fecha;
                const api_data = await this.axios.get(route);
                this.funcionesSub = api_data.data;
                for (var i = 0; i < this.funcionesSub.length; i++)
                    this.funcionesSub[i].fecha = moment(this.funcionesSub[i].fecha).format("DD/MM/YYYY");
            } catch (error) {
                console.log(error);
            }
        },

        async getFuncionesEs() {
            try {
                var route = '/funciones/es/' + this.idPelicula + '/' + this.fecha;
                const api_data = await this.axios.get(route);
                this.funcionesEs = api_data.data;
                for (var i = 0; i < this.funcionesEs.length; i++)
                    this.funcionesEs[i].fecha = moment(this.funcionesEs[i].fecha).format("DD/MM/YYYY");
            } catch (error) {
                console.log(error);
            }
        },

        elegirFuncion(id_funcion) {
            this.$emit('elegirFuncion', id_funcion);
            this.eligioFuncion = false;
        }
    },
}
</script>

<style scoped>
    #funciones {
        display: flex;
        justify-content: left;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0
    }
</style>