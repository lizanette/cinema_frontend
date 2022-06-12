<template>
    <div>
        <ElegirFuncion :idPelicula="idPelicula" @elegirFuncion="elegirFuncion($event)"/>
        <div v-show="mostrarAsientos">
            <v-btn @click="bloquearAsientos">Escoger asientos</v-btn>
            <v-col
                id="sala"
                class="asientos deshabilitado"
            >
                <p class="font-weight-light">Escoge tus asientos:</p>
                <ul class="showcase">
                    <li>
                        <div class="asiento"></div>
                        <small>Disponible</small>
                    </li>

                    <li>
                        <div class="asiento seleccionado"></div>
                        <small>Seleccionado</small>
                    </li>

                    <li>
                        <div class="asiento ocupado"></div>
                        <small>Ocupado</small>
                    </li>
                </ul>
                <br>
                <div class="sala">
                    <div class="pantalla"></div>
                    <div class="fila">
                        <div @click="elegirAsiento('A1')" id="A1" class="asiento"></div>
                        <div @click="elegirAsiento('A2')" id="A2" class="asiento"></div>
                        <div @click="elegirAsiento('A3')" id="A3" class="asiento"></div>
                        <div @click="elegirAsiento('A4')" id="A4" class="asiento"></div>
                        <div @click="elegirAsiento('A5')" id="A5" class="asiento"></div>
                        <div @click="elegirAsiento('A6')" id="A6" class="asiento"></div>
                        <div @click="elegirAsiento('A7')" id="A7" class="asiento"></div>
                        <div @click="elegirAsiento('A8')" id="A8" class="asiento"></div>
                        <div @click="elegirAsiento('A9')" id="A9" class="asiento"></div>
                        <div @click="elegirAsiento('A10')" id="A10" class="asiento"></div>
                        <div @click="elegirAsiento('A11')" id="A11" class="asiento"></div>
                        <div @click="elegirAsiento('A12')" id="A12" class="asiento"></div>
                        <div @click="elegirAsiento('A13')" id="A13" class="asiento"></div>
                        <div @click="elegirAsiento('A14')" id="A14" class="asiento"></div>
                    </div>

                    <div class="fila">
                        <div @click="elegirAsiento('B1')" id="B1" class="asiento"></div>
                        <div @click="elegirAsiento('B2')" id="B2" class="asiento"></div>
                        <div @click="elegirAsiento('B3')" id="B3" class="asiento"></div>
                        <div @click="elegirAsiento('B4')" id="B4" class="asiento"></div>
                        <div @click="elegirAsiento('B5')" id="B5" class="asiento"></div>
                        <div @click="elegirAsiento('B6')" id="B6" class="asiento"></div>
                        <div @click="elegirAsiento('B7')" id="B7" class="asiento"></div>
                        <div @click="elegirAsiento('B8')" id="B8" class="asiento"></div>
                        <div @click="elegirAsiento('B9')" id="B9" class="asiento"></div>
                        <div @click="elegirAsiento('B10')" id="B10" class="asiento"></div>
                        <div @click="elegirAsiento('B11')" id="B11" class="asiento"></div>
                        <div @click="elegirAsiento('B12')" id="B12" class="asiento"></div>
                        <div @click="elegirAsiento('B13')" id="B13" class="asiento"></div>
                        <div @click="elegirAsiento('B14')" id="B14" class="asiento"></div>
                    </div>

                    <div class="fila">
                        <div @click="elegirAsiento('C1')" id="C1" class="asiento"></div>
                        <div @click="elegirAsiento('C2')" id="C2" class="asiento"></div>
                        <div @click="elegirAsiento('C3')" id="C3" class="asiento"></div>
                        <div @click="elegirAsiento('C4')" id="C4" class="asiento"></div>
                        <div @click="elegirAsiento('C5')" id="C5" class="asiento"></div>
                        <div @click="elegirAsiento('C6')" id="C6" class="asiento"></div>
                        <div @click="elegirAsiento('C7')" id="C7" class="asiento"></div>
                        <div @click="elegirAsiento('C8')" id="C8" class="asiento"></div>
                        <div @click="elegirAsiento('C9')" id="C9" class="asiento"></div>
                        <div @click="elegirAsiento('C10')" id="C10" class="asiento"></div>
                        <div @click="elegirAsiento('C11')" id="C11" class="asiento"></div>
                        <div @click="elegirAsiento('C12')" id="C12" class="asiento"></div>
                        <div @click="elegirAsiento('C13')" id="C13" class="asiento"></div>
                        <div @click="elegirAsiento('C14')" id="C14" class="asiento"></div>
                    </div>

                    <div class="fila">
                        <div @click="elegirAsiento('D1')" id="D1" class="asiento"></div>
                        <div @click="elegirAsiento('D2')" id="D2" class="asiento"></div>
                        <div @click="elegirAsiento('D3')" id="D3" class="asiento"></div>
                        <div @click="elegirAsiento('D4')" id="D4" class="asiento"></div>
                        <div @click="elegirAsiento('D5')" id="D5" class="asiento"></div>
                        <div @click="elegirAsiento('D6')" id="D6" class="asiento"></div>
                        <div @click="elegirAsiento('D7')" id="D7" class="asiento"></div>
                        <div @click="elegirAsiento('D8')" id="D8" class="asiento"></div>
                        <div @click="elegirAsiento('D9')" id="D9" class="asiento"></div>
                        <div @click="elegirAsiento('D10')" id="D10" class="asiento"></div>
                        <div @click="elegirAsiento('D11')" id="D11" class="asiento"></div>
                        <div @click="elegirAsiento('D12')" id="D12" class="asiento"></div>
                        <div @click="elegirAsiento('D13')" id="D13" class="asiento"></div>
                        <div @click="elegirAsiento('D14')" id="D14" class="asiento"></div>
                    </div>

                    <div class="fila">
                        <div @click="elegirAsiento('E1')" id="E1" class="asiento"></div>
                        <div @click="elegirAsiento('E2')" id="E2" class="asiento"></div>
                        <div @click="elegirAsiento('E3')" id="E3" class="asiento"></div>
                        <div @click="elegirAsiento('E4')" id="E4" class="asiento"></div>
                        <div @click="elegirAsiento('E5')" id="E5" class="asiento"></div>
                        <div @click="elegirAsiento('E6')" id="E6" class="asiento"></div>
                        <div @click="elegirAsiento('E7')" id="E7" class="asiento"></div>
                        <div @click="elegirAsiento('E8')" id="E8" class="asiento"></div>
                        <div @click="elegirAsiento('E9')" id="E9" class="asiento"></div>
                        <div @click="elegirAsiento('E10')" id="E10" class="asiento"></div>
                        <div @click="elegirAsiento('E11')" id="E11" class="asiento"></div>
                        <div @click="elegirAsiento('E12')" id="E12" class="asiento"></div>
                        <div @click="elegirAsiento('E13')" id="E13" class="asiento"></div>
                        <div @click="elegirAsiento('E14')" id="E14" class="asiento"></div>
                    </div>

                    <div class="fila">
                        <div @click="elegirAsiento('F1')" id="F1" class="asiento"></div>
                        <div @click="elegirAsiento('F2')" id="F2" class="asiento"></div>
                        <div @click="elegirAsiento('F3')" id="F3" class="asiento"></div>
                        <div @click="elegirAsiento('F4')" id="F4" class="asiento"></div>
                        <div @click="elegirAsiento('F5')" id="F5" class="asiento"></div>
                        <div @click="elegirAsiento('F6')" id="F6" class="asiento"></div>
                        <div @click="elegirAsiento('F7')" id="F7" class="asiento"></div>
                        <div @click="elegirAsiento('F8')" id="F8" class="asiento"></div>
                        <div @click="elegirAsiento('F9')" id="F9" class="asiento"></div>
                        <div @click="elegirAsiento('F10')" id="F10" class="asiento"></div>
                        <div @click="elegirAsiento('F11')" id="F11" class="asiento"></div>
                        <div @click="elegirAsiento('F12')" id="F12" class="asiento"></div>
                        <div @click="elegirAsiento('F13')" id="F13" class="asiento"></div>
                        <div @click="elegirAsiento('F14')" id="F14" class="asiento"></div>
                    </div>

                    <div class="fila">
                        <div @click="elegirAsiento('G1')" id="G1" class="asiento"></div>
                        <div @click="elegirAsiento('G2')" id="G2" class="asiento"></div>
                        <div @click="elegirAsiento('G3')" id="G3" class="asiento"></div>
                        <div @click="elegirAsiento('G4')" id="G4" class="asiento"></div>
                        <div @click="elegirAsiento('G5')" id="G5" class="asiento"></div>
                        <div @click="elegirAsiento('G6')" id="G6" class="asiento"></div>
                        <div @click="elegirAsiento('G7')" id="G7" class="asiento"></div>
                        <div @click="elegirAsiento('G8')" id="G8" class="asiento"></div>
                        <div @click="elegirAsiento('G9')" id="G9" class="asiento"></div>
                        <div @click="elegirAsiento('G10')" id="G10" class="asiento"></div>
                        <div @click="elegirAsiento('G11')" id="G11" class="asiento"></div>
                        <div @click="elegirAsiento('G12')" id="G12" class="asiento"></div>
                        <div @click="elegirAsiento('G13')" id="G13" class="asiento"></div>
                        <div @click="elegirAsiento('G14')" id="G14" class="asiento"></div>
                    </div>

                    <div class="fila">
                        <div @click="elegirAsiento('H1')" id="H1" class="asiento"></div>
                        <div @click="elegirAsiento('H2')" id="H2" class="asiento"></div>
                        <div @click="elegirAsiento('H3')" id="H3" class="asiento"></div>
                        <div @click="elegirAsiento('H4')" id="H4" class="asiento"></div>
                        <div @click="elegirAsiento('H5')" id="H5" class="asiento"></div>
                        <div @click="elegirAsiento('H6')" id="H6" class="asiento"></div>
                        <div @click="elegirAsiento('H7')" id="H7" class="asiento"></div>
                        <div @click="elegirAsiento('H8')" id="H8" class="asiento"></div>
                        <div @click="elegirAsiento('H9')" id="H9" class="asiento"></div>
                        <div @click="elegirAsiento('H10')" id="H10" class="asiento"></div>
                        <div @click="elegirAsiento('H11')" id="H11" class="asiento"></div>
                        <div @click="elegirAsiento('H12')" id="H12" class="asiento"></div>
                        <div @click="elegirAsiento('H13')" id="H13" class="asiento"></div>
                        <div @click="elegirAsiento('H14')" id="H14" class="asiento"></div>
                    </div>
                </div>
                <div>
                    <p class="text-center">
                        <span id="count">{{asientos.length}}</span> asientos seleccionados. Total $<span id="total">{{asientos.length * 70}}</span>
                    </p>
                </div>
            </v-col>
        </div>
        
    </div>
</template>

<script>

import ElegirFuncion from '@/components/ElegirFuncion.vue'

export default {
    components: {
        ElegirFuncion
    },

    props: {
        idPelicula: Number,
    },

    data () {
        return {
            precio: 70,
            asientos: [],
            id_funcion: '',
            funcion: {},
            asientosOcupados: [],

            mostrarAsientos: false,
        }
    },

    created () {
    },

    methods: {
        elegirFuncion(id_funcion) {
            this.$emit('elegirFuncion', id_funcion);
            this.id_funcion = id_funcion;
            this.getFuncion();
            this.mostrarAsientos = true;
        },

        async getFuncion () {
            try {
                var route = '/funciones/' + this.id_funcion;
                const api_data = await this.axios.get(route);
                this.funcion = api_data.data[0];
                this.elegirSala(this.funcion.idSala);
                this.getAsientos();
            } catch (error) {
                console.log(error.response)
            }
        },

        async getAsientos() {
            try {
                var route = '/asientos/' + this.funcion.idSala;
                const api_data = await this.axios.get(route);
                api_data.data.forEach((item) => {
                    this.asientosOcupados.push(item.id_asiento)
                });
            } catch (error) {
                console.log(error)
            }
        },

        bloquearAsientos() {
            this.asientosOcupados.forEach(element => {
                document.getElementById(element).classList.add("ocupado")
            });
            document.getElementById("sala").classList.remove("deshabilitado");
        },

        elegirSala(sala) {
            this.$emit('elegirSala', sala);
        },

        elegirAsiento(asiento) {
            document.getElementById(asiento).classList.add("seleccionado");
            this.asientos.push(asiento);
            this.$emit('elegirAsiento', asiento);
        },

    },
}
</script>

<style scoped>
    .sala, .asientos {
        display: flex;
        flex-direction: column;
        color: white;
        align-items: center;
        justify-content: center;
    }

    .deshabilitado {
        pointer-events: none;
        opacity:0.4;
        filter: alpha(opacity = 50);
    }

    .asiento {
        background-color: white;
        height: 12px;
        width: 15px;
        margin: 3px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .fila {
        display: flex;
    }

    .asiento.seleccionado {
        background-color: #1FA4E7;
        pointer-events: none;
    }

    .asiento.ocupado {
        background-color: #7F3690;
        pointer-events: none;
    }

    .asiento:nth-of-type(2) {
        margin-right: 18px;
    }

    .asiento:nth-last-of-type(2) {
        margin-left: 18px;
    }

    .asiento:not(.ocupado):hover {
        cursor: pointer;
        transform: scale(1.2);
    }

    .showcase .asiento:not(.ocupado):hover {
        cursor: default;
        transform: scale(1);
    }

    .showcase {
        background-color: rgba(0, 0, 0, 0.1);
        padding: 5px 10px;
        border-radius: 5px;
        list-style-type: none;
        display: flex;
        justify-content: space-between;
    }

    .showcase li {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 10px;
    }

    .showcase li small {
        margin-left: 10px;
    }

    .pantalla {
        background-color: white;
        height: 70px;
        width: 100%;
        margin: 15px 0;
        transform: rotateX(-45deg);
        box-shadow: 0 3px 10px rgba(255, 255, 255, 0.75);
    }

    
    .sala {
        perspective: 1000px;
        margin-bottom: 30px;
    }

    p.text-center {
        margin: 5px 0;
    }

    p.text-center span {
        font-weight: bolder;
    }
</style>